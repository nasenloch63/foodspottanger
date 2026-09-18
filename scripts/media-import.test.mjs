import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import sharp from "sharp";

const importer = path.resolve("scripts/import-approved-media.mjs");
async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), "foodspot-media-test-"));
  for (const directory of ["data", "public/images/approved", "incoming-media"])
    await mkdir(path.join(root, directory), { recursive: true });
  const image = await sharp({
    create: { width: 12, height: 8, channels: 3, background: "#444" },
  })
    .png()
    .toBuffer();
  await writeFile(path.join(root, "incoming-media/test.png"), image);
  const entry = {
    id: "test-image",
    sourceFile: "incoming-media/test.png",
    filename: "test-image.png",
    sha256: createHash("sha256").update(image).digest("hex"),
    sourceUrl: "urn:owner-supplied:test-fixture",
    postUrl: null,
    platform: "owner-supplied",
    approvalStatus: "approved",
    approvedOn: "2026-09-17",
    approvalReference: "Isolated automated test only",
    permissionNote: "Generated test fixture; never business media",
    businessAssociation:
      "Synthetic test of association validation, not a claim about the restaurant",
    rightsHolder: "Test fixture generator",
    attributionRequired: true,
    attributionText: "Test fixture",
    attributionNote: "Credit required for test",
    peopleClearance: "No people in this synthetic fixture",
    intendedComponents: ["gallery"],
    alt: { fr: "Image de test", ary: "صورة تجريبية" },
    mayCrop: false,
    mayEdit: false,
  };
  await writeFile(
    path.join(root, "data/media-manifest.json"),
    JSON.stringify({ version: 1, assets: [], generated: [] }),
  );
  const save = (items) =>
    writeFile(
      path.join(root, "data/approved-media.json"),
      JSON.stringify({ version: 1, items }),
    );
  await save([entry]);
  const run = (...args) =>
    spawnSync(process.execPath, [importer, ...args], {
      cwd: root,
      encoding: "utf8",
    });
  return { root, image, entry, save, run };
}
test("dry-run has no writes; import preserves bytes, provenance and dimensions; repeat is idempotent", async () => {
  const f = await fixture();
  const check = f.run("--check");
  assert.equal(check.status, 0, check.stderr);
  assert.deepEqual(
    await readdir(path.join(f.root, "public/images/approved")),
    [],
  );
  const imported = f.run();
  assert.equal(imported.status, 0, imported.stderr);
  assert.deepEqual(
    await readFile(path.join(f.root, "public/images/approved/test-image.png")),
    f.image,
  );
  const manifest = JSON.parse(
    await readFile(path.join(f.root, "data/media-manifest.json"), "utf8"),
  );
  assert.equal(manifest.assets[0].width, 12);
  assert.equal(manifest.assets[0].height, 8);
  assert.equal(manifest.assets[0].attributionText, "Test fixture");
  assert.equal(manifest.assets[0].sourceFile, undefined);
  assert.equal(f.run().status, 0);
});
test("unapproved, incomplete, unrelated and inaccessible entries fail without output", async () => {
  for (const mutation of [
    { approvalStatus: "pending" },
    { permissionNote: "" },
    { businessAssociation: "" },
    { sourceFile: "incoming-media/missing.png" },
    { attributionText: "" },
    { sha256: "0".repeat(64) },
    { sourceFile: "https://instagram.com/photo.jpg" },
    { filename: "../escape.png" },
    { sourceFile: "incoming-media/../../escape.png" },
  ]) {
    const f = await fixture();
    await f.save([{ ...f.entry, ...mutation }]);
    assert.notEqual(f.run().status, 0, JSON.stringify(mutation));
    assert.deepEqual(
      await readdir(path.join(f.root, "public/images/approved")),
      [],
    );
  }
});
test("a bad later entry prevents the entire batch; changed approval cannot overwrite published file", async () => {
  const f = await fixture();
  await f.save([
    f.entry,
    {
      ...f.entry,
      id: "second-image",
      filename: "second-image.png",
      approvalStatus: "pending",
    },
  ]);
  assert.notEqual(f.run().status, 0);
  assert.deepEqual(
    await readdir(path.join(f.root, "public/images/approved")),
    [],
  );
  await f.save([f.entry]);
  assert.equal(f.run().status, 0);
  await f.save([
    {
      ...f.entry,
      permissionNote: "Changed permission without new approval identity",
    },
  ]);
  assert.notEqual(f.run().status, 0);
  assert.deepEqual(
    await readFile(path.join(f.root, "public/images/approved/test-image.png")),
    f.image,
  );
});
test("tampered published files and unregistered public images fail validation", async () => {
  const f = await fixture();
  assert.equal(f.run().status, 0);
  await writeFile(
    path.join(f.root, "public/images/approved/test-image.png"),
    "corrupt",
  );
  assert.notEqual(f.run("--check").status, 0);
  const other = await fixture();
  await writeFile(path.join(other.root, "public/stray.png"), other.image);
  assert.notEqual(other.run("--check").status, 0);
});
test("empty external media is valid and builds without importing anything", async () => {
  const f = await fixture();
  await f.save([]);
  assert.equal(f.run("--check").status, 0);
  assert.equal(f.run().status, 0);
});

test("generated artwork requires authorization and exact published bytes", async () => {
  const f = await fixture();
  await f.save([]);
  await writeFile(path.join(f.root, "public/art.png"), f.image);
  const artwork = {
    id: "test-art",
    localFilename: "public/art.png",
    width: 12,
    height: 8,
    approvalStatus: "approved",
    permissionNote: "Explicitly authorized synthetic fixture",
    sha256: f.entry.sha256,
  };
  const saveManifest = () =>
    writeFile(
      path.join(f.root, "data/media-manifest.json"),
      JSON.stringify({ version: 1, assets: [], generated: [artwork] }),
    );
  await saveManifest();
  assert.equal(f.run("--check").status, 0);
  artwork.approvalStatus = "pending";
  await saveManifest();
  assert.notEqual(f.run("--check").status, 0);
  artwork.approvalStatus = "approved";
  artwork.sha256 = "0".repeat(64);
  await saveManifest();
  assert.notEqual(f.run("--check").status, 0);
});

test("embedded metadata requires a matching documented review and remains unchanged", async () => {
  const f = await fixture();
  const image = await sharp(f.image)
    .withExif({ IFD0: { Artist: "Synthetic test fixture" } })
    .png()
    .toBuffer();
  await writeFile(path.join(f.root, "incoming-media/test.png"), image);
  const entry = {
    ...f.entry,
    sha256: createHash("sha256").update(image).digest("hex"),
  };
  await f.save([entry]);
  assert.notEqual(f.run().status, 0);
  const metadata = await sharp(image).metadata();
  const embedded = Buffer.concat(
    [metadata.exif, metadata.xmp, metadata.iptc].filter(Boolean),
  );
  entry.metadataReview = {
    note: "Reviewed synthetic artist field in isolated fixture",
    sha256: "0".repeat(64),
  };
  await f.save([entry]);
  assert.notEqual(f.run().status, 0);
  entry.metadataReview.sha256 = createHash("sha256")
    .update(embedded)
    .digest("hex");
  await f.save([entry]);
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    await readFile(path.join(f.root, "public/images/approved/test-image.png")),
    image,
  );
});
