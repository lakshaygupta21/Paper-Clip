var express  = require("express");
var router  = express.Router({mergeParams:true});
var Post = require("../models/post");
var Comment=require("../models/comment");
var middleware = require("../middleware");
router.get("/posts/:id/comments/new", middleware.isLoggedIn ,function(req,res)
{

    Post.findById(req.params.id,function(err,post)
    {
         if(err)
         {
             console.log(err);
         }
         else {
             res.render("newComment",{post:post});
         }
    });

});
router.post("/posts/:id/comments", middleware.isLoggedIn ,function(req,res)
{
    Post.findById(req.params.id,function(err,foundPost)
    {
        if(err)
        {
            console.log("Error");
            res.redirect("/posts");
        }else{
      Comment.create(req.body.comments,function(err,comment)
      {
         if(err)
         {   req.flash("error","Somethig went wrong!");
             console.log(err);
         }
         else{
             comment.author.id=req.user._id;
             comment.author.username=req.user.username;
             comment.save();
            foundPost.comments.push(comment);
            foundPost.save();
            req.flash("success","Successfully added comment!");
            res.redirect("/posts/" +foundPost._id);
         }
      });
    }
    });
    
});
router.get("/posts/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res)
{
    Comment.findById(req.params.comment_id,function(err,foundComment)
    {
        if(err)
        {
            res.render("back");
        }
        else{
            res.render("editComment",{post_id:req.params.id,
            comment:foundComment
            });

        }
    });
   
});
router.put("/posts/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comments,function(err,editComment)
   {
       if(err)
       {
           res.redirect("back");
       }
       else{
           res.redirect("/posts/"+req.params.id);
       }
   });
});

router.delete("/posts/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res)
{
   Comment.findByIdAndRemove(req.params.comment_id,function(err)
   {
       if(err)
       {
           res.redirect("back");
       }
       req.flash("success","Successfully deleted comment!");
       res.redirect("/posts/"+ req.params.id);
   });
});



module.exports=router;