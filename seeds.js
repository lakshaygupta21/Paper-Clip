var mongoose =require("mongoose");
var Post = require("./models/post");
var Comment = require("./models/comment");

function seedDB()
{
    Post.remove({},function(err)
    {
    });
};



module.exports = seedDB;
