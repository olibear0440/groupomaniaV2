const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, commentCtrl.getComments);
router.post("/", auth, multer, commentCtrl.createComment);

module.exports = router;
