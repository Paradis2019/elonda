const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signToken } = require("../utils/token");

// Demo-only in-memory users store (swap with DB later)
const users = new Map(); // email -> { id, email, passwordHash }

function register(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (users.has(email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const id = crypto.randomBytes(16).toString("hex");
  const passwordHash = bcrypt.hashSync(password, 10);

  users.set(email, { id, email, passwordHash });
  return res.status(201).json({ message: "Registered" });
}

function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = users.get(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ sub: user.id, email: user.email });
  return res.json({ token });
}

function me(req, res) {
  return res.json({ user: req.user });
}

module.exports = { register, login, me };
