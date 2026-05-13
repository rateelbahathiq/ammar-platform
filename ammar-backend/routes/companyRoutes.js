const express = require("express");
const router = express.Router();

const {
  getContractingCompanies
} = require("../controllers/companyController");

router.get(
  "/contracting",
  getContractingCompanies
);

module.exports = router;