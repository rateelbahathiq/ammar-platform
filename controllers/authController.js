const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Company = require("../models/company");

// SIGNUP / REGISTER
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

    if (!firstName || !lastName || !username || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: "All required fields are required"
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    if (role !== "client" && role !== "company") {
      return res.status(400).json({
        message: "Role must be either client or company"
      });
    }

    if (role === "company") {
      if (!ownerName || !type || !commercialRegistrationNumber || !vatNumber || !establishmentNumber) {
        return res.status(400).json({
          message: "All company fields are required"
        });
      }

      if (
        isNaN(commercialRegistrationNumber) ||
        isNaN(vatNumber) ||
        isNaN(establishmentNumber)
      ) {
        return res.status(400).json({
          message: "Commercial registration number, VAT number, and establishment number must be numbers"
        });
      }
    }

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const usernameExists = await User.findOne({ where: { username } });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists"
      });
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
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET || "secret_key",
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Logout successful. Please remove the token from frontend storage."
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};