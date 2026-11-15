// Post-build: render the public pages to static HTML.
//
// Why: the site is a client-side React app, so without this every URL served an
// empty <div id="root">. Google can render JS (slowly); GPTBot, ClaudeBot,
// PerplexityBot and most AI/answer engines cannot. Prerendering puts the real
// content, per-page titles/descriptions/canonicals and JSON-LD into the HTML,
// and gives browsers something to paint before the JS bundle runs.
//
// Also writes sitemap.xml, llms.txt and llms-full.txt from the same data.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

// Minimal browser shims for providers that read storage during render.
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};

const { render } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const { SITE_URL, BUSINESS, FAQS, GUIDE } = await import(
  pathToFileURL(join(root, "src", "seo", "site.js")).href
);
const { productName } = await import(pathToFileURL(join(root, "src", "seo", "schema.js")).href);
const products = JSON.parse(readFileSync(join(root, "src", "Data", "productsSnapshot.json"), "utf8"));

const template = readFileSync(join(dist, "index.html"), "utf8");
const HEAD_RE = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
if (!HEAD_RE.test(template) || !template.includes("<!--seo-body-->")) {
  throw new Error("index.html is missing the <!--seo-head--> / <!--seo-body--> markers");
}

const HOISTABLE_RE =
  /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*rel="(?:canonical|preload)"[^>]*\/?>/g;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const preloadImg = (href, srcset, sizes) =>
  `<link rel="preload" as="image" fetchpriority="high" href="${esc(href)}"` +
  (srcset ? ` imagesrcset="${esc(srcset)}" imagesizes="${esc(sizes)}"` : "") +
  " />";
const { makeImageHelpers } = await import(pathToFileURL(join(root, "src", "utils", "imageCore.js")).href);
const { cld, cldSrcSet: cldSet } = makeImageHelpers(
  JSON.parse(readFileSync(join(root, "src", "Data", "productImages.json"), "utf8")),
);
const firstImage = (p) => p.colors?.[0]?.images?.[0] || p.image;

const routes = [
  {
    path: "/",
    file: "index.html",
    preload: preloadImg(
      "/images/hero1-1280.webp",
      "/images/hero1-640.webp 640w, /images/hero1-1280.webp 1280w, /images/hero1-1920.webp 1537w",
      "100vw",
    ),
  },
  {
    path: "/shop",
    file: "shop.html",
    preload: products[0]
      ? preloadImg(
          cld(products[0].image, 640),
          cldSet(products[0].image, [320, 480, 640, 800, 960]),
          "(min-width: 1280px) 340px, (min-width: 768px) 45vw, calc(100vw - 48px)",
        )
      : "",
  },
  { path: "/collections", file: "collections.html" },
  { path: GUIDE.path, file: `${GUIDE.path.slice(1)}.html` },
  { path: "/contact", file: "contact.html" },
  { path: "/returns-refunds", file: "returns-refunds.html" },
  { path: "/privacy-policy", file: "privacy-policy.html" },
  ...products.map((p) => ({
    path: `/product/${p._id}`,
    file: `product/${p._id}.html`,
    preload: preloadImg(
      cld(firstImage(p), 1000),
      cldSet(firstImage(p), [480, 640, 800, 1000, 1400]),
      "(min-width: 1024px) 60vw, calc(100vw - 48px)",
    ),
  })),
];

