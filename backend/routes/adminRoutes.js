import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

// ================= ADMIN DASHBOARD =================
router.get("/dashboard", protect, admin, getDashboardStats);

export default router;
