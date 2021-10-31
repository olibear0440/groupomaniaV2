const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get("/", postCtrl.getPosts);//voir avec le mentor pourquoi l'auth empeche l'affichage de ma requette
router.get("/:id", postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);

module.exports = router;
