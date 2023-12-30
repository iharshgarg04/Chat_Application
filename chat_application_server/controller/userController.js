const express = require("express");
const User = require("../models/user");

exports.loginController = async (req, res) => {};
exports.signupController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(403).send({
      success: false,
      message: "All fields are required",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send({
      success: false,
      message: "User already Exist",
    });
  }

  const userNameExist = await User.findOne({ name });
  if (userNameExist) {
    return res.status(400).send({
      success: false,
      message: "User with this Username already Exists",
    });
  }

  const user = User.create({ name, email, password });

  return res.status(200).json({
    success: true,
    user,
    message: "User is registered Successfully",
  });
};
