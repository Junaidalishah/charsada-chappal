import express from "express";
import Newsletter from "../models/newsletterModel.js";

const router = express.Router();

// SUBSCRIBE EMAIL
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // VALIDATION
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // CHECK EXISTING
    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already subscribed",
      });
    }

    // SAVE
    const subscriber = await Newsletter.create({
      email,
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
