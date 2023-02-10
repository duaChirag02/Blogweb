const express = require("express");
const {register,login,reset,commonlogin} = require("./controller");


const authRouter = express.Router();
authRouter.post("/register",register);
authRouter.post("/login",commonlogin,login);//commonlogin is our defined middleware, it error in this then return from there only but if commonlogin mai next() call ho gaya toh login() par janege!!
authRouter.post("/reset",commonlogin,reset);

module.exports={authRouter};