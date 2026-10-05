# Performance and static hosting

Last verified locally: 2026-10-05. Hosting policy sources below were researched on 2026-09-24.

## Architecture

This is a client-rendered React/Vite site. The production output is static HTML, CSS, JavaScript, images, and a PDF. Navigation, reveals, the signal canvas, and guitar interaction run in each visitor's browser. There is no portfolio application server, database connection, or server-rendering work per visitor. More simultaneous visitors mainly increase CDN asset delivery; they do not share a rendering process.

The contact form is the exception: it submits directly to EmailJS. Its quota is independent of the website host. A CDN does not make email delivery unlimited. The direct email link remains available when sending fails.

Unused React Query, tooltip, and both toast providers were removed from the active application. Native motion replaces the active Motion runtime, and EmailJS loads only when submitting the form. Navigation uses native anchors; the landing-page/404 choice does not load a routing runtime. The single-page site currently does not need manual vendor chunk splitting: dividing code still needed at startup would not remove its download or execution cost.

Measured production assets after optimization:

| Asset | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Main JavaScript | 187,430 | 59,298 |
| EmailJS, loaded on submit | 1,495 | 762 |
| CSS | 46,813 | 10,231 |
| Bricolage Grotesque Latin variable WOFF2 | 76,888 | Already compressed |
| Manrope Latin variable WOFF2 | 24,836 | Already compressed |

The earlier bundle was 463.74 kB of JavaScript (149.01 kB gzip); initial JavaScript is now approximately 60% smaller compressed, and 8% smaller than the preceding 64.7 KB version. These are local build measurements, not network timing or a traffic capacity claim. Images, fonts, HTML and the résumé are separate transfers. Run a fresh build after changes to get updated artifact sizes.

The table reflects the subsequent humanizer pass and latest résumé content update. The new résumé is 116,524 bytes and downloads only when opened; it adds no startup JavaScript. Timing samples below were captured during the performance pass, before these content updates; the rendering and delivery architecture is unchanged.

Fonts now ship from the same origin with Vite content hashes and preload hints, eliminating the external render-blocking Google Fonts stylesheet. Only the Latin variable subsets needed by the current English site are bundled, and both original OFL licenses are retained. [Google Fonts variable-font API](https://developers.google.com/fonts/docs/css2), [Font-loading best practices](https://web.dev/articles/font-best-practices).

## Build and verify

Active Tailwind scanning excludes archived sections and unused UI templates without deleting them. Photography is lazy-loaded and delivered as WebP: the enhanced portrait is 49.8 KB; the motorcycle is 162.3 KB at 540px or 359.3 KB at 900px. Project screenshots have 960px and original-width WebP variants selected by native `srcset`. At 390px/1x density the four images total 290,274 bytes, versus 767,343 bytes previously (62% smaller); higher-density screens can fetch larger variants. Originals are retained. These are asset sizes, not real-user Web Vitals.

The final browser regression suite passed all 13 tests on 2026-10-05, including actual local-font loading, smaller mobile image selection, and stopping offscreen canvas updates. Screenshots at 320, 390, 768, and 1440px check overflow and page errors. This verifies Chromium; physical iOS and Safari execution remain untested.

`node scripts/measure-performance.mjs <label>` measures a cold-cache local production preview at 390px with 4x CPU slowdown and no network throttling (default port 4175, override `PORTFOLIO_URL`). Results are saved in `tmp/performance/`. Isolated samples after self-hosting fonts showed 660ms LCP initially and 508ms on the final build, both with zero CLS. The preceding external-font sample showed 8,164ms LCP, including a 7.4-second font stylesheet request, and 0.082 CLS. The large difference reflects removing that external dependency in this environment, not a promised percentage speedup on every network. Run timing samples separately from other browser tests to avoid CPU contention. These are synthetic results, not field Web Vitals or a deployed Lighthouse score.

```sh
npm ci
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx playwright test
```

Playwright builds the application and starts Vite's production preview on `127.0.0.1:4174`. It deliberately refuses to reuse another server, avoiding accidental testing of a stale development build. Stop any existing service on that port first. Install the matching Chromium browser with `npx playwright install chromium` if it is not already available.

The browser suite intercepts all EmailJS traffic, so it tests pending, success and error UI without delivering messages. It also checks invalid inputs, repeated submit protection, read-only fields during submission, keyboard hiring/project selection, 404 routing, mobile navigation, reduced motion, persisted motion preference, responsive overflow, and the actual PDF response. These checks are not a load test or a measurement of every mobile device's frame rate.

To inspect a build manually:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Vite preview is a local verification server. Publish `dist/` to the static host, not the preview process.

## Hosting

Cloudflare Pages is a suitable starting point for this static freelance portfolio. Its documentation currently states that static asset requests are free and unlimited when they do not invoke Functions. Functions use separate Workers quotas; the present application does not require a Function. Other platform limits and terms still apply. [Cloudflare Pages pricing](https://developers.cloudflare.com/pages/functions/pricing/)

In the host's Git build settings, use `npm run build` as the build command and `dist` as the output directory. Set the three existing build-time values `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. Vite embeds `VITE_` values into client JavaScript, so never place private server credentials in them. Ensure the EmailJS template matches the form's `name`, `email`, and `message` fields. Rebuild after changing environment values.

Configure SPA navigation fallback to `index.html` for paths that are not existing assets, so the React 404 page is reached on a direct unknown URL. Preserve actual asset responses; a missing JavaScript or PDF file must not silently become an HTML page. Keep HTTPS enabled.

Vercel Hobby is limited to non-commercial personal use, and its guidelines count advertising services as commercial usage. Since this portfolio offers freelance work, do not assume Hobby is an eligible free host; choose a suitable plan or another provider after reviewing the policy. [Vercel fair-use guidelines](https://vercel.com/docs/limits/fair-use-guidelines)

## Caching and browser work

Recommended host policy: long immutable caching for the content-hashed `/assets/` files, and revalidation for HTML. Stable-name files such as the résumé and project images should use shorter caching or versioned filenames when updated. Do not apply year-long immutable caching to all of `public/`: those filenames can keep the same URL after their content changes. Enable the host's supported compression.

Motion remains client-side, pauses when offscreen or the tab is hidden, and respects the visible motion control and device reduced-motion preference. The signal sculpture uses 64 rings × 32 segments with a 24fps target on mobile, versus 132 × 48 with a 30fps target on desktop; canvas pixel density is capped at 1.5. Rotation math is factored once per ring and geometry buffers are reused. This is an explicit rendering budget, not a frame-rate guarantee. Avoid video backgrounds or continuously running work in sections that cannot be seen. Check frame pacing on a real midrange phone before calling the experience universally smooth.

## Email delivery and capacity limits

EmailJS currently lists 200 monthly requests on its Free plan and says requests stop being processed when the plan quota is reached. This is a service-wide allowance, not a concurrent website visitor limit. Check the account's actual plan and usage before launch, monitor its quota notifications, and keep the visible direct email alternative. [EmailJS pricing and quota FAQ](https://www.emailjs.com/pricing/)

No production load test or measured “1,000 simultaneous users” guarantee has been performed. Static CDN delivery is an appropriate architecture for traffic bursts, but browser device speed, network quality, provider policy, and EmailJS capacity remain independent constraints. A production smoke test should confirm asset caching, direct-route fallback, HTTPS, and one owner-authorized real contact submission after deployment.
