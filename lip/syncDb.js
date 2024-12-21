const sequelize = require("./sequelize");
const User = require("../models/User");

async function syncDatabase() {
  await sequelize.sync({ force: true });
  console.log("Database synced");
  process.exit();
}

syncDatabase().catch((err) => {
  console.error("Failed to sync database:", err);
});
