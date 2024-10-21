//import mongoose
const mongoose = require("mongoose");

//route handler
const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId, //Post ki ID
        ref:"Post", //reference to the post model
    },
    user: {
        type: String,
        required:true,
    }
});

//exports
module.exports = mongoose.model("Comment", likeSchema);