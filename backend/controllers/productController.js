import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ================= GET FILTERED PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const category = req.query.category || "";
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || 100000;
    const featured = req.query.featured;

    let query = {
      price: {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      },
    };

    // CATEGORY FILTER
    if (category) {
      query.category = category;
    }

    // FEATURED FILTER
    if (featured) {
      query.featured = featured === "true";
    }

    const products = await Product.find(query).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE PRODUCT =================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      image,

      // NEW FIELDS
      details,
      sizes,
      disabledSizes,
      colors,
      featured,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,

      // SAVE NEW FIELDS
      details,
      sizes,
      disabledSizes,
      colors,
      featured,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // BASIC FIELDS
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;
    product.image = req.body.image || product.image;

    // NEW ECOMMERCE FIELDS
    product.details = req.body.details || product.details;
    product.sizes = req.body.sizes || product.sizes;
    product.disabledSizes = req.body.disabledSizes || product.disabledSizes;
    product.colors = req.body.colors || product.colors;

    // FEATURED FIELD
    product.featured =
      req.body.featured !== undefined ? req.body.featured : product.featured;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= ADD REVIEW =================
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const productId = req.params.id;

    // ================= FIND PRODUCT =================
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ================= CHECK PURCHASE =================
    const purchased = await Order.findOne({
      user: req.user._id,
      status: "Delivered",
      "items.product": productId,
    });

    if (!purchased) {
      return res.status(400).json({
        message: "You must purchase this product first",
      });
    }

    // ================= CHECK EXISTING REVIEW =================
    const alreadyReviewed = product.reviews.find(
      (review) => review.user?.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    // ================= CREATE REVIEW =================
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    // OPTIONAL: UPDATE RATING
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= CAN REVIEW PRODUCT =================
export const canReviewProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // ================= CHECK PURCHASE =================
    const purchased = await Order.findOne({
      user: req.user._id,
      status: "Delivered",
      "items.product": productId,
    });

    // ================= FIND PRODUCT =================
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // ================= CHECK ALREADY REVIEWED =================
    const alreadyReviewed = product.reviews.find(
      (review) => review.user?.toString() === req.user._id.toString(),
    );

    if (purchased && !alreadyReviewed) {
      return res.json({
        canReview: true,
      });
    }

    res.json({
      canReview: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE REVIEW =================
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // FIND REVIEW
    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // REMOVE REVIEW
    product.reviews.pull(reviewId);

    // SAVE PRODUCT
    await product.save();

    res.json({
      message: "Review deleted permanently",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
