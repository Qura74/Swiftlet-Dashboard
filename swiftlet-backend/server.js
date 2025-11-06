import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mqtt from "mqtt";
import { pool } from "./db/index.js"; // PostgreSQL connection
import { verifyToken } from "./middleware/authMiddleware.js"; // ✅ JWT middleware

// 🧩 Load environment variables first
dotenv.config();

// 🖥️ Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// 🛠️ Import Routes
import envRoutes from "./routes/env.js";
import birdRoutes from "./routes/bird_routes.js";
import relayRoutes from "./routes/relay.js";
import authRoutes from "./routes/auth.js";

// ✅ Register REST API routes
app.use("/api/auth", authRoutes);
app.use("/api/env", envRoutes);
app.use("/api/birds", birdRoutes);

// ✅ Protect relay routes (only logged-in users can access)
app.use("/api/relay", verifyToken, relayRoutes);

// 🌐 MQTT Integration
const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
  client.subscribe("swiftlet/env");
  client.subscribe("swiftlet/q"); // optional: bird topic
});

client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    if (topic === "swiftlet/env") {
      // 🌡️ Environment data
      const { site, temperature, humidity, lux } = payload;
      await pool.query(
        "INSERT INTO environment_data (site, temperature, humidity, lux) VALUES ($1, $2, $3, $4)",
        [site || "Unknown Site", temperature, humidity, lux]
      );
      console.log("💾 Saved ENV data:", payload);
    }

    if (topic === "swiftlet/q") {
      // 🐦 Bird count data
      const { site, birds_in, birds_out, total } = payload;
      await pool.query(
        "INSERT INTO bird_counts (site, birds_in, birds_out, total) VALUES ($1, $2, $3, $4)",
        [site || "Unknown Site", birds_in, birds_out, total]
      );
      console.log("💾 Saved BIRD data:", payload);
    }
  } catch (err) {
    console.error("❌ Error handling MQTT message:", err);
  }
});

// 🛡️ Protected test route (to verify JWT)
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, your role is ${req.user.role}`,
  });
});

// 🧭 Default route
app.get("/", (req, res) => {
  res.send("🐦 Swiftlet Monitoring Backend is running");
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
