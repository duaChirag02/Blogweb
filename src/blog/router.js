const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const {createNewBlog,readBlog,updateBlog,deleteBlog} = require("./controller");

const blogRouter = express.Router();

blogRouter.post("/create",isAuthenticated, createNewBlog);
blogRouter.get("/read",isAuthenticated,readBlog);
blogRouter.put("/update",isAuthenticated,updateBlog);
blogRouter.delete("/delete",isAuthenticated, deleteBlog);


//now we will learn ki ek hi url se post,put,delete sab kuch kaise kar sakte hai!

module.exports={blogRouter};