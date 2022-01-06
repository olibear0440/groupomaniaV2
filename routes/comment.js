const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

//creer un commentaire
router.post("/", auth, commentCtrl.createComment);
//recuperer le commentaire d'un post
router.get("/:post_id", auth, commentCtrl.getPostComments);
//supprimer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComments)

module.exports = router;
