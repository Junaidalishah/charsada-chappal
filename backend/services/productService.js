import Product from "../models/Product.js";

export const searchProducts = async (message) => {
  const lower = message.toLowerCase().trim();

  // Load all products
  const products = await Product.find();

  const filtered = products.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";

    // Match product name
    if (name.includes(lower) || lower.includes(name)) {
      return true;
    }

    // Match category
    if (category.includes(lower) || lower.includes(category)) {
      return true;
    }

    // Match description
    if (description.includes(lower)) {
      return true;
    }

    // Match colors
    if (
      product.colors?.some((color) => lower.includes(color.name.toLowerCase()))
    ) {
      return true;
    }

    return false;
  });

  return filtered.slice(0, 5);
};
