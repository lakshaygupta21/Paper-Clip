var express=require("express");
var app = express();
var bodyParser=require("body-parser");
var mongoose =require("mongoose");
var methodOverride=require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/users");
var seedDB = require("./seeds");
var commentRoutes=require("./routes/comments");
var PostRoutes=require("./routes/Posts");
var indexRoutes=require("./routes/index");
var flash =  require("connect-flash");

mongoose.connect("mongodb+srv://Lakshay:<password>@cluster0-5bkjd.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
//Passport config.
app.use(require("express-session")({
    secret:"Once again Rusty wins!!!",
    resave:false,
    saveUninitialized:false

}));
app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next)
{
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(PostRoutes);


app.listen(process.env.PORT,process.env.IP,function()
{
   console.log("Paper Clip server has started!!!");
  
});