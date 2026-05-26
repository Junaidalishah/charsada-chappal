import express from "express";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  canReviewProduct,
  deleteReview,
} from "../controllers/productController.js";

const router = express.Router();

// ================= PRODUCTS =================
router.route("/").get(getProducts).post(protect, admin, createProduct);

// ================= REVIEWS =================
router.post("/:id/reviews", protect, addReview);
router.get("/:id/can-review", protect, canReviewProduct);
router.delete("/:productId/reviews/:reviewId", protect, admin, deleteReview);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
