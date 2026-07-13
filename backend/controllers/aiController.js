import { askGroq } from "../services/groqService.js";
import { searchProducts } from "../services/productService.js";
import { findOrdersByPhone } from "../services/orderService.js";
import Product from "../models/Product.js";

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({
        reply: "No messages provided.",
      });
    }

    const latestMessage = messages[messages.length - 1].content;
    const lower = latestMessage.toLowerCase();

    // ==================== SPECIAL RULES ====================

    // Payment Rule
    if (
      lower.includes("payment") ||
      lower.includes("pay") ||
      lower.includes("jazzcash") ||
      lower.includes("jazz cash") ||
      lower.includes("easypaisa") ||
      lower.includes("cash on delivery") ||
      lower.includes("cod")
    ) {
      return res.json({
        reply: `💳 Payment Information

❌ Cash on Delivery is NOT available.

✅ Advance payment is required.

You can pay using:

• Easypaisa
• JazzCash

📱 Payment Number:
0310-2991736

After making the payment, please send the payment screenshot. We will verify it and process your order immediately.`,
      });
    }

    // Returns & Refunds Rule
    if (
      lower.includes("return") ||
      lower.includes("refund") ||
      lower.includes("returns") ||
      lower.includes("exchange") ||
      lower.includes("policy")
    ) {
      return res.json({
        reply: `🔄 Here's our Returns & Refund Policy.`,
        action: {
          type: "link",
          title: "View Full Return Policy",
          url: "/returns-refunds",
        },
      });
    }

    // Delivery Information Rule
    if (
      lower.includes("delivery") ||
      lower.includes("shipping") ||
      lower.includes("ship") ||
      lower.includes("dispatch") ||
      lower.includes("how long") ||
      lower.includes("delivery time") ||
      lower.includes("shipping charges")
    ) {
      return res.json({
        reply: `🚚 Delivery Information

📦 We deliver all over Pakistan.

⏱ Delivery Time:
2–5 working days.

💸 Shipping Charges:
FREE Delivery on all orders.

📍 Orders are dispatched within 24 hours after payment verification.

📱 For delivery updates, contact us on WhatsApp:
0310-2991736`,
      });
    }

    // Track Order Rule
    const phoneMatch = latestMessage.match(/03\d{9}/);
    if (
      lower.includes("track") ||
      lower.includes("order status") ||
      lower.includes("where is my order") ||
      lower.includes("check order") ||
      lower.includes("order") ||
      lower.includes("status") ||
      phoneMatch
    ) {
      if (!phoneMatch) {
        return res.json({
          reply:
            "📦 Please send the phone number used when placing your order.\n\nExample:\n03102991736",
        });
      }

      const orders = await findOrdersByPhone(phoneMatch[0]);

      if (orders.length === 0) {
        return res.json({
          reply: "❌ I couldn't find any order with that phone number.",
        });
      }

      const orderList = orders
        .map(
          (order) => `
📦 Order #${order._id.toString().slice(-6)}

Status: ${order.status}

Amount: PKR ${order.totalAmount}

Payment: ${order.paymentMethod || "N/A"}
`,
        )
        .join("\n-----------------\n");

      return res.json({
        reply: `📦 I found ${orders.length} recent order(s) for this number.

${orderList}

Need details about a specific order? Just tell me the Order ID.`,
      });
    }

    // ==================== RECOMMENDATION INTENT ====================
    const recommendationIntent =
      lower.includes("recommend") ||
      lower.includes("suggest") ||
      lower.includes("best chappal") ||
      lower.includes("which chappal") ||
      lower.includes("what should i buy") ||
      lower.includes("help me choose") ||
      lower.includes("good for daily") ||
      lower.includes("formal chappal") ||
      lower.includes("premium leather");

    if (recommendationIntent) {
      const recommended = await Product.find({
        featured: true,
      }).limit(4); // Increased to 4 for better recommendations

      if (recommended.length > 0) {
        const prompt = `
You are a helpful and friendly shopping assistant for Charsadda Chappal.

Recommend products ONLY from the list below.
Be enthusiastic and explain briefly why each product is a good choice based on the customer's request.

${recommended
  .map(
    (p) => `
Name: ${p.name}
Price: PKR ${p.price}
Category: ${p.category || "N/A"}
Description: ${p.description || "N/A"}
`,
  )
  .join("\n---\n")}

Customer Request: ${latestMessage}
`;

        const reply = await askGroq([
          {
            role: "system",
            content: "You are a friendly and helpful shopping assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ]);

        return res.json({
          reply,
          products: recommended,
        });
      }
    }

    // ==================== NORMAL PRODUCT SEARCH ====================
    let products = await searchProducts(latestMessage);

    // If nothing found, search using whole conversation
    if (products.length === 0) {
      const fullConversation = messages.map((m) => m.content).join(" ");
      products = await searchProducts(fullConversation);
    }

    if (products.length > 0) {
      const prompt = `
You are the official AI Shopping Assistant of Charsadda Chappal.

IMPORTANT RULES

- You MUST answer ONLY using the products below.
- Never invent products.
- Never invent prices.
- Never invent colors.
- Never invent sizes.
- Never invent stock.
- Never guess.
- If the answer is not in the product data, say:
  "Sorry, I don't have that information."
- Keep answers short and professional.

AVAILABLE PRODUCTS

${products
  .map(
    (p) => `
Name: ${p.name}
Price: PKR ${p.price}
Category: ${p.category || "N/A"}
Available Sizes: ${p.sizes?.join(", ") || "N/A"}
Available Colors: ${p.colors?.map((c) => c.name).join(", ") || "N/A"}
Description: ${p.description || "N/A"}
`,
  )
  .join("\n----------------------------\n")}

Customer Question:
${latestMessage}
`;

      const reply = await askGroq([
        {
          role: "system",
          content: `
You are the official AI Shopping Assistant of Charsadda Chappal.
Only answer using the provided product information.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ]);

      return res.json({
        reply,
        products,
      });
    }

    // ==================== GENERAL CONVERSATION ====================
    const groqMessages = [
      {
        role: "system",
        content: `
You are the official AI Shopping Assistant of Charsadda Chappal.

Only answer questions about:
- Footwear
- Orders
- Delivery
- Returns
- Shopping

Be friendly and helpful.
`,
      },
      ...messages,
    ];

    const reply = await askGroq(groqMessages);

    return res.json({
      reply,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      reply: "AI Error",
    });
  }
};
