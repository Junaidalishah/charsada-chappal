import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: String,
  images: [String],
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: String,

    description: String,

    details: [String],

    sizes: [String],

    disabledSizes: [String],

    colors: [colorSchema],

    image: String,

    featured: {
      type: Boolean,
      default: false,
    },

    // ⭐ REVIEWS
    reviews: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },

        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        name: String,

        rating: {
          type: Number,
          min: 1,
          max: 5,
        },

        comment: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
