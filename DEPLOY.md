# Deploying the SEO / AEO / agentic-browsing update

Branch: `seo-aeo-geo-agentic`. Deploy in this order.

## 1. Backend (Render) — first

The frontend now calls two new backend routes (`/api/health`, `/api/meta/events`).
Deploy the backend before the frontend, otherwise browsers get 404s.

1. Merge the branch (or deploy it) on the Render service `charsada-chappal`.
2. Add these environment variables in Render → the service → **Environment**:

   | Name | Value |
   |---|---|
   | `META_PIXEL_ID` | `3263994340476127` |
   | `META_CAPI_TOKEN` | Meta Events Manager → select the pixel → **Settings** → **Conversions API** → **Generate access token** |

   Without `META_CAPI_TOKEN` the `/api/meta/events` route accepts requests and does nothing.
   Optional: `META_TEST_EVENT_CODE` (from Events Manager → **Test events**) to check events arrive, then remove it.
3. Check `https://charsada-chappal.onrender.com/api/health` returns `{"status":"ok",...}`.

## 2. Frontend (Vercel)

Vercel's build command stays `npm run build`. It now:
1. fetches the live catalogue and product photos (`scripts/fetch-products.mjs`),
2. builds the app,
3. prerenders every public page and writes `sitemap.xml`, `llms.txt` and `llms-full.txt`
   (`scripts/prerender.mjs`).

Redeploy (or trigger a new build) whenever products change, so the static pages,
sitemap and structured data pick up new products and prices.

After deploying, check:
- https://www.charsaddachappal.store/sitemap.xml
- https://www.charsaddachappal.store/llms.txt
- https://www.charsaddachappal.store/.well-known/ard.json
- View source of https://www.charsaddachappal.store/shop shows product names in the HTML.

## 3. Submit the sitemap

The sitemap URL is **https://www.charsaddachappal.store/sitemap.xml** (generated on every build; don't upload a file).

- **Google:** https://search.google.com/search-console → add/verify property
  `charsaddachappal.store` (Domain property, DNS TXT record) → **Sitemaps** → enter `sitemap.xml` → **Submit**.
  Then **URL inspection** → `https://www.charsaddachappal.store/` → **Request indexing**.
- **Bing (also feeds ChatGPT search and Microsoft Copilot):** https://www.bing.com/webmasters →
  **Import from Google Search Console** (or add the site manually) → **Sitemaps** → submit the same URL.
- **ChatGPT / Perplexity / Claude:** there is no submission form. They find the site through
  Bing and their own crawlers, which `robots.txt` allows, and read `llms.txt`.

## 4. Keep the backend awake

Use the separate public repo `charsada-keepalive` (GitHub Actions ping every 10 minutes),
and/or a free job at https://cron-job.org calling `https://charsada-chappal.onrender.com/api/health`
every 10 minutes.

## Security

`server.js` used to print `EMAIL_PASS` to the logs. That line is removed, but the
password is in old Render logs: change it.
