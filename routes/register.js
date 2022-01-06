//import package
const express = require("express");

//fonction de router
const router = express.Router();

//import du controllers
const registerCtrl = require("../controllers/register");

//creer et enregistrer un utilisateur dans la session
router.post("/signup", registerCtrl.signup);
//enregistrer un utilisateur existant dans la session
router.post("/login", registerCtrl.login);

module.exports = router;
