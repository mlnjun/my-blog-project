const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("my_next_app", "nextjs_user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
