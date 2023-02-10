const mongoose = require("mongoose");
const uuid = require("uuid");
const cryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
    {
        username:String,
        name:String,
        ency_password:String,
        salt:String, //security or unique key used for encryption
        email:String,
    },
    {timestamps:true}
);

//virtuals --> practically jo b mai exist na kare but virtua;ly mtlb user ko lage ki hai
userSchema.virtual("password").set(function (planPassword) {
    //to use "this" use regular function not arrow function
    this.salt=uuid.v4();
    this.ency_password=this.securePassword(planPassword);
})

userSchema.methods = {
    securePassword : function (planPassword) { //automatically go up by hoisting
        return cryptoJS.SHA256(planPassword,this.salt).toString();
    }
}

const User = mongoose.model("User",userSchema);
module.exports = {User};