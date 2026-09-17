# The Food Spot Tanger

A French / Moroccan Darija restaurant demo built with Next.js App Router, TypeScript, Tailwind CSS and Lucide. Original local vector placeholders make the demo usable without downloading restaurant photographs. No checkout, backend, analytics or embedded social feeds.

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
- `data/menu.ts`: product entries, category, local image path, optional price, bilingual `name` / `description` (`{ fr: "…", ary: "…" }`) and `placeholder` flag. Replace the generated demo entries with confirmed products and set their `placeholder` to `false`; the demo notice disappears automatically once all products are confirmed. No component edits are needed to maintain the menu.
- `locales/fr.ts` and `locales/ary.ts`: all interface copy, category names, labels and legal placeholder text. Have a Moroccan speaker approve Darija before publication.
- `app/globals.css`: colors are CSS variables at the top; responsive breakpoints and reduced-motion support are included.
- `components/food-spot.tsx`: page sections and interactions. `components/ui.tsx`: shared brand, language selector and WhatsApp CTA.

## Replace illustrations

Put authorized restaurant photos in `public/images` and change paths in `data/menu.ts` (menu and eight gallery slots) and the hero in `components/food-spot.tsx`. Update alt text in the dictionaries, image dimensions and remove the matching placeholder labels once real photos are supplied. Use compressed WebP/AVIF/JPEG; `next/image` handles responsive optimization. Never pass SVG files from untrusted sources.

`scripts/create-placeholders.mjs` regenerates the original demo vector artwork. These drawings are not actual products, premises or staff. Comments in the gallery data identify the intended replacement photos.

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

The buttons open WhatsApp, the phone dialer, Instagram or Google Maps. They do not imply an integrated ordering or payment service. No dates, reviews, GPS coordinates or definitive prices have been invented.
