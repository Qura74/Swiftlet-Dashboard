import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ✅ Connection verification
(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL Database at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  }
})();
