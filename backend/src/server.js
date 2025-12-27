const path = require("path");

// Load environment variables from backend/.env
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    port: process.env.PORT || null,
    envLoaded: !!process.env.DATABASE_URL,
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// DECLARE PORT ONLY ONCE (VERY IMPORTANT)
const PORT = Number(process.env.PORT) || 3001;

// Start server
app.listen(PORT, "127.0.0.1", () => {
  console.log(`✅ Backend running on http://127.0.0.1:${PORT}`);
});
