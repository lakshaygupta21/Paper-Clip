var Post = require("../models/post");
var Comment = require("../models/comment");


//all the middlewares goes here
var middleWareObject={};
middleWareObject.checkUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
       //does the user own the Post
       Post.findById(req.params.id,function(err,foundPost)
    {
        if(err)
        {
            req.flash("error","Posts not found!!");
            res.redirect("back");
        }
        else{
            if(foundPost.author.id.equals(req.user._id)){
            next();
                
        }  
            else{
                req.flash("error","You do not have permission to do that!");
                res.redirect("back");
            }
    
    }
    });
  

    }
    else{
        req.flash("error","You need to Logged in to that!");
        res.redirect("back");
    }
    
};
middleWareObject.checkCommentOwnership =function(req,res,next)
{
    if(req.isAuthenticated())
    {
       //does the user own the Post
       Comment.findById(req.params.comment_id,function(err,foundComment)
    {
        if(err)
        {   
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
            next();
                
        }  
            else{
                req.flash("error","You do not have permission to do that!");
                res.redirect("back");
            }
    
    }
    });
  

    }
    else{
        req.flash("error","You need to be Logged in to do that!");
        res.redirect("back");
    }
    
};
middleWareObject.isLoggedIn = function(req,res,next)
{
   
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error","You need to be Logged in to do that!");
        res.redirect("/login");
    
};




module.exports = middleWareObject;