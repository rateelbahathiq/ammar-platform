const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Company = sequelize.define("Company", {
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      "full_construction",
      "partial_construction",
      "materials_supplier"
    ),
    allowNull: false
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
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  establishmentNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
}, {
  timestamps: true
});

// Relationships
User.hasOne(Company, { foreignKey: "user_id" });
Company.belongsTo(User, { foreignKey: "user_id" });

module.exports = Company;