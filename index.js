const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const parser = require("body-parser");
const {authRouter} = require("./src/auth/router");
const { blogRouter } = require("./src/blog/router");
const {commentRouter} = require("./src/comment/router");


const app = express();

app.use(cors());
app.use(parser.json());

//DB connection
mongoose.connect("mongodb://localhost:27017/blogdb");
mongoose.connection.on("connected",()=>{
    console.log("db connected");
})


app.use("/auth",authRouter);
app.use("/blog",blogRouter);
app.use("/comment",commentRouter);


app.listen(4000, () => {
    //callback function
    console.log("Server started on port 4000");
})