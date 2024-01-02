const express = require("express");
const User = require("../models/user");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");


exports.loginController = expressAsyncHandler(async (req, res) => {
    const {name , password } = req.body;

    if(!name || !password ){
        return res.status(403).send({
            success:false,
            message:"All fields are required",
        })
    }

    const user = await User.findOne({name});
    if(user && (await user.matchPassword(password))){
        const response = {
            _id:user._id,
            name : user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        };
        console.log(response);
        res.status(200).json(response);
    }
    else{
      res.status(403).send({
        success:false,
        message:"User not found"
      })
    }

});
exports.signupController = expressAsyncHandler(async (req, res) => {
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

  const user = await User.create({ 
        name, 
        email, 
        password,
    });

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        })
    }
});
