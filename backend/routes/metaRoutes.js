import express from "express";
import { relayMetaEvent } from "../controllers/metaController.js";

const router = express.Router();

router.post("/events", relayMetaEvent);

export default router;
