import express from "express";

import {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from "../controllers/contactController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createMessage);

router.get("/", protect, admin, getMessages);

router.put("/:id/read", protect, admin, markAsRead);

router.delete("/:id", protect, admin, deleteMessage);

export default router;
