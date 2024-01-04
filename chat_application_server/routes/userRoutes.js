const express = require('express');
const { loginController, signupController, fetchAllUsers } = require('../controller/userController');
const { protect } = require('../middlewares/auth');


const Router = express.Router(); 



Router.post("/login",loginController);
Router.post("/signup",signupController);
Router.get("/fetchAllUsers",protect,fetchAllUsers)

module.exports = Router;