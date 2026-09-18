# Verification — brand update, 17 September 2026

This report supersedes the initial demo-gallery report. Verified on Node.js 24 with the in-app browser against localhost:3000.

- TypeScript strict validation: passed.
- ESLint: passed.
- Production build: passed; seven static pages generated. Build includes approved-media validation.
- Six importer regression tests: passed (dry run, unchanged bytes/provenance, idempotence, incomplete/unapproved input, batch failure/no overwrite, tampered/unregistered images, empty media, hash-bound embedded metadata review).
- Empty external-media configuration: importer tests and the earlier production build before logo import passed. The final site has one approved image asset.
- French and Darija at 360, 390, 768, 1024 and 1440px: no horizontal overflow; no broken images. Arabic sets ar-MA and rtl without reload. Logo alt text switches in all placements.
- All four rendered images reference official-logo in the approval manifest and decode correctly. Same brand mark is reused in header, hero, location and footer; no food photo is repeated or implied.
- Desktop and mobile screenshots reviewed: original circular logo remains uncropped, header order/language controls visible, hero, menu and gallery fallback readable. Source logo is limited to 150px resolution.
- Menu filter: one burger card, then reset to five categories. Unconfirmed menu/price labels remain.
- Mobile navigation opens, follows anchor and closes.
- Legal dialog opens; Escape dismisses and restores opener focus. Focus loop includes attribution links for future gallery media.
- Approved gallery currently empty: useful Instagram state and three official post links shown. Authentic photo cropping/lightbox QA remains pending real gallery originals; no claim of a tested populated production gallery.
- WhatsApp, phone, Instagram and Maps href values checked against supplied details. No message/order sent; WhatsApp account availability is not confirmed by this test.
- Browser warning/error log: empty during final checks.
- Search of app/components/data/locales: no stock-photo URLs or retired demo-image paths. Media check validates published paths, hashes, approvals and generated assets.

Real photo originals, confirmed menu, high-resolution logo, native Moroccan copy review, operator/legal details and final domain remain launch inputs. Google listing/photo inspection was blocked by a challenge; gated Instagram posts were not accessed. Public profiles and previews supported the documented brand analysis. See BRAND_MEDIA_AUDIT.md and MEDIA_APPROVAL.md.

## 18 September 2026 — 1920px Imagegen redesign

Supersedes the earlier logo-only hero description. The original business logo remains; the hero now displays a separately authorized, visibly labeled AI concept illustration.

- Checked 360, 390, 768, 1024, 1440 and 1920px in French and Darija: no horizontal overflow or broken images; RTL correct.
- 1920px viewport: 1760px centered content confirmed; canvas capped at 1920px. Desktop/mobile hero and menu screenshots reviewed.
- All four rendered images loaded: three official-logo placements and one orange-burger-art-v1, all registered in the manifest.
- Mobile navigation closes on selection. Menu filter returns one category and resets to five.
- Browser errors/warnings: none during final browser checks.
- Seven media regression tests passed, including generated-art authorization and tamper rejection. TypeScript, ESLint and production build checked for this update.
- Imagegen built-in tool produced the original 1254 × 1254 PNG (~2.2MB). It is preserved unchanged with embedded provenance and bilingual disclosure. Exact prompt in IMAGEGEN_ART_DIRECTION.md.
- No accessibility certification is claimed by the term AA+; this was implemented as a visual quality direction. Official menu, legal details and authentic photography remain owner inputs.
