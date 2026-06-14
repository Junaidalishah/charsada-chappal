import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const products = await Product.find().select("_id updatedAt");

    const productUrls = products
      .map((p) => {
        return `
  <url>
    <loc>https://www.charsaddachappal.store/product/${p._id}</loc>
    <lastmod>${p.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.charsaddachappal.store/</loc>
  </url>

  <url>
    <loc>https://www.charsaddachappal.store/shop</loc>
  </url>

  <url>
    <loc>https://www.charsaddachappal.store/contact</loc>
  </url>

  ${productUrls}

</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Sitemap error:", error);
    res.status(500).send("Sitemap error");
  }
});

export default router;
