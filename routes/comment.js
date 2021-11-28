const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


const commentCtrl = require("../controllers/comment");

router.post("/", auth, commentCtrl.createComment);
router.get("/", auth, commentCtrl.getComments);
router.delete("/:id", auth, commentCtrl.deleteComments)


module.exports = router;
