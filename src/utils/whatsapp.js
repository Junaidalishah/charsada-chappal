export const createWhatsAppProductMessage = (product) => {
  return `
🛍️ *New Product Inquiry*

👞 Product: ${product.name}
💰 Price: Rs ${product.price}

🔗 View Product: ${window.location.origin}/product/${product._id}

I want to buy this product. Please guide me.
  `;
};
