const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

/*
    * routes:
        creer un commentaire
        renvois les commentaires d'une publication
        supprimer un commentaire

    * protection des routes par middleware d'authentification
*/
router.post("/", auth, commentCtrl.createComment);
router.get("/:post_id", auth, commentCtrl.getPostComments);
router.delete("/:id", auth, commentCtrl.deleteComments)

module.exports = router;
