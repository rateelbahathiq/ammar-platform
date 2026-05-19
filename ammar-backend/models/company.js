const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Company = sequelize.define("Company", {

  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  companyCategory: {
    type: DataTypes.ENUM(
      "engineering",
      "contracting",
      "materials_store"
    ),
    allowNull: false
  },

  constructionType: {
    type: DataTypes.ENUM(
      "full_construction",
      "partial_construction"
    ),
    allowNull: true
  },

  commercialRegistrationNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },

  vatNumber: {
    type: DataTypes.BIGINT,
    allowNull: true,
    validate: {
      isNumeric: true
    }
  },

  commercialRegistrationFile: {
    type: DataTypes.STRING,
    allowNull: false
  },

  taxCertificateFile: {
    type: DataTypes.STRING,
    allowNull: true
  },

  engineeringLicenseFile: {
    type: DataTypes.STRING,
    allowNull: true
  },

  activityLicenseFile: {
    type: DataTypes.STRING,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM(
      "pending",
      "approved",
      "rejected"
    ),
    defaultValue: "pending"
  }

}, {
  timestamps: true
});

User.hasOne(Company, { foreignKey: "user_id" });
Company.belongsTo(User, { foreignKey: "user_id" });

module.exports = Company;