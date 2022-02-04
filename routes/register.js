const express = require("express");
const router = express.Router();
const registerCtrl = require("../controllers/register");
const limiter = require("../rateLimit");

/*
    * routes:
        * creer un utilisateur
        * enregistrer un utilisateur existant
*/

router.post("/signup", registerCtrl.signup);
router.post("/login", limiter, registerCtrl.login);

module.exports = router;
