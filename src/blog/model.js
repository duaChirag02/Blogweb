const {Schema,model} = require("mongoose");

const blogSchema = new Schema(
{
    title:String,
    description:String,
    user_id:{type:Schema.Types.ObjectId, ref:"User"}, //here in ref use first argument of mogoose.model of User schema, no need to import mogoose automatically understand!
    
    //here "" iss mai User daal diya toh chal jaega as here all DBs in one 
    //collection here in "blogdb" written in index.js, but if DBs in different
    // collections then we have to import it nad then use without "", i.e.
    // const {User} = require("../auth/model); and use this User without "" now!
},
{
    timestamps:true,
}
);

const Blog = model("Blog",blogSchema);
module.exports={Blog};