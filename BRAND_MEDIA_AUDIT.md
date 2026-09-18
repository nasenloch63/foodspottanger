# Brand and media audit — 17 September 2026

## Existing project

Inspected app, components, data, locales, public, scripts and package configuration. Existing Next.js architecture, French/Darija switch, RTL, contact links and metadata are retained. Nine generated SVGs invented food, premises, packaging and people; these are archived outside public and no longer rendered. No stock-photo service URLs were found. The unsupported registered-trademark symbol was removed.

Previous colors were charcoal #151614, cream #f6f3e9 and yellow #ffd340. Impact/Arial Narrow display, Arial/Helvetica body and Tahoma/Arial Arabic remain system-font approximations, not identified official fonts.

## Public sources inspected

| Source                                                                                                         | Finding / limitation                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tanger profile](https://www.instagram.com/thefoodspottanger/)                                                 | Normal public browser access succeeded after initial fetch failure. Bio confirms Rue Caid Ahmed Riffi 3, Tanger, 00212670183260, 7/7 and 12h00–5h00. Logo and public post previews inspected. |
| [Promotional carousel](https://www.instagram.com/thefoodspottanger/p/DdPPiVnCIbm/)                             | Public preview: black/orange/white, bold condensed italic letters, brush bands, outlined badges, doodles and French/Arabic. Full post required login; stopped.                                |
| [Brand Reel cover](https://www.instagram.com/thefoodspottanger/reel/DcmNFFboq-s/)                              | Public branded card, “REAL FOOD, REAL SPOT”, contact information. Linked only.                                                                                                                |
| [Burger Reel cover](https://www.instagram.com/thefoodspottanger/reel/DcW3mH6owng/)                             | Public burger preview; original/creator rights unresolved. Linked only.                                                                                                                       |
| [Tray Reel cover](https://www.instagram.com/thefoodspottanger/reel/DczfY27o3hO/)                               | Food, wrapping and hand visible; creator/person clearance unresolved. Not copied.                                                                                                             |
| [Brussels profile](https://www.instagram.com/thefoodspotbrussels/)                                             | Same circular emblem, French bio; secondary reference only. Different hours/contact details not copied.                                                                                       |
| [Google search](https://www.google.com/search?q=The+Food+Spot+Tanger+Rue+Ca%C3%AFd+Ahmed+Riffi+3+Tanger)       | Unusual-traffic/reCAPTCHA blocked inspection; stopped. Exact listing, photos and authors unverified.                                                                                          |
| [Maps directions](https://www.google.com/maps/search/?api=1&query=The+Food+Spot+Tanger+Rue+Caid+Ahmed+Riffi+3) | Owner-supplied address search retained; not claimed as a verified place-ID listing.                                                                                                           |

No login wall, challenge or rate limit bypassed. No downloader, customer names/comments/reviews, faces or follower counts copied.

## Brand observations and design decisions

- Circular black/orange/white burger emblem; condensed FOOD, handwritten/script Spot overlay, fine orange rings. Preserve whole circle and lettering.
- Approximate orange sampled from approved JPEG informs primary **#ff7000** and accent **#f08020**. Black **#080808**, white **#ffffff**, surface **#181818**, muted **#b8b5b0** support the UI. These are approximations, not official brand-guide swatches.
- Latin cover headlines are very bold, condensed, often italic uppercase. Website approximates these characteristics with system fonts; Arabic remains upright/readable.
- Food previews show close burgers, trays, fries and wrapping. Interior preview shows orange ceiling/trim, dark seating and warm pendants. No current menu, recipe or packaging rights inferred.
- Black fields, orange brush bands, outlined round labels, playful crown/heart doodles. No consistent reusable texture or photographic shadow treatment established. UI uses restrained borders/shadows.
- French promotional headlines and Arabic/Darija captions; casual, playful, urban and late-night. Third-party/meme/people Reel footage excluded.

## Implemented

Centralized --brand-* tokens; orange/black/white UI, condensed italic Latin hierarchy, approved logo in original proportions, visible mobile language/order controls. Hero uses logo/location/contact while original food photography is unavailable. Menu is editable with uncertain entries marked. Gallery/lightbox consumes approved images only; empty state and three official post links avoid fictitious photography/live feeds.

Added approval config, provenance manifest, approved-image component, local-only importer and regression tests. Validation checks permission, association, hashes, paths, decoding, dimensions, embedded metadata review and no overwrites. Build runs media validation.

Changed app styles/icon/OG, components, menu/media/social data, locales, package/lockfile, scripts and documentation. Retired vectors remain in archive/demo-illustrations. Temporary favicon and text-only OG are registered project-generated interface assets.

## Actual media outcome

Owner authorized business-owned logo/photos on 17 September 2026. **One official profile logo imported unchanged**, 150 × 150 JPEG, public/images/approved/official-logo.jpg; used in the site. Manifest records source/profile, original filename, exact hash, permission, metadata review and attribution. Canonical profile URL is appropriate for a profile image with no individual post. Expiring session-associated CDN queries are not committed.

**Zero food, premises, packaging or people photographs imported.** Public previews informed analysis but remain linked only. Need high-resolution logo and original business-owned food/storefront/interior/packaging files with source/creator information. Existing business-owned permission persists; third-party content needs separate clearance. The 150px logo is not a print-quality master.

Menu/prices, legal details, final domain, native-speaker Darija review and authentic photography remain launch inputs. Full photographic redesign and real-gallery visual QA await those originals. See MEDIA_APPROVAL.md and VERIFICATION.md.

## 18 September 2026 — requested Imagegen update

The user explicitly requested Imagegen art for the 1920px redesign. One new concept image, public/images/generated/orange-burger-art-v1.png, is authorized as project-generated artwork and registered with a hash. It is visibly labeled in both languages and is not claimed as real restaurant photography. The official logo remains unchanged. See IMAGEGEN_ART_DIRECTION.md for the exact prompt and generation method. This supersedes the earlier logo-only hero description; authentic food/gallery originals are still absent.
