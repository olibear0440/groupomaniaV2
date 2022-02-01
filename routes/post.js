const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

/*
    * routes:
        - creer une publication
        - Ajouter et retirer un j'aime sur une publication
        - renvois toutes les publications
        - renvoi une publication
        - supprimer une publication

    * protection des routes par middleware d'authentification
*/

router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.postLike);
router.get("/", auth, postCtrl.getPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
