# Validation — 27 October 2026

Validated locally in the existing cloud checkout `/workspace/burgerista`, on Node 24.19.0, npm 11.9.0 and system Chromium 154.0.8037.57. These are current-instance results, not a deployed-host or fresh-task restoration claim.

## Build and checks

| Check                          | Actual outcome                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| Frozen installation (`npm ci`) | Passed; lockfile-based installation completed                                               |
| `npm run build`                | Passed; nine route entries generated, homepage first-load JS 118 kB                         |
| `npm run typecheck`            | Passed                                                                                      |
| `npm run lint`                 | Passed, no warnings                                                                         |
| `npm test`                     | 4 tests passed                                                                              |
| `npm run test:e2e`             | 13 tests passed; 1 intentionally skipped (the mobile-menu test in the desktop project)      |
| `npm audit --omit=dev`         | Zero production vulnerabilities reported                                                    |
| Axe browser checks             | No serious or critical violations on desktop or mobile                                      |
| HTTP functional requests       | Homepage, both legal routes, robots, sitemap, social image and burger SVG returned HTTP 200 |

The build reports that the Open Graph image uses the edge runtime and therefore is generated on request; this is expected. Browser download from cdn.playwright.dev was blocked by the proxy, so tests use the already-installed system Chromium without disabling TLS or artifact verification.

The PostCSS override selects a patched, API-compatible 8.5 release instead of Next.js's vulnerable transitive version. Installation, compilation and browser behavior were validated with this override. Maintain it when upgrading Next.js and periodically rerun the audit.

## Functional coverage

Both desktop and mobile exercise homepage rendering, category filtering, product details, escape-to-close, burger preview updates and reset, FAQ opening/closing, official directory destination, story stage progression, legal routes, reduced-motion styling, marquee pause/resume, and clean hydration with no browser errors. Mobile additionally checks menu navigation, escape and focus restoration. The tests verify no document overflow at 320, 375, 390, 430, 768, 1024, 1440 and 1920 px.

The actual restaurant dataset is empty, so populated region/city filters, restaurant details, directions and location-specific ordering cannot be validated against real stores. Their implementation is available for approved content; this is not a claim of a live, complete multi-location directory. No order processing, app download, promotion or genuine review integration was tested or claimed.

## Lighthouse 13.5.0

Measured against the production server on the cloud machine, with default mobile simulation and the desktop preset. These are individual local lab runs and can vary with CPU load, cache, network and hosting.

| Category       | Mobile | Desktop |
| -------------- | -----: | ------: |
| Performance    |     96 |     100 |
| Accessibility  |    100 |     100 |
| Best practices |    100 |     100 |
| SEO            |     66 |      66 |

Mobile LCP: 2.6 s; TBT: 90 ms; CLS: 0.024. Desktop LCP: 0.6 s; TBT: 0 ms; CLS: 0.001. Exact metrics and run times are in `lighthouse-summary.json`.

The SEO target is **not achieved**: indexing is intentionally blocked while `NEXT_PUBLIC_SITE_URL` is unset. Supply the actual approved deployment domain, complete legal/content review, rebuild, and rerun SEO validation on the deployed host. No false official-domain canonical or Restaurant/Organization identity is emitted to inflate the score.

Earlier mobile runs varied between 85 and 95 before removing redundant animation runtime and repeated menu SVG markup. The final measured application no longer includes Motion; CSS/IntersectionObserver provide the required effects. Homepage JS decreased from 152 kB to 118 kB. No claim is made that these lab scores guarantee field performance.

Reproduce the mobile audit with installed Lighthouse and Chromium:

```sh
CHROME_PATH=/usr/bin/chromium npx lighthouse http://127.0.0.1:3000 \
  --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
  --output=json --output-path=/tmp/burgerista-lighthouse-mobile.json
```

The `--no-sandbox` flag is specific to this containerized Chromium runner; it is unrelated to TLS/signature verification or the website deployment. Use your browser runner's appropriate sandbox configuration elsewhere. Add `--preset=desktop` for the desktop run.

## Visual inspection

Reviewed mobile hero, menu cards, builder, location fallback and FAQ, plus desktop hero and story. Confirmed readable type, contained layouts, original imagery and working controls. Stable reduced-motion reference screenshots are saved in `screenshots/desktop.png`, `screenshots/mobile.png`, `screenshots/story.png` and `screenshots/builder.png`. Additional runner images/traces are ignored in `test-results/`.

## Remaining external prerequisites

Official reference URLs were blocked with proxy HTTP 403, so no live source inspection, current menu recipes, store hours, prices, campaigns or external ordering transactions were verified. See `CONTENT.md` for the precise owner inputs required before launch. Legal routes are explicitly incomplete drafts. No public deployment, Git push, published environment snapshot or restored future task was verified. Git commits are local until the owner publishes them to the remote repository.
