//import package
const express = require("express");

//fonction de router
const router = express.Router();

//import du controllers
const registerCtrl = require("../controllers/register");

//route endpoint du registers
router.post("/signup", registerCtrl.signup);
router.post("/login", registerCtrl.login);
module.exports = router;
