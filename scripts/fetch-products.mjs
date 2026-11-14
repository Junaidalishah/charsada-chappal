// Prebuild:
// 1. Snapshot the live catalogue so pages, structured data, llms.txt and the
//    sitemap ship real product data in static HTML (AI crawlers don't run JS),
//    and the shop renders instantly instead of waiting on a Render cold start.
// 2. Mirror each product photo to /images/p/ as resized WebP, so the LCP image
//    is served from the site's own CDN (no extra connection, no cold
//    Cloudinary transformation). Anything that fails falls back to Cloudinary.
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const API = process.env.PRODUCTS_API || "https://charsada-chappal.onrender.com/api/products";
const OUT = new URL("../src/Data/productsSnapshot.json", import.meta.url);
const MAP = new URL("../src/Data/productImages.json", import.meta.url);
const IMG_DIR = new URL("../public/images/p/", import.meta.url);
export const WIDTHS = [320, 480, 640, 800, 1000, 1400];

let products;
try {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 90_000);
  const res = await fetch(API, { signal: ctrl.signal });
  clearTimeout(t);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  products = await res.json();
  if (!Array.isArray(products) || products.length === 0) throw new Error("empty catalogue");
  writeFileSync(OUT, JSON.stringify(products, null, 2) + "\n");
  console.log(`[fetch-products] saved ${products.length} products`);
} catch (err) {
  products = JSON.parse(readFileSync(OUT, "utf8"));
  console.warn(`[fetch-products] ${err.message}; keeping committed snapshot (${products.length} products)`);
}

const urls = new Set();
for (const p of products) {
  if (p.image) urls.add(p.image);
  for (const c of p.colors || []) for (const i of c.images || []) urls.add(i);
}

mkdirSync(IMG_DIR, { recursive: true });
const map = {};
await Promise.all(
  [...urls]
    .filter((u) => u.includes("res.cloudinary.com") && u.includes("/upload/"))
    .map(async (url) => {
      const name = createHash("sha1").update(url).digest("hex").slice(0, 12);
      try {
        for (const w of WIDTHS) {
          const file = new URL(`${name}-${w}.webp`, IMG_DIR);
          if (existsSync(file)) continue;
          const src = url.replace("/upload/", `/upload/f_webp,q_auto,c_limit,w_${w}/`);
          const res = await fetch(src);
          if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
          writeFileSync(file, Buffer.from(await res.arrayBuffer()));
        }
        map[url] = name;
      } catch (err) {
        console.warn(`[fetch-products] image mirror skipped: ${err.message}`);
      }
    }),
);
writeFileSync(MAP, JSON.stringify({ widths: WIDTHS, images: map }, null, 2) + "\n");
console.log(`[fetch-products] mirrored ${Object.keys(map).length}/${urls.size} product images`);
