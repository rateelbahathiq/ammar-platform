const Company = require("../models/company");

exports.getContractingCompanies = async (req, res) => {
  try {

    const { serviceType } = req.query;

    let filter = {
      companyCategory: "contracting"
    };

    if (serviceType) {
      filter.serviceType = serviceType;
    }

    const companies = await Company.findAll({
      where: filter
    });

    res.status(200).json({
      status: "success",
      results: companies.length,
      data: companies
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};