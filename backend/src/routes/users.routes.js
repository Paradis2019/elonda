const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

/**
 * POST /api/users
 * Admin only
 * Body: { full_name, email, password, role }
 */
router.post("/", auth, requireAdmin, async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body || {};
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "full_name, email, password, role are required" });
    }
    if (!["ADMIN", "USER"].includes(role)) {
      return res.status(400).json({ message: "role must be ADMIN or USER" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const created = await db.query(
      `insert into users (full_name, email, password_hash, role)
       values ($1, $2, $3, $4)
       returning id, full_name, email, role, created_at`,
      [full_name, email.toLowerCase(), password_hash, role]
    );

    return res.status(201).json({ user: created.rows[0] });
  } catch (e) {
    // duplicate email
    if (String(e.message).toLowerCase().includes("duplicate key")) {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/users
 * Admin only
 */
router.get("/", auth, requireAdmin, async (req, res) => {
  try {
    const r = await db.query(
      "select id, full_name, email, role, is_active, created_at from users order by created_at desc"
    );
    res.json({ users: r.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
