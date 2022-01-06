const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

//creer un post
router.post("/", auth, multer, postCtrl.createPost);
//liker et unliker un post
router.post("/:id/like", auth, postCtrl.postLike);
//recuperer tt les posts
router.get("/", auth, postCtrl.getPosts);
//recuperer un post
router.get("/:id", auth, postCtrl.getOnePost);
//supprimer un post
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
