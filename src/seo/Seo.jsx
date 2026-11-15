import { Helmet } from "react-helmet-async";
import { SITE_URL, PAGES, BUSINESS } from "./site.js";

// Per-route <head>. scripts/prerender.mjs copies these tags into each page's
// static <head> (marked data-prerender) for crawlers that don't run JS;
// main.jsx removes those copies before React renders its own.
export default function Seo({ path, title, description, image, type = "website", jsonLd, noindex }) {
  const page = PAGES[path] || {};
  const t = title || page.title || PAGES["/"].title;
  const d = description || page.description || PAGES["/"].description;
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const img = image ? (image.startsWith("/") ? `${SITE_URL}${image}` : image) : BUSINESS.image;

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_PK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
