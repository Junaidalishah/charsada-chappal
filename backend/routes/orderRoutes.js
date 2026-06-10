import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
const router = express.Router();

// GET ALL ORDERS
router.get("/", protect, admin, getOrders);

// CREATE ORDER
router.post("/", createOrder);

// MY ORDERS
router.get("/myorders", protect, getMyOrders);

// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);

// UPDATE ORDER STATUS
router.put("/:id", protect, admin, updateOrderStatus);

// DELETE ORDER
router.delete("/:id", protect, admin, deleteOrder);

export default router;
