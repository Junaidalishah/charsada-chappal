import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductsSync, loadProducts } from "../hooks/useProducts";
import { productName } from "../seo/schema.js";
import { BUSINESS, FAQS, SITE_URL } from "../seo/site.js";

// WebMCP (https://developer.chrome.com/docs/ai/webmcp): exposes the store's core
// actions as typed tools so AI agents in the browser can shop reliably instead
// of guessing at the UI. No-op in browsers without WebMCP support.

const text = (value) => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});

const summarize = (p) => ({
  productId: p._id,
  name: productName(p),
  category: p.category,
  pricePKR: Number(p.price),
  inStock: p.stock > 0,
  colors: (p.colors || []).map((c) => c.name),
  sizes: (p.sizes || []).filter((s) => !(p.disabledSizes || []).includes(s)),
  url: `${SITE_URL}/product/${p._id}`,
});

const findProduct = async (productId) => {
  const all = await loadProducts();
  return all.find((p) => p._id === productId);
};

export default function AgentTools() {
  const navigate = useNavigate();
  const cartApi = useCart();

  // Tools are registered once; refs give them the latest router/cart state.
  const navRef = useRef(navigate);
  const cartRef = useRef(cartApi);
  useEffect(() => {
    navRef.current = navigate;
    cartRef.current = cartApi;
  });

  useEffect(() => {
    // Chrome ships the API as document.modelContext; earlier previews and the
    // spec drafts used navigator.modelContext.
    const mc = document.modelContext || navigator.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;

    const tools = [
      {
        name: "search_products",
        description:
          "Search the Charsadda Chappal catalogue of handmade leather chappals (Kaptaan, Zardari, Gol T). Returns matching products with id, price in PKR, colours, available sizes and URL.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Free-text search, e.g. 'black kaptaan' or 'gol t'." },
            category: { type: "string", description: "Exact category name, e.g. 'Zardari Chappal'." },
            maxPricePKR: { type: "number", description: "Maximum price in Pakistani rupees." },
          },
        },
        annotations: { readOnlyHint: true },
        async execute({ query = "", category, maxPricePKR } = {}) {
          const words = String(query).toLowerCase().split(/\s+/).filter(Boolean);
          const results = (await loadProducts()).filter((p) => {
            if (category && p.category?.toLowerCase() !== String(category).toLowerCase()) return false;
            if (maxPricePKR && Number(p.price) > Number(maxPricePKR)) return false;
            const hay = `${p.name} ${p.category} ${p.description} ${(p.colors || []).map((c) => c.name).join(" ")}`.toLowerCase();
            return words.every((w) => hay.includes(w));
          });
          return text({ count: results.length, products: results.map(summarize) });
        },
      },
      {
        name: "get_product_details",
        description: "Get full details for one product: description, price, stock, colours, sizes and image URLs.",
        inputSchema: {
          type: "object",
          properties: {
            productId: { type: "string", description: "The productId returned by search_products." },
          },
          required: ["productId"],
        },
        annotations: { readOnlyHint: true },
        async execute({ productId }) {
          const p = await findProduct(productId);
          if (!p) return text(`No product found with id ${productId}.`);
          return text({
            ...summarize(p),
            description: String(p.description || "").replace(/\s+/g, " ").trim(),
            images: (p.colors || []).flatMap((c) => c.images || []),
            delivery: "Free delivery across Pakistan",
            returns: `${BUSINESS.returnDays}-day returns and exchanges`,
          });
        },
      },
      {
        name: "add_to_cart",
        description:
          "Add a chappal to the shopper's cart. Requires a valid size from the product's sizes list; colour defaults to the first available colour.",
        inputSchema: {
          type: "object",
          properties: {
            productId: { type: "string", description: "The productId returned by search_products." },
            size: { type: "string", description: "Exact size label, e.g. 'PAK 9 / EU 42'." },
            color: { type: "string", description: "Colour name, e.g. 'Black' or 'Brown'." },
            quantity: { type: "integer", minimum: 1, maximum: 10, description: "Number of pairs (default 1)." },
          },
          required: ["productId", "size"],
        },
        async execute({ productId, size, color, quantity = 1 }) {
          const p = await findProduct(productId);
          if (!p) return text(`No product found with id ${productId}.`);
          if (!(p.stock > 0)) return text(`${productName(p)} is out of stock.`);
          const sizes = summarize(p).sizes;
          if (!sizes.includes(size)) return text(`Size "${size}" is not available. Choose one of: ${sizes.join(", ")}.`);
          const colour =
            (p.colors || []).find((c) => c.name.toLowerCase() === String(color || "").toLowerCase()) ||
            (p.colors || [])[0];
          if (color && colour && colour.name.toLowerCase() !== String(color).toLowerCase()) {
            return text(`Colour "${color}" is not available. Choose one of: ${p.colors.map((c) => c.name).join(", ")}.`);
          }
          cartRef.current.addToCart({
            id: p._id,
            title: p.name,
            price: p.price,
            quantity: Math.max(1, Math.min(10, Number(quantity) || 1)),
            image: colour?.images?.[0] || p.image,
            color: colour?.name || "",
            size,
          });
          window.dispatchEvent(new Event("openCart"));
          return text(`Added ${quantity} × ${productName(p)} (${colour?.name || "default"}, ${size}) to the cart.`);
        },
      },
      {
        name: "view_cart",
        description: "List the items currently in the shopper's cart with the subtotal in PKR.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        async execute() {
          const items = cartRef.current.cart.map((i) => ({
            productId: i.id,
            name: i.title,
            color: i.color,
            size: i.size,
            quantity: i.quantity,
            pricePKR: Number(i.price),
          }));
          const subtotal = items.reduce((s, i) => s + i.pricePKR * (i.quantity || 1), 0);
          return text({ items, subtotalPKR: subtotal, shippingPKR: 0 });
        },
      },
      {
        name: "go_to_checkout",
        description:
          "Open the checkout page so the shopper can enter delivery details and pay by EasyPaisa/JazzCash. The shopper must confirm and place the order themselves.",
        inputSchema: { type: "object", properties: {} },
        async execute() {
          if (!cartRef.current.cart.length) return text("The cart is empty. Add a product first.");
          navRef.current("/checkout");
          return text("Opened the checkout page. Ask the shopper to fill in name, phone, city, province and address.");
        },
      },
      {
        name: "get_store_info",
        description:
          "Get store policies and contact details: delivery, payment, returns, WhatsApp/phone, email, and frequently asked questions about Charsadda chappals.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        async execute() {
          return text({
            store: BUSINESS.name,
            location: `${BUSINESS.locality}, ${BUSINESS.region}, Pakistan`,
            phone: BUSINESS.phones,
            whatsapp: `https://wa.me/${BUSINESS.whatsapp}`,
            email: BUSINESS.email,
            delivery: "Free delivery to all cities in Pakistan",
            payment: "Advance payment via EasyPaisa or JazzCash",
            returns: `${BUSINESS.returnDays}-day returns/exchanges on unused items in original packaging`,
            faqs: FAQS,
            catalogueSize: getProductsSync().length,
          });
        },
      },
    ];

    const controller = new AbortController();
    const registrations = [];
    for (const tool of tools) {
      try {
        registrations.push(mc.registerTool(tool, { signal: controller.signal }));
      } catch (err) {
        console.warn("[webmcp] could not register", tool.name, err);
      }
    }

    return () => {
      controller.abort();
      for (const reg of registrations) reg?.unregister?.();
      if (typeof mc.unregisterTool === "function") {
        for (const tool of tools) {
          try {
            mc.unregisterTool(tool.name);
          } catch {
            /* already removed */
          }
        }
      }
    };
  }, []);

  return null;
}
