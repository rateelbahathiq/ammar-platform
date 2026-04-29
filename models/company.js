const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Company = sequelize.define("Company", {
  ownerName: DataTypes.STRING,
  type: DataTypes.ENUM("full_construction", "partial_construction", "materials_supplier"),
  commercialRegistrationNumber: DataTypes.STRING,
  vatNumber: DataTypes.STRING,
  establishmentNumber: DataTypes.STRING
});

User.hasOne(Company, { foreignKey: "user_id" });
Company.belongsTo(User, { foreignKey: "user_id" });

module.exports = Company;