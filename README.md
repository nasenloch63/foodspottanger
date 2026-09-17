# The Food Spot Tanger

A French / Moroccan Darija restaurant demo built with Next.js App Router, TypeScript, Tailwind CSS and Lucide. Restaurant imagery is approval-gated. With no approved originals, the site renders useful text and official Instagram links. No checkout, backend, analytics or embedded social feeds.

## Local development

Requires Node.js 20.9+ and pnpm 11 (recommended with the committed lockfile).

```sh
npm install -g pnpm@11
pnpm install
pnpm dev
```

Open http://localhost:3000. npm also works (`npm install`, `npm run dev`), but use a single package manager and commit its lockfile if switching.

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Editable content

- `data/site.ts`: address, phone, Instagram, WhatsApp message, Maps URL, hours and final public domain. No environment variables or API keys are needed.
- `data/menu.ts`: product entries, category, approved `mediaId` (or null), optional price, bilingual `name` / `description` (`{ fr: "…", ary: "…" }`) and `placeholder` flag. Replace the demo entries with confirmed products and set their `placeholder` to `false`; the demo notice disappears automatically once all products are confirmed. Assign menu images to the `menu` slot in the approval manifest. No component edits are needed.
- `locales/fr.ts` and `locales/ary.ts`: all interface copy, category names, labels and legal placeholder text. Have a Moroccan speaker approve Darija before publication.
- `app/globals.css`: centralized `--brand-primary`, `--brand-secondary`, `--brand-accent`, `--brand-background`, `--brand-surface`, `--brand-text`, `--brand-muted`, `--brand-radius` and `--brand-shadow`. Orange #ff7000 / #f08020 approximates the approved logo; black/white supporting tokens reflect observed public materials, not a certified brand guide. Responsive breakpoints and reduced-motion support are included.
- `components/food-spot.tsx`: page sections and interactions. `components/ui.tsx`: shared brand, language selector and WhatsApp CTA.

## Approved originals only

Read `BRAND_MEDIA_AUDIT.md` and `MEDIA_APPROVAL.md`. Business-owned logo/photos are authorized by the owner. One unchanged 150px official profile logo is imported and rendered. Tanger and Brussels public profiles/previews were inspected; Google was challenged and full Instagram posts were gated. No food or premises photos were imported. High-resolution logo and business-owned photo originals remain needed. The importer implements no platform downloading.

Put authorized originals in ignored `incoming-media/`. Complete a per-file record using `data/approved-media.example.json`, including the original SHA-256, source/post URL (or `urn:owner-supplied:asset-id` for privately supplied originals), rights, association, person clearance, bilingual alt text, crop/edit permission and attribution. Store it in `data/approved-media.json`.

```sh
pnpm media:check   # read-only validation / dry run
pnpm media:import  # copy approved local originals and update manifest
pnpm test:media   # safety regression tests in isolated temporary folders
```

The importer supports JPEG, PNG, WebP and AVIF; it validates complete decoding, size, format, hashes, permissions and paths. Embedded EXIF/XMP/IPTC requires documented privacy/credit review bound to its exact hash, or an approved clean export. It never silently alters bytes. See `incoming-media.example.md`. No approved asset is overwritten. Use a new versioned ID and filename for an explicitly approved replacement.

`data/media-manifest.json` records published dimensions, date, provenance and permissions. Assign `intendedComponents` (`logo`, `hero`, `menu`, `gallery`, `social`); the first approved logo/hero/social image is selected automatically and all gallery images render automatically. Menu entries reference the approved ID. Credits and permitted source links are displayed. Full images use contain sizing without rotation or cropping; assets without edit permission bypass recompression. Required watermarks remain visible.

The old drawings are retained only in `archive/demo-illustrations`, outside public assets. `scripts/create-placeholders.mjs` regenerates that archive only. The temporary favicon and text-only OG card are declared as project-generated assets in the manifest. They are not official brand assets. `pnpm build` runs approval validation before compilation; empty media data is valid.

## Language and accessibility

French is the default. Both selectors switch immediately without navigating or reloading; `html.lang` and `html.dir` update to `ar-MA` / `rtl`. Brand names, contact data and URLs remain unchanged. Language preference is intentionally not stored. The gallery uses a native modal dialog with keyboard focus containment, Escape, previous/next buttons and arrow keys. Menu categories use pressed buttons. Mobile navigation uses an expanded-state button. Animations respect reduced motion.

## GitHub and Vercel

Repository: https://github.com/nasenloch63/foodspottanger

Import this repository in Vercel, choose **Next.js**, keep the project root, and use `pnpm install --frozen-lockfile` / `pnpm build`. No secrets or services are required. Add the actual HTTPS domain to `site.url` in `data/site.ts` to enable the canonical URL and non-empty sitemap. Metadata, generated Open Graph card, favicon, robots and restaurant JSON-LD are included. Opening hours intentionally cross midnight (12:00–05:00).

## Before public launch

1. Supply and confirm the official menu, recipes, prices, availability and allergens.
2. Supply authorized burger, restaurant, team, packaging, order and evening photographs, plus the final logo.
3. Confirm phone, WhatsApp availability, address, opening hours and halal claim with the owner.
4. Validate the Darija translation with a native Moroccan speaker.
5. Provide the operator's legal information and a reviewed privacy policy; current legal dialogs are clearly marked placeholders.
6. Set `site.url`, verify sharing previews and connect the production domain.
7. Remove demo labels only when the corresponding content is finalized. Recheck mobile layouts after replacing content.

The buttons open WhatsApp, the phone dialer, Instagram or Google Maps. They do not imply an integrated ordering or payment service. No dates, reviews, GPS coordinates or definitive prices have been invented. Public research/approval limitations and outstanding source URLs are recorded in `MEDIA_APPROVAL.md`.
