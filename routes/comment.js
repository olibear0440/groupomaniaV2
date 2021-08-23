const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
//const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", commentCtrl.getComments);
router.post("/", multer, commentCtrl.createComment);

module.exports = router;
