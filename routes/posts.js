var express  = require("express");
var Post = require("../models/post");
var middleware = require("../middleware");

var router  = express.Router();
router.get("/",function(req,res)
{
 res.render("landing");
});
router.get("/posts",function(req,res)
{
     
    Post.find({},function(err,allPosts)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("successful");
             res.render("index",{
        posts:allPosts,currentUser:req.user
    });
        }
    });
   
});

router.post("/posts",middleware.isLoggedIn,function(req,res)
{
  var name = req.body.Name;
  var image =  req.body.image;
  var description=req.body.description;
 var author={
     id: req.user._id,
     username:req.user.username
 };
 var newPost={
     name:name,
     image:image,
     description:description,
     author:author
 };
  Post.create(newPost,function(err,post)
  {
      if(err)
      {
          console.log("Error");
      }
      else{
        res.redirect("/posts");
      }
  });
  
  
});
router.get("/posts/new",middleware.isLoggedIn,function(req,res)
{
    res.render("new.ejs");
}); 

router.get("/posts/:id",function(req,res)
{  Post.findById(req.params.id).populate("comments").exec(function(err,foundPost)
    {  
             if(err)
             {
             console.log(err);
             }
             else{
                
                 res.render("show",{post:foundPost});
             }
               
    });
    
  
});
//Edit campground
router.get("/posts/:id/edit",middleware.checkUser,function(req,res)
{
   Post.findById(req.params.id,function(err,foundPost)
   {  
       res.render("edit",{post:foundPost});
   });
      
});

//update route

router.put("/posts/:id",middleware.checkUser,function(req,res)
{ 
    Post.findByIdAndUpdate(req.params.id,req.body.post,function(err,updatedPost)
    {
        if(err)
        {
            res.redirect("/posts");
        }
        else{
            res.redirect("/posts/"+ req.params.id);
        }
    });
});
//delete route
router.delete("/posts/:id",middleware.checkUser,function(req,res)
{
   Post.findByIdAndRemove(req.params.id,function(err)
   {
       if(err)
       {
           res.redirect("/posts");
       }
       res.redirect("/posts");
   })
    
});



module.exports=router;