for (const route of routes) {
  const rendered = await render(route.path);
  if (!rendered.html.includes("<h1")) throw new Error(`Prerender of ${route.path} produced no <h1>`);
  // React 19 renders <title>/<meta>/<link> where the component sits and
  // hoists them on the client. In static HTML they must live in <head>, tagged
  // so main.jsx can drop them before React inserts its own copies. JSON-LD
  // <script>s are not hoisted by React, so they stay in place (valid in body).
  const hoisted = [];
  const html = rendered.html.replace(HOISTABLE_RE, (tag) => {
    if (!/rel="preload"/.test(tag)) hoisted.push(tag.replace(/^<(\w+)/, "<$1 data-prerender"));
    return "";
  });
  if (!hoisted.some((t) => t.startsWith("<title"))) throw new Error(`No <title> for ${route.path}`);
  const headTags = [rendered.head, ...hoisted, route.preload].filter(Boolean).join("\n    ");
  const page = template.replace(HEAD_RE, headTags).replace("<!--seo-body-->", html);
  const out = join(dist, route.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  console.log(`[prerender] ${route.path} -> ${route.file} (${(page.length / 1024).toFixed(1)} KB)`);
}

// SPA fallback for app-only routes (login, cart, checkout, admin…): no
// prerendered content and not indexable.
writeFileSync(
  join(dist, "app.html"),
  template
    .replace(HEAD_RE, '<title>Charsadda Chappal</title>\n    <meta name="robots" content="noindex, follow" />')
    .replace("<!--seo-body-->", ""),
);

// ---------- sitemap.xml ----------
const today = new Date().toISOString().slice(0, 10);
const lastmod = (p) => (p.updatedAt || today).slice(0, 10);
const urls = [
  ["/", today, "1.0"],
  ["/shop", today, "0.9"],
  [GUIDE.path, today, "0.8"],
  ["/collections", today, "0.7"],
  ...products.map((p) => [`/product/${p._id}`, lastmod(p), "0.9", p]),
  ["/contact", today, "0.5"],
  ["/returns-refunds", today, "0.3"],
  ["/privacy-policy", today, "0.2"],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    ([path, mod, pri, p]) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${mod}</lastmod>
    <priority>${pri}</priority>${
      p
        ? (p.colors || [])
            .flatMap((c) => c.images || [])
            .slice(0, 5)
            .map((img) => `\n    <image:image><image:loc>${esc(img)}</image:loc></image:image>`)
            .join("")
        : ""
    }
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

// ---------- llms.txt (https://llmstxt.org) ----------
const sizeRange = (p) => {
  const n = (p.sizes || []).map((s) => Number((s.match(/PAK\s*(\d+)/i) || [])[1])).filter(Boolean);
  return n.length ? `PAK ${Math.min(...n)}–${Math.max(...n)}` : "on request";
};
const clip = (s, n) => (s.length <= n ? s : `${s.slice(0, n).replace(/\s+\S*$/, "")}…`);
const plain = (s) => String(s || "").replace(/\s+/g, " ").trim();
const productLines = products
  .map(
    (p) =>
      `- [${productName(p)}](${SITE_URL}/product/${p._id}): PKR ${Number(p.price).toLocaleString("en-US")}, ` +
      `${(p.colors || []).map((c) => c.name).join("/") || "leather"}, sizes ${sizeRange(p)}. ${clip(plain(p.description), 140)}`,
  )
  .join("\n");

const llms = `# Charsadda Chappal

> ${BUSINESS.description}

Charsadda Chappal (${SITE_URL}) sells genuine-leather Charsadda/Peshawari chappals handmade in ${BUSINESS.locality}, ${BUSINESS.region}, Pakistan. Prices are in Pakistani rupees (PKR), delivery is free across Pakistan, payment is in advance via EasyPaisa or JazzCash, and unused items can be returned or exchanged within ${BUSINESS.returnDays} days. Orders and questions: WhatsApp/phone ${BUSINESS.phones.join(", ")}, email ${BUSINESS.email}.

## Products

${productLines}

## Guides

- [Charsadda Chappal Guide](${SITE_URL}${GUIDE.path}): what a Charsadda chappal is, Kaptaan vs Zardari vs Gol T, sizes, prices in Pakistan, spotting genuine leather, care.
- [FAQs](${SITE_URL}/#faq): short answers about prices, sizing, delivery, returns and ordering.

## Shop

- [All Charsadda chappals](${SITE_URL}/shop): full catalogue with prices and sizes.
- [Collections](${SITE_URL}/collections): Kaptaan, Zardari and Gol T collections.
- [Contact](${SITE_URL}/contact): WhatsApp, phone and email.
- [Returns & refunds](${SITE_URL}/returns-refunds): ${BUSINESS.returnDays}-day return and exchange policy.

## For AI agents

- [Agent resource manifest](${SITE_URL}/.well-known/ard.json): machine-readable index of this site's agent resources.
- [Full content for LLMs](${SITE_URL}/llms-full.txt): FAQs and buying guide in one Markdown file.
- In supporting browsers the site registers WebMCP tools: search_products, get_product_details, add_to_cart, view_cart, go_to_checkout, get_store_info. Orders are only placed after the shopper confirms checkout.

## Optional

- [Privacy policy](${SITE_URL}/privacy-policy)
- [Instagram](${BUSINESS.sameAs[0]})
- [Facebook](${BUSINESS.sameAs[1]})
`;
writeFileSync(join(dist, "llms.txt"), llms);

const guideMd = GUIDE.sections
  .map((s) => {
    let md = `### ${s.h}\n\n`;
    if (s.p) md += s.p.join("\n\n") + "\n\n";
    if (s.list) md += s.list.map((l) => `- ${l}`).join("\n") + "\n\n";
    if (s.steps) md += s.steps.map((l, i) => `${i + 1}. ${l}`).join("\n") + "\n\n";
    if (s.table)
      md +=
        `| ${s.table.head.join(" | ")} |\n| ${s.table.head.map(() => "---").join(" | ")} |\n` +
        s.table.rows.map((r) => `| ${r.join(" | ")} |`).join("\n") +
        "\n\n";
    return md;
  })
  .join("");

const llmsFull = `${llms}
---

## ${GUIDE.title}

Source: ${SITE_URL}${GUIDE.path}

${GUIDE.intro}

${guideMd}## Frequently asked questions

${FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Product details

${products
  .map(
    (p) => `### ${productName(p)}

- URL: ${SITE_URL}/product/${p._id}
- Price: PKR ${Number(p.price).toLocaleString("en-US")}
- Availability: ${p.stock > 0 ? "In stock" : "Out of stock"}
- Colours: ${(p.colors || []).map((c) => c.name).join(", ")}
- Sizes: ${(p.sizes || []).join(", ")}
- Material: genuine leather, handmade in ${BUSINESS.locality}, Pakistan

${plain(p.description)}`,
  )
  .join("\n\n")}
`;
writeFileSync(join(dist, "llms-full.txt"), llmsFull);

console.log(`[prerender] wrote sitemap.xml (${urls.length} URLs), llms.txt, llms-full.txt, app.html`);
