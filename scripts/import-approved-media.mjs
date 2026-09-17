import {
  readFile,
  writeFile,
  mkdir,
  realpath,
  stat,
  unlink,
  rename,
  readdir,
} from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const dryRun = process.argv.includes("--check");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const requireValue = (condition, message) => {
  if (!condition) throw new Error(message);
};
const present = (value) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  !/REPLACE_|pending|unverified/i.test(value);
const inside = (parent, child) => {
  const relative = path.relative(parent, child);
  return (
    relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative)
  );
};
const readJson = async (filename) =>
  JSON.parse(await readFile(path.join(root, filename), "utf8"));
const exists = async (filename) => {
  try {
    await stat(filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};
function validate(entry) {
  requireValue(
    entry.approvalStatus === "approved",
    `${entry.id}: source is not approved.`,
  );
  requireValue(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id),
    "Invalid media ID.",
  );
  requireValue(
    /^[a-z0-9]+(?:-[a-z0-9]+)*\.(jpg|jpeg|png|webp|avif)$/.test(entry.filename),
    `${entry.id}: use a deterministic raster filename.`,
  );
  for (const key of [
    "sourceUrl",
    "platform",
    "approvedOn",
    "approvalReference",
    "permissionNote",
    "businessAssociation",
    "rightsHolder",
    "attributionNote",
    "peopleClearance",
  ])
    requireValue(
      present(entry[key]),
      `${entry.id}: missing permission/provenance field ${key}.`,
    );
  requireValue(
    /^\d{4}-\d{2}-\d{2}$/.test(entry.approvedOn) &&
      Number.isFinite(Date.parse(entry.approvedOn)),
    `${entry.id}: invalid approval date.`,
  );
  requireValue(
    /^[a-f0-9]{64}$/i.test(entry.sha256),
    `${entry.id}: approved file SHA-256 is required.`,
  );
  requireValue(
    typeof entry.attributionRequired === "boolean" &&
      typeof entry.mayCrop === "boolean" &&
      typeof entry.mayEdit === "boolean",
    `${entry.id}: explicit attribution, crop and edit permissions required.`,
  );
  requireValue(
    typeof entry.attributionText === "string" &&
      (!entry.attributionRequired || present(entry.attributionText)),
    `${entry.id}: required attribution missing.`,
  );
  requireValue(
    present(entry.alt?.fr) && present(entry.alt?.ary),
    `${entry.id}: French and Darija alt text required.`,
  );
  requireValue(
    Array.isArray(entry.intendedComponents) &&
      entry.intendedComponents.length &&
      entry.intendedComponents.every((value) =>
        ["logo", "hero", "menu", "gallery", "social"].includes(value),
      ),
    `${entry.id}: invalid intended component.`,
  );
  for (const value of [entry.sourceUrl, entry.postUrl].filter(Boolean)) {
    const url = new URL(value);
    requireValue(
      !url.username &&
        !url.password &&
        ((url.protocol === "https:" && !url.search) ||
          (url.protocol === "urn:" && entry.platform === "owner-supplied")),
      `${entry.id}: use a public canonical HTTPS URL without query credentials, or an owner-supplied urn reference.`,
    );
  }
  if (entry.platform === "instagram" || entry.platform === "google")
    requireValue(
      present(entry.postUrl) && new URL(entry.postUrl).protocol === "https:",
      `${entry.id}: original post/listing URL required.`,
    );
}
async function inspect(bytes, entry) {
  requireValue(
    bytes.length <= 25 * 1024 * 1024,
    `${entry.id}: image exceeds 25 MB.`,
  );
  requireValue(
    hash(bytes) === entry.sha256.toLowerCase(),
    `${entry.id}: file differs from the explicitly approved original.`,
  );
  const metadata = await sharp(bytes, {
    limitInputPixels: 40_000_000,
  }).metadata();
  requireValue(
    metadata.width &&
      metadata.height &&
      (!metadata.pages || metadata.pages === 1),
    `${entry.id}: animated/multipage or unreadable image.`,
  );
  const expected = {
    jpg: "jpeg",
    jpeg: "jpeg",
    png: "png",
    webp: "webp",
    avif: "heif",
  }[entry.filename.split(".").pop()];
  requireValue(
    metadata.format === expected,
    `${entry.id}: image format does not match extension.`,
  );
  const embedded = Buffer.concat(
    [metadata.exif, metadata.xmp, metadata.iptc].filter(Boolean),
  );
  requireValue(
    !embedded.length ||
      (present(entry.metadataReview?.note) &&
        entry.metadataReview?.sha256 === hash(embedded)),
    `${entry.id}: embedded metadata requires a documented review bound to its hash, or an approved metadata-clean original. No automatic editing performed.`,
  );
  // Fully decode to reject truncated/corrupt files, but copy the original bytes unchanged.
  await sharp(bytes, { limitInputPixels: 40_000_000 }).raw().toBuffer();
  return { width: metadata.width, height: metadata.height };
}
async function main() {
  const requests = await readJson("data/approved-media.json");
  const manifest = await readJson("data/media-manifest.json");
  requireValue(
    requests.version === 1 &&
      manifest.version === 1 &&
      Array.isArray(requests.items) &&
      Array.isArray(manifest.assets),
    "Invalid approval/manifest schema.",
  );
  const destination = path.join(root, "public", "images", "approved");
  const publicRoot = await realpath(path.join(root, "public"));
  if (await exists(destination))
    requireValue(
      inside(publicRoot, await realpath(destination)),
      "Approved directory must remain inside public.",
    );
  const ids = new Set();
  const names = new Set();
  for (const entry of manifest.assets) {
    validate(entry);
    requireValue(
      !ids.has(entry.id) && !names.has(entry.filename),
      "Duplicate manifest ID or filename.",
    );
    ids.add(entry.id);
    names.add(entry.filename);
    requireValue(
      entry.localFilename === `public/images/approved/${entry.filename}` &&
        entry.url === `/images/approved/${entry.filename}`,
      `${entry.id}: invalid published path.`,
    );
    const target = await realpath(path.join(root, entry.localFilename));
    requireValue(
      inside(publicRoot, target),
      `${entry.id}: published symlink outside public.`,
    );
    const dimensions = await inspect(await readFile(target), entry);
    requireValue(
      dimensions.width === entry.width && dimensions.height === entry.height,
      `${entry.id}: dimensions do not match manifest.`,
    );
  }
  // Every public raster/SVG file must be represented in the manifest; retired drawings live outside public.
  async function checkPublic(directory) {
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const location = path.join(directory, item.name);
      requireValue(
        !item.isSymbolicLink(),
        "Public media symlinks are not permitted.",
      );
      if (item.isDirectory()) await checkPublic(location);
      else if (/\.(svg|png|jpe?g|webp|avif|gif)$/i.test(item.name))
        requireValue(
          manifest.assets.some(
            (a) => path.join(root, a.localFilename) === location,
          ),
          `Unregistered public image: ${path.relative(root, location)}`,
        );
    }
  }
  await checkPublic(publicRoot);
  for (const entry of manifest.generated ?? [])
    requireValue(
      await exists(path.join(root, entry.localFilename)),
      `Missing generated interface asset: ${entry.id}`,
    );
  const pending = [];
  const requestIds = new Set();
  const requestNames = new Set();
  for (const entry of requests.items) {
    validate(entry);
    requireValue(
      !requestIds.has(entry.id) && !requestNames.has(entry.filename),
      "Duplicate import ID or filename.",
    );
    requestIds.add(entry.id);
    requestNames.add(entry.filename);
    const existing = manifest.assets.find((a) => a.id === entry.id);
    if (existing) {
      const { sourceFile: ignoredSource, ...approval } = entry;
      void ignoredSource;
      requireValue(
        Object.entries(approval).every(
          ([key, value]) =>
            JSON.stringify(existing[key]) === JSON.stringify(value),
        ),
        `${entry.id}: approved record changed; use a newly approved versioned ID and filename.`,
      );
      continue;
    }
    requireValue(
      !names.has(entry.filename),
      `${entry.id}: destination already belongs to another approved image.`,
    );
    requireValue(
      typeof entry.sourceFile === "string" &&
        entry.sourceFile.replaceAll("\\", "/").startsWith("incoming-media/"),
      `${entry.id}: only owner-supplied files in incoming-media are supported; URL downloading is disabled.`,
    );
    const incomingRoot = await realpath(path.join(root, "incoming-media"));
    requireValue(
      inside(await realpath(root), incomingRoot),
      "Incoming directory must remain inside the project.",
    );
    const source = await realpath(path.resolve(root, entry.sourceFile));
    requireValue(
      inside(incomingRoot, source),
      `${entry.id}: source escapes incoming-media.`,
    );
    requireValue(
      (await stat(source)).size <= 25 * 1024 * 1024,
      `${entry.id}: image exceeds 25 MB.`,
    );
    const bytes = await readFile(source);
    const dimensions = await inspect(bytes, entry);
    requireValue(
      !(await exists(path.join(destination, entry.filename))),
      `${entry.id}: refusing to overwrite existing file.`,
    );
    const { sourceFile: privateLocalPath, ...provenance } = entry;
    void privateLocalPath;
    pending.push({
      bytes,
      record: {
        ...provenance,
        ...dimensions,
        localFilename: `public/images/approved/${entry.filename}`,
        url: `/images/approved/${entry.filename}`,
        importedAt: new Date().toISOString(),
      },
    });
  }
  if (dryRun || !pending.length) {
    console.log(
      `${dryRun ? "CHECK" : "IMPORT"}: ${manifest.assets.length} verified published images; ${pending.length} approved originals ready. No files written.`,
    );
    return;
  }
  // Validate the entire batch before writing any image. Never overwrite an approved file.
  await mkdir(destination, { recursive: true });
  const written = [];
  const manifestPath = path.join(root, "data", "media-manifest.json");
  const temporary = `${manifestPath}.${process.pid}.tmp`;
  try {
    for (const { bytes, record } of pending) {
      const target = path.join(destination, record.filename);
      await writeFile(target, bytes, { flag: "wx" });
      written.push(target);
    }
    await writeFile(
      temporary,
      JSON.stringify(
        {
          ...manifest,
          assets: [...manifest.assets, ...pending.map((item) => item.record)],
        },
        null,
        2,
      ) + "\n",
      { flag: "wx" },
    );
    await rename(temporary, manifestPath);
  } catch (error) {
    await Promise.all(written.map((file) => unlink(file)));
    if (await exists(temporary)) await unlink(temporary);
    throw error;
  }
  console.log(
    `IMPORTED ${pending.length} approved originals unchanged. Provenance saved. Review UI before publishing.`,
  );
}
main().catch((error) => {
  console.error(`MEDIA REFUSED: ${error.message}`);
  process.exitCode = 1;
});
