# Verification — 17 September 2026

Verified locally using Node.js 24 and Microsoft Edge through Playwright.

- Next.js production compilation and static page generation: passed.
- TypeScript strict checking: passed.
- ESLint: passed without warnings after configuration cleanup.
- French and Darija at 360, 768, 1024 and 1440 CSS pixels: document width matches viewport; no horizontal page scrolling.
- All local images decoded successfully at every tested size.
- French is the initial language; both selectors update content, document language and direction without reloading.
- Menu category filtering and reset: passed.
- Eight-image gallery: opening, next image and Escape dismissal passed.
- Legal placeholder dialog: opening and Escape dismissal passed.
- Keyboard Tab cycling stays inside the gallery dialog and Escape returns focus to its opener. An explicit focus loop handles Edge's native dialog focus behavior.
- Mobile menu: opening, anchor navigation and closing passed.
- All internal anchor targets exist.
- WhatsApp links contain the supplied phone number and encoded message; telephone, Instagram and Maps targets match the supplied details.
- No browser JavaScript errors observed.
- Desktop and mobile screenshots reviewed in both languages.

The first layout check identified overflow from the rotated hero illustration. Clipping its decorative container resolved it at all eight language/viewport combinations. The initial cold development request exceeded a browser navigation timeout; the server returned HTTP 200 and subsequent checks passed. No production build warning remains after adding a metadata base fallback.

External links were inspected, not used to send a message or place an order. Restaurant ownership, menu details, WhatsApp account availability, photographs and linguistic/legal accuracy require owner validation. This is a commercial demo with explicit placeholders, not a live ordering platform.

Screenshots and local browser scripts are stored in ignored `test-results/`; no machine-specific browser paths are required to build the project.
