const express = require("express");
const { isAuthenticated } = require("../helper/utils");

const {createComment,readComment,updateComment,deleteComment} = require("./controller");


const commentRouter = express.Router();

commentRouter.post("/create",isAuthenticated,createComment);
commentRouter.get("/read",isAuthenticated,readComment);
commentRouter.put("/update",isAuthenticated,updateComment);
commentRouter.delete("/delete",isAuthenticated,deleteComment);

module.exports = {commentRouter};