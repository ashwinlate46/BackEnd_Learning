const express = require("express");
const router = express.Router();

//Import Controller
const {dummyLink, likePost, unlikePost} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");
const {createPost} = require("../controllers/postController");
const {getAllPosts} = require("../controllers/postController")

//Mapping create
router.get("/dummyroute", dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike", unlikePost); 

//export
module.exports = router;


