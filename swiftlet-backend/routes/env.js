import express from "express";
import { pool } from "../db/index.js";
const router = express.Router();

// ✅ Fetch latest environment data
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM environment_data ORDER BY timestamp DESC LIMIT 20"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching environment data:", err);
    res.status(500).json({ error: "Failed to retrieve environment data" });
  }
});

// ✅ Insert new environment data
router.post("/", async (req, res) => {
  try {
    const { site, temperature, humidity, lux } = req.body;
    if (!site) return res.status(400).json({ error: "Missing site name" });

    await pool.query(
      "INSERT INTO environment_data (site, temperature, humidity, lux) VALUES ($1, $2, $3, $4)",
      [site, temperature, humidity, lux]
    );

    res.json({ message: "Environment data saved successfully" });
  } catch (err) {
    console.error("Error inserting environment data:", err);
    res.status(500).json({ error: "Failed to insert environment data" });
  }
});

export default router;
