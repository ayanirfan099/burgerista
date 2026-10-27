# Content, assets and launch requirements

## Sources and research

Reference URLs supplied by the owner:

- https://smash-me.at/ — intended interaction-quality reference
- https://www.burgerista.com/ — intended brand/content reference
- https://www.burgerista.com/speisekarte/
- https://www.burgerista.com/standorte/

During implementation on 27 October 2026 all four requests failed at the cloud network proxy with HTTP 403 / tunnel forbidden. The sites were not visually inspected, and no live restaurant facts or external ordering endpoints were verified. Native Git access to the existing repository worked; the repository was empty with an unborn `work` branch.

Product names and the Skyscraper inspiration come from the user's brief. Descriptions are original concept copy, not sourced menu recipes. All prices, ingredients and allergens remain unknown. No fictitious reviews, ratings, campaigns, opening hours, restaurant addresses, app links or loyalty promises are published. Source links are labeled external official destinations; reachability of their live content remains unverified.

## Asset register

- `src/components/Burger.tsx`: original SVG ingredient artwork, created for this repository. Not a photograph or exact depiction of a sold product. Multiple stages and the interactive builder use its separate layers. Each instance has unique gradient/filter IDs. No copied reference artwork.
- `public/burger.svg`: static export of the same original artwork, available as a content asset.
- `src/app/opengraph-image.tsx`: original generated typographic social card.
- Barlow Condensed and DM Sans: self-hosted through `@fontsource` npm packages, distributed under their upstream open font licenses. Notices are included in installed packages.
- Lucide: icon library distributed under ISC license.
- BURGERISTA: text rendering of the brand name, not a downloaded logo. Ownership and authorized use must be approved separately.

## Missing owner inputs

1. Approved identity guide, authorized logo and product photography with usage rights.
2. Current official product recipes, category assignments, vegetarian status, ingredient lists, allergens, availability and optional verified prices.
3. Restaurant list: city, region, address, current hours, contact, directions and actual location-specific order destinations.
4. Verified brand history, preparation process and substantiated sourcing/quality claims. Story text currently describes an illustrative experience, not actual operating procedures.
5. Optional current promotions and terms, app-store and loyalty links, approved genuine reviews and attribution.
6. Operator identity and approved legal/privacy text; assessment of actual hosting data processing.
7. Actual deployment domain and authorization for public use.

Do not replace unknowns with guesses. Keep the unofficial label until the brand owner approves official use. The city filter and location cards activate when verified records are added; there are no pretend city results or directions links in the empty state.

## Editorial expansion

The data model deliberately supports CMS migration without introducing a backend. Add structured category/content records in `src/lib/content.ts`, then replace its exports with an API-backed repository layer if a CMS is commissioned. Keep the UI independent of secret credentials and sanitize/validate remote URLs at ingestion. A production ordering integration is a separate scoped service; this concept does not collect payments or personal data.
