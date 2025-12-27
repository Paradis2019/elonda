const path = require("path");

/**
 * Load environment variables from backend/.env
 * (bulletproof for Windows + OneDrive)
 */
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const express = require("express");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    port: process.env.PORT || null,
    envLoaded: !!process.env.DATABASE_URL,
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
