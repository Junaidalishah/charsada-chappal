---
name: shop-charsadda-chappal
description: Browse, compare and buy handmade Charsadda / Peshawari leather chappals from charsaddachappal.store on behalf of a shopper in Pakistan.
---

# Shop Charsadda Chappal

Charsadda Chappal (https://www.charsaddachappal.store) sells genuine-leather chappals handmade in Charsadda, Khyber Pakhtunkhwa, Pakistan. Styles: Kaptaan, Zardari and Gol T. Prices are in PKR (about 4,000–5,000), delivery is free across Pakistan, payment is in advance via EasyPaisa or JazzCash, and unused items can be returned or exchanged within 30 days.

## Preferred: WebMCP tools

When the page exposes `navigator.modelContext`, use these tools instead of clicking through the UI:

1. `search_products` `{ query?, category?, maxPricePKR? }` — find products; returns `productId`, price, colours and available sizes.
2. `get_product_details` `{ productId }` — description, stock and images.
3. `add_to_cart` `{ productId, size, color?, quantity? }` — `size` must exactly match one of the listed sizes, e.g. `PAK 9 / EU 42`.
4. `view_cart` — items and subtotal.
5. `go_to_checkout` — opens checkout. The shopper enters name, phone (03XXXXXXXXX), city, province, address and email, pays via EasyPaisa/JazzCash, and places the order themselves.
6. `get_store_info` — contact details, policies and FAQs.

## Without WebMCP

- Catalogue: https://www.charsaddachappal.store/shop (each card links to `/product/<id>`).
- Product page: choose colour, size and quantity, then **Add To Cart** or **Buy Now**.
- Machine-readable summary: https://www.charsaddachappal.store/llms.txt and https://www.charsaddachappal.store/llms-full.txt.
- Every product page includes schema.org `Product` JSON-LD with price, availability and sizes.

## Rules

- Never place an order or make a payment without the shopper's explicit confirmation.
- Quote prices in PKR exactly as returned; delivery is free.
- For sizing between two sizes, recommend the larger size or WhatsApp +92 310 2991736.
