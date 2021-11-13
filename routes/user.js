//import package
const express = require("express");

//fonction de router
const router = express.Router();

//import du controllers
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/", auth, userCtrl.createUser);
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/currentUser", auth, userCtrl.getCurrentUser); //retourne tableau vide
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, userCtrl.updateUser);

module.exports = router;
