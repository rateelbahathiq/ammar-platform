const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("emaar_db", "postgres", "Rr2002rr", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;