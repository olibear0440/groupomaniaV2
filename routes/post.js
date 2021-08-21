const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
//const multer = require("../middleware/multer-config");
//const auth = require("../middleware/auth");

router.get("/", postCtrl.getposts);
router.get("/:id", postCtrl.getOnePost);
router.post("/", postCtrl.createPost);

module.exports = router;
