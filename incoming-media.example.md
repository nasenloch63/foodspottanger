# Original media intake

Put authorized local raster originals in ignored incoming-media/. Keep private contracts, releases and credentials outside the repository. Complete MEDIA_APPROVAL.md and data/approved-media.json using its example.

Importer copies bytes unchanged, verifies dimensions/hash and records provenance. Embedded EXIF/XMP/IPTC needs a documented privacy/credit review: metadataReview.note plus metadataReview.sha256 of concatenated EXIF, XMP, IPTC buffers (in that order), or an approved metadata-clean export. It never silently strips metadata. The imported logo is a completed review example.
