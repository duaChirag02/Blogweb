//middlewares!!


const jwt = require("jsonwebtoken");
const {key} = require("../auth/controller");
const { User } = require("../auth/model");

const isAuthenticated = async (request,response,next) =>{
    var token = request.headers.authorization;
    // console.log(token);
    if(!token){
        return response.json({status:"Error",msg:"Token required"});
    }

    //for avoid frontend errors always put in try-catch!! (good practice)!!

    try{
        var verify = jwt.verify(token,key);//decryption //here issue that we have to use salt in verify function, so we can't use salt according to user (uuid) we have to take a constant value of salt all over!
        //in verify variable we get the same object we pass before encryption
        if(verify && verify._id){
            var user = await User.findById(verify._id);
            if(!user){
                return response.json({status:"Error",msg:"Unauthorized user"});

            }
            //next() mtlb createNewBlog() mai mujhe user_id bhi chahiye, and here verify is nothing but the database stored data/object, so we can add user_id to request.body from verify object! 
            request.body.user_id=verify;
            next();
        }
        else{
            return response.json({status:"Error",msg:"Token required"});
        }
    }
    catch{
        return response.json({status:"Error",msg:"In-valid Token"});
    }   
   
}

module.exports={isAuthenticated};

/*
possibility of sending token from frontend to backend:-
headers, query, params, body

--> but ny body has limitation that body send only in case of post method!
--> request.headers get() ke sath bhi jaa sakta hai!

*/