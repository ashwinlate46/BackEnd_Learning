//import mongoose
const mongoose = require("mongoose");

//route handler
const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,  //Post ki ID
        ref:"Post", //reference to the post model
    },
    user: {
        type: String,
        required:true,
    },
    body: {
        type: String,
        required: true,
    }
});

//export
// module.exports = mongoose.model("Comment", commentSchema);

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
module.exports = Comment;