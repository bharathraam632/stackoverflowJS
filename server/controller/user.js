const express = require("express");
const User = require("../models/users");
const { addUser } = require("../utils/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  validateLoginFields,
  sanitizeInputs,
  validateSignUpFields,
  validateUserName,
} = require("../utils/middleWares");

// Route to add a new user (sign-up)
const signUser = async (req, res) => {
  try {
    const {
      userName,
      userPassword,
      userFullName,
      userEmail,
      userProfilePicPath,
      userPhoneNumber,
      userSummary,
    } = req.body;
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const userObject = {
      userName,
      userPassword: hashedPassword,
      userFullName,
      userEmail,
      userProfilePicPath,
      userPhoneNumber,
      userSummary,
    };
    const user = await addUser({ userObject });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to authenticate user login
const loginUser = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const userProfile = async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

router.post("/signUser", validateSignUpFields, signUser);
router.post("/loginUser", sanitizeInputs, validateLoginFields, loginUser);
router.post("/getUserProfile", validateUserName, userProfile);

module.exports = router;
