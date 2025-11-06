import bcrypt from "bcryptjs";
import { pool } from "../db/index.js";

const createUser = async () => {
  const username = "admin";     // 🧍 change if you want
  const plainPassword = "admin123"; // 🔑 change this too
  const role = "ADMIN";

  try {
    const hashed = await bcrypt.hash(plainPassword, 10);

    await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
      [username, hashed, role]
    );

    console.log(`✅ User created successfully!
    Username: ${username}
    Password: ${plainPassword}
    Role: ${role}`);
  } catch (err) {
    console.error("❌ Error creating user:", err);
  } finally {
    process.exit();
  }
};

createUser();
