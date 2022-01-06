//import package
const express = require("express");

//fonction de router
const router = express.Router();

//import du controllers
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

//les routes users
/*router.post("/", auth, userCtrl.createUser);*/
//recuperer tous les utilisateurs
router.get("/", auth, userCtrl.getUsers);
//recuperer l'utilisateur en cours de la session
router.get("/currentUser", auth, userCtrl.getCurrentUser);
//recuperer un utilisateur
router.get("/:id", auth, userCtrl.getOneUser);
//supprimer un utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);
//modifier un utilisateur
router.put("/:id", auth, userCtrl.updateUser);

module.exports = router;
