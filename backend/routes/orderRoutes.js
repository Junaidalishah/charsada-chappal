import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
const router = express.Router();

// GET ALL ORDERS
router.get("/", protect, admin, getOrders);

// CREATE ORDER
router.post("/", protect, createOrder);

// MY ORDERS
router.get("/myorders", protect, getMyOrders);

// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);

// UPDATE ORDER STATUS
router.put("/:id", protect, admin, updateOrderStatus);

export default router;
