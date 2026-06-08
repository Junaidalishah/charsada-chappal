import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);

router.put("/:id/read", protect, admin, markAsRead);

export default router;
