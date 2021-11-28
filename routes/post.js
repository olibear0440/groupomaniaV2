const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getPosts);
router.get("/:id",auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);


module.exports = router;
