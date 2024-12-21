const { DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
