import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ================= USER =================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // ================= CUSTOMER INFO =================
    customerName: {
      type: String,
      required: true,
    },

    email: {
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

    province: {
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
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    courierCompany: {
      type: String,
      default: "",
    },

    trackingNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
