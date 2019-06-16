var mongoose = require("mongoose");
//Schema setup
var postSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
   created:{type:Date, default: Date.now}
});
var Post=mongoose.model("Post",postSchema);

module.exports= Post;