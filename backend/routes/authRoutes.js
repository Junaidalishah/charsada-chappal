import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  forgotPassword,
  resetPasswordToken,
} from "../controllers/authController.js";

import {
  registerUser,
  loginUser,
  googleAuth,
  getUserProfile,
  updateUserProfile,
  changePassword,
  resetPassword,
  createAdmin,
  getAdmins,
  deleteAdmin,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/google", googleAuth);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);
router.put("/reset-password", protect, resetPassword);
router.post("/create-admin", protect, createAdmin);
router.get("/admins", protect, getAdmins);
router.delete("/admins/:id", protect, deleteAdmin);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPasswordToken);

export default router;
