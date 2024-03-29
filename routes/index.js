var express  = require("express");
var router  = express.Router();
var passport=require("passport");
var Post = require("../models/post");
var Comment=require("../models/comment");
var User=require("../models/users");
var middleware = require("../middleware");
router.get("/register",function(req,res)
{
   res.render("register");
});
router.post("/register",function(req,res)
{
    var newUser=new User({username:req.body.username})
User.register(newUser,req.body.password,function(err,user)
{
   if(err)
   {
       req.flash("error",err.message);
       
      return res.render("register");
   }
   passport.authenticate("local")(req,res,function()
   {
       req.flash("success","Welcome " + user.username)
       res.redirect("/posts");
   });
});
});
//Login
router.get("/login",function(req,res)
{
 res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/posts",
    failureRedirect:"/login",
    failureFlash : true
}),function(req,res)
{

});
//logout
router.get("/logout",function(req,res)
{
   req.logout();
   req.flash("success","Logged you out!")
   res.redirect("/posts");
});
//middleware


module.exports = router;