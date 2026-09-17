# Media approval register

On 17 September 2026 the owner answered: **“Yes, business-owned logo and photos are authorized.”** This permission persists for verified business-owned media. It does not cover every public post, customer/influencer material or third-party photographer work.

| Approval             | Source / platform                                                                                        | Preview                                                               | Proposed use                    | Association, credit and rights                                                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [x] Imported         | [Tanger profile logo — Instagram](https://www.instagram.com/thefoodspottanger/)                          | [Local original](public/images/approved/official-logo.jpg), 150 × 150 | Header/footer and hero mark     | Official owner-specified account; business-owned authorization. Conservative “The Food Spot Tanger” credit. No people; no separate creator credit visible. No crop/edit. |
| [ ] Original pending | [Promo carousel — Instagram](https://www.instagram.com/thefoodspottanger/p/DdPPiVnCIbm/)                 | Public preview inspected, no local copy                               | Social cover                    | Appears branded; full post gated. Original, creator/third-party rights and attribution unresolved. Official link only.                                                   |
| [ ] Original pending | [Brand card — Instagram](https://www.instagram.com/thefoodspottanger/reel/DcmNFFboq-s/)                  | Public preview inspected, no local copy                               | Social cover                    | Appears branded; original and creator rights unresolved. Official link only.                                                                                             |
| [ ] Original pending | [Burger cover — Instagram](https://www.instagram.com/thefoodspottanger/reel/DcW3mH6owng/)                | Public preview inspected, no local copy                               | Hero/menu                       | Photographer/original/attribution unresolved. Official link only.                                                                                                        |
| [ ] Not selected     | [Tray cover — Instagram](https://www.instagram.com/thefoodspottanger/reel/DczfY27o3hO/)                  | Public preview inspected, no local copy                               | Possible gallery                | Hand, food, wrapping; creator/person clearance unresolved.                                                                                                               |
| [ ] Reference only   | [Brussels profile — Instagram](https://www.instagram.com/thefoodspotbrussels/)                           | Viewed, no local copy                                                 | Secondary visual analysis       | No transfer of Tanger-specific facts or rights.                                                                                                                          |
| [ ] Unverified       | [Google search](https://www.google.com/search?q=The+Food+Spot+Tanger+Rue+Ca%C3%AFd+Ahmed+Riffi+3+Tanger) | Challenge prevented inspection                                        | Possible future premises photos | No listing/photo author verified; no copying.                                                                                                                            |

Third-party/meme/people Reel footage excluded. No names, faces, reviews/comments included. Public availability never implies attribution-free reuse.

## Imported logo checklist

- [x] Owner authorization recorded above and in data/approved-media.json.
- [x] Official Tanger association visually verified; same emblem observed on Brussels profile.
- [x] Single selected visible logo exported through supported browser page-assets capability after authorization; no bulk retrieval, gated post or bypass.
- [x] Exact bytes/hash, dimensions, original filename, source profile and import date recorded in data/media-manifest.json. This profile image has no individual post URL.
- [x] Inspected: illustrated burger emblem, no people. Full image retained unchanged, no crop/retouch/recompression.
- [x] Conservative business attribution displayed. High-resolution original still needed.
- [x] Embedded metadata inspected: IPTC Facebook processing marker only, no EXIF/XMP/GPS, personal names or creator credit. Review bound to metadata hash. No session/CDN query parameters committed.

## Future original intake

1. Put authorized originals in ignored incoming-media/. Private contracts/releases stay outside the repo.
2. Inspect each file; record source/post URL or owner-supplied URN, platform, rights holder, association, permission reference, people clearance, bilingual alt text, attribution and crop/edit permissions.
3. Compute SHA-256 and complete data/approved-media.json using its example. Pending records cannot import.
4. Run `pnpm media:check`, then `pnpm media:import`; inspect visible credit and responsive placement.
5. Approved files are never overwritten. Replacement requires explicit approval of a new versioned ID/filename.

Importer accepts local raster originals only; URLs are provenance, not download instructions. Embedded EXIF/XMP/IPTC needs documented hash-bound review or an approved clean export. Bytes are never silently altered. Required credit appears with media/lightbox. Contain sizing preserves full images; no-edit assets bypass recompression.

Unavailable originals remain official links. Empty media data is supported. Need high-resolution logo, food/restaurant/packaging originals, confirmed menu and any separate third-party rights. Do not request the existing business-owned authorization again.
