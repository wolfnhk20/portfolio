# Final website verification

Verified 2026-10-05 against the active production build.

- The latest user-supplied `F:/resume/resume_ayush.pdf` is served unchanged at `/resume_ayush.pdf`. Source and public-copy SHA-256 match: `CC9DF2BB82E98BBDC9460C09E0D5901D846BD61B81E08AB30199D3DB9734C626`. Desktop navigation, mobile navigation, hiring, and contact links use the new file. Experience, Ragora details, skills, and education reflect the new résumé. Previous PDFs are retained but unlinked by the active site.
- The full English site copy was reviewed using `humanizer-zh`'s plain-language and fact-preservation rules: hero, projects, hiring/freelance panels, bio, experience, skills, music, contact microcopy, 404, and search/share descriptions. Professional facts, numeric claims, dates, URLs, IDs, functionality, and performance architecture were preserved. Browser assertions now match the clearer message-field label.
- Citron/cobalt visual identity, procedural signal sculpture, native scroll motion, responsive project tilt, image reveals, and optional guitar interaction are implemented.
- Hiring and freelance routes expose their respective next steps; the freelance hero link selects the project panel.
- Enhanced portrait and the supplied CB350RS photograph load from the project's public assets. Original photographs are retained.
- Production build, TypeScript, and targeted ESLint pass. All 13 Playwright browser tests pass, covering mobile navigation, contact validation/pending/success/failure, duplicate-send prevention, motion preferences, hiring/project selection, PDF response, and 404 routing. The additional performance regression checks actual local-font loading, responsive image selection, and a stationary offscreen canvas.
- Current screenshots at 320, 390, 768, and 1440px show no horizontal overflow or page errors. Screenshots are in `tmp/screenshots/`; the independent finish reviewer found no material layout blockers.
- Mobile inputs use 16px text, actions have usable touch areas, the open menu can scroll on short screens, and layout accommodates safe-area insets.
- The site produces static CDN-ready files in `dist/` and includes cache headers. Startup JavaScript is approximately 59 KB gzip and CSS approximately 10 KB gzip. Fonts are self-hosted and preloaded; photography and project screenshots use WebP with appropriately sized mobile variants. Originals are retained.

Physical iPhone/Safari testing and production traffic load testing were not performed. Email delivery was mocked in tests. Gstack's installed Windows browser daemon could not resolve its runtime dependencies; visual verification used the working project Playwright installation. The site has not been published by this task.
