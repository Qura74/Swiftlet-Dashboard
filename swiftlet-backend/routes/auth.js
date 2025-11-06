import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

const router = express.Router();

/**
 * 🔐 POST /api/auth/login
 * Body: { username, password, role }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Look up user in database
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2️⃣ Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Return success
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * 🧩 POST /api/auth/register
 * Optional: to manually add new users
 */
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashedPassword, role || "DVS"]
    );

    res.json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Failed to register user" });
  }
});

export default router;
