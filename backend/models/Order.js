import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= CUSTOMER INFO =================
    customerName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // ================= PAYMENT =================
    paymentMethod: {
      type: String,
      default: "Cash On Delivery",
    },

    // ================= ORDER ITEMS =================
    items: [
      {
        // ⭐ IMPORTANT FOR REVIEWS
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        title: String,

        price: Number,

        quantity: Number,

        size: String,

        color: String,

        image: String,
      },
    ],

    // ================= TOTAL =================
    totalAmount: {
      type: Number,
      required: true,
    },

    // ================= STATUS =================
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
