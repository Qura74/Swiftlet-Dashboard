import express from "express";
import { pool } from "../db/index.js";
const router = express.Router();

// ✅ Get latest relay status
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM relay_status ORDER BY timestamp DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching relay status:", err);
    res.status(500).json({ error: "Failed to fetch relay status" });
  }
});

// ✅ Insert relay status update
router.post("/", async (req, res) => {
  try {
    const { site, relay_state } = req.body;
    if (!site) return res.status(400).json({ error: "Missing site name" });

    await pool.query(
      "INSERT INTO relay_status (site, relay_state) VALUES ($1, $2)",
      [site, relay_state]
    );

    res.json({ message: "Relay status updated" });
  } catch (err) {
    console.error("Error inserting relay status:", err);
    res.status(500).json({ error: "Failed to update relay status" });
  }
});

export default router;
