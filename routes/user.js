const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

/*
    * routes:
        - renvois tous les utilisateurs
        - renvoi l'utilisateur de la session par son token
        - renvoi un utilisateur par son ID
        - supprimer un utilisateur
        - modifier le mdp d'un utilisateur

    * protection des routes par middleware d'authentification
*/

router.get("/", auth, userCtrl.getUsers);
router.get("/currentUser", auth, userCtrl.getCurrentUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/", auth, userCtrl.updateUser);

module.exports = router;
