# Portfolio photography

The original user files remain untouched.

- `public/ayush-portrait.jpg`: 800px-wide delivery derivative of the enhanced portrait, about 89 KB. Built-in image generation was used for the enhancement, with this prompt:

  > Gently enhance this exact real portrait for a personal portfolio: neutralize green cast, lift facial exposure slightly and improve natural clarity. Preserve exact identity, face proportions, skin texture, hairstyle, expression, pose, hands, clothing and watch. Crop excess blank wall at top for a balanced vertical 4:5 composition showing face and both peace signs. Keep the pale green wall. No beautification or new elements. Output one photograph.

- `public/ayush-cb350rs.jpg`: 900px-wide JPEG delivery derivative of the user's street photograph. No generative retouching; the original mood and composition remain. About 399 KB, lazy-loaded below the engineering content.
- `public/ayush.png`: original portfolio photo retained, no longer displayed.

`scripts/export-photos.ps1` performs deployment resizing/encoding only. It does not modify source files. The rainy motorcycle image was not selected because the local JPEG has visible stitching artifacts.

## Fast delivery formats

The displayed photos now use WebP derivatives; JPEG originals remain in the project. `scripts/encode-images.mjs` uses the installed Chromium canvas encoder for format conversion and proportional resizing only, not creative retouching. It also produces smaller project screenshots while retaining the source PNGs.

| Display asset | Bytes |
| --- | ---: |
| Portrait, 800px | 49,844 |
| Motorcycle, 900px | 359,292 |
| Motorcycle, 540px | 162,262 |
| QAForge, 1919px / 960px | 121,698 / 41,870 |
| Bloom, 1918px / 960px | 94,908 / 36,298 |

Native `srcset` selection accounts for viewport size and pixel density; photography remains lazy-loaded. A 390px, 1x-density browser selects the 540px motorcycle and 960px project images. Higher-density screens can select larger images to preserve clarity.
