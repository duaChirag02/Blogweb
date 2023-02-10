const {Blog}= require("./model");


const createNewBlog = async (request,response) =>{
    console.log(request.body);
    var newBlog = await (await Blog.create(request.body)).populate("user_id");
    //newBlog mai blog ka schema hai, uss mai sirf user_id hai but hame frontend par sirf user_id nahi user ki saare detals bh bhejne hai toh dubara database query karke isse hai ham populate() methode use kar sakte hai. popultae() always takes only object not string or something, and we get expandeed data!
    //now newBlog mai user_id bhi populate ho jaege!
    return response.json({status:"Blog created",newBlog});
}

const readBlog = async (request,response) =>{
    //if I get blog_id in query param the it will return this blog
    //else if I get user_id the I will return all blogs created by that user
    //else if query param is empty then I will return all blogs in feed

    if(request.query.blog_id){
        var blogs = await Blog.find({_id:request.query.blog_id});
    }
    else if(request.query.user_id){
        var blogs = await Blog.find({user_id:request.query.user_id});
    }
    else{
        var blogs = await Blog.find();
    }
    
    if(blogs.length==0){
        return response.json({"status":"Cannot find blogs!"});
    }
    //want to be sorted in desc order of created time
    blogs.reverse();

    return response.json({"status":"Success",blogs});

}

const updateBlog = async (request,response) =>{
    var blog = await Blog.findOne({_id:request.query.blog_id});
    if(!blog){
        return response.json({"status":"Cannot find this blog!"});
    }
    // console.log(blog.user_id);
    // console.log(request.body.user_id);
    if(blog.user_id!=request.body.user_id._id){
        return response.json({"status":"User not authorized to update this blog!"});
    }

    blog.title=request.body.title;
    blog.description=request.body.description;

    newBlog = await blog.save();
    
    return response.json({"status":"Blog Updated!",newBlog});
    
}

const deleteBlog = async (request,response) =>{
    var blog = await Blog.findOne({_id:request.query.blog_id});
    if(!blog){
        return response.json({"status":"Cannot find this blog!"});
    }
    // console.log(blog.user_id);
    // console.log(request.body.user_id);
    if(blog.user_id!=request.body.user_id._id){
        return response.json({"status":"User not authorized to delete this blog!"});
    }

    var deletedBlog = await Blog.findByIdAndDelete(blog._id);
    
    return response.json({"status":"Blog deleted!",deletedBlog});
    
}

module.exports={createNewBlog,readBlog,updateBlog,deleteBlog};