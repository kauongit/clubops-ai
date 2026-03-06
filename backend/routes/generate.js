import express from "express";
import { generateAssets } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { eventName, clubName, eventDate, eventDescription } = req.body;

    if (!eventName || !clubName || !eventDate || !eventDescription) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const assets = await generateAssets({
      eventName,
      clubName,
      eventDate,
      eventDescription,
    });

    res.json(assets);
  } catch (error) {
    console.error("Generate error:", error);
    res.status(500).json({ error: "Failed to generate assets" });
  }
});

export default router;