const bcrypt = require("bcrypt");
const User = require("../models/user");
const Company = require("../models/company");

exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      role,
      ownerName,
      type,
      commercialRegistrationNumber,
      vatNumber,
      establishmentNumber
    } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      phone,
      role
    });

    if (role === "company") {
      await Company.create({
        user_id: user.id,
        ownerName,
        type,
        commercialRegistrationNumber,
        vatNumber,
        establishmentNumber
      });
    }

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};