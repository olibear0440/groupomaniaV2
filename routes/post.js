const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
//const auth = require("../middleware/auth");

//probleme avec le middleware de auth, une fois integré dans les routes plus rien ne s'affiche sur le test du fetch
router.get("/", postCtrl.getPosts);
router.get("/:id", postCtrl.getOnePost);
router.post("/", multer, postCtrl.createPost);

module.exports = router;
