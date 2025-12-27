const app = require("./app");
const { PORT, JWT_SECRET } = require("./config/env");

if (!JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in .env");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
