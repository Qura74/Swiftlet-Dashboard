import express from "express";
import { pool } from "../db/index.js";
const router = express.Router();

// ✅ Get latest bird count data
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bird_counts ORDER BY timestamp DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bird data:", err);
    res.status(500).json({ error: "Failed to retrieve bird data" });
  }
});

// ✅ Insert bird count record
router.post("/", async (req, res) => {
  try {
    const { site, birds_in, birds_out, total } = req.body;
    if (!site) return res.status(400).json({ error: "Missing site" });

    await pool.query(
      "INSERT INTO bird_counts (site, birds_in, birds_out, total) VALUES ($1, $2, $3, $4)",
      [site, birds_in, birds_out, total]
    );

    res.json({ message: "Bird data saved successfully" });
  } catch (err) {
    console.error("Error inserting bird data:", err);
    res.status(500).json({ error: "Failed to insert bird data" });
  }
});

export default router;