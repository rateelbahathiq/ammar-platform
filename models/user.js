const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  role: DataTypes.ENUM("client", "company")
});

module.exports = User;