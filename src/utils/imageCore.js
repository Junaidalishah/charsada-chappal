// Pure helpers (no JSON import) so scripts/prerender.mjs can use them in Node.
// Product photos mirrored at build time (scripts/fetch-products.mjs) are served
// from /images/p/ on our own CDN; anything else gets an on-the-fly Cloudinary
// transformation instead of the original multi-MB PNG.
export function makeImageHelpers({ widths = [], images = {} } = {}) {
  const pick = (w) => widths.find((x) => x >= w) || widths[widths.length - 1];

  const cld = (url, width = 600) => {
    if (!url || typeof url !== "string") return url;
    const local = images[url];
    if (local && widths.length) return `/images/p/${local}-${pick(width)}.webp`;
    if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
    if (/\/upload\/[^/]*(w_|f_auto|q_auto)/.test(url)) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
  };

  const cldSrcSet = (url, want = [320, 480, 640, 800, 960]) => {
    if (!url) return undefined;
    if (images[url] && widths.length) {
      const ws = [...new Set(want.map(pick))];
      return ws.map((w) => `/images/p/${images[url]}-${w}.webp ${w}w`).join(", ");
    }
    return url.includes("res.cloudinary.com")
      ? want.map((w) => `${cld(url, w)} ${w}w`).join(", ")
      : undefined;
  };

  return { cld, cldSrcSet };
}
