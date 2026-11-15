import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import sitemapRoutes from "./routes/sitemapRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import metaRoutes from "./routes/metaRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
// Lightweight health check for uptime pings (no database query).
app.get("/api/health", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: Math.round(process.uptime()),
  });
});

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/meta", metaRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/", sitemapRoutes);
// DATABASE CONNECTION
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// Listen once, immediately, so health checks answer even while MongoDB connects.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
