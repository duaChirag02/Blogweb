const {User} = require("./model");
const jwt = require("jsonwebtoken");

const register = async (request,response) =>{

    if(request.body.username.length==0 || request.body.name.length==0){
        return response.json({status:"error",msg:"Please enter both name and username!"});

    }

    if(request.body.password.length<6){
        return response.json({status:"error",msg:"Password length must be at least 6!"});
    }
    if(!request.body.email.includes("@") || !request.body.email.includes(".")){
        return response.json({status:"error",msg:"Email is incorrect!"})
    }
    const data = await User.find({$or : [{username:request.body.username},{email:request.body.email}]});
    if(data.length>0){
        return response.json({status:"error",msg:"Username or Email already exists!"});
    }

    const res = await User.create(request.body);

    // res.ency_password=undefined;
    // res.salt=undefined;

    return response.json({status:"Registered Successfully!",res});

    // return response.status(200).json({msg:"Done"});
}

const login = async (request,response) =>{
    
    
    return response.json({status:"Logged In Successfully!",data:request.body});
}

const reset = async (request,response) =>{
    //reset password

    //NOW WHOLE THIS WORK IS DONE BY COMMON "commonlogin" MIDLEWARE!!
    // if(request.body.username.length==0 || request.body.password.length==0 ||  request.body.newPassword.length==0){
    //     return response.json({status:"error",msg:"Please fill all the fields!"});
    // }
    // var res = await User.findOne({username:request.body.username});
    // if(!res){
    //     return response.json({status:"error",msg:"Cannot find user!"});
    // }
    // else{
    //    console.log(res.ency_password);
    //     if(res.ency_password!=res.securePassword(request.body.password)){
    //         return response.json({status:"error",msg:"Password does not match!"});
    //     }
    // }


    res=await User.findOne({username:request.body.username});
    res.password=request.body.newPassword;
    res.save();

    return response.json({status:"Password changed successfully!",data:response.body});
}


const commonlogin = async (request,response,next) =>{
    const res = await User.findOne({username:request.body.username});

    if(!res){
        return response.json({status:"error",msg:"Cannot find user!"});
    }
    // console.log((res[0].securePassword(request.body.password)).toString());
    // console.log(res[0].ency_password);
    if(res.securePassword(request.body.password)!=res.ency_password){
        return response.json({status:"error",msg:"Password does not match!"});
    }


   
    // console.log(res);

    //when user logged in then iss user ke corresponding JWT token han local storage mai store kar lenge
    //taaki ham kuch bhi kare toh check kar paye ki konse user logged in hai!
    //token based on user_id and end with "Zu_6k"
    //can't use only user_id to store in session storage as if mere id 2 then
    // kisi ki id toh 3 hogi therefore ham sessio storage mai jakar 3 likh denge 
    //and dusare user se login ho jaenge, so use jwt as jwt ko dekh kar userid
    // vagara kuch nagi bata sakte , therefore encrytion type!

    //npm i jsonwebtoken

    // var token  = jwt.sign({_id:res._id},res.salt);//first argument must be object!

    var token  = jwt.sign({_id:res._id},key);

    //to show on frontend
    request.body.token=token;

    res.ency_password=undefined;
    res.salt=undefined;
    request.body.res=res;
    
    next();
   
}

const key = "iedbvuhecyebcjiencjekdjckemcl";//random key

module.exports={register,login,reset,commonlogin,key};