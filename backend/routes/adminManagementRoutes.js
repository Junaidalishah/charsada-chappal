import express from "express";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";
import superAdmin from "../middleware/superAdmin.js";

import {
  getAdmins,
  createAdmin,
  deleteAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/admins", protect, admin, superAdmin, getAdmins);

router.post("/admins", protect, admin, superAdmin, createAdmin);

router.delete("/admins/:id", protect, admin, superAdmin, deleteAdmin);

export default router;
