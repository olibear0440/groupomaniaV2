const express = require("express");
const router = express.Router();
const registerCtrl = require("../controllers/register");

router.post("/signup", registerCtrl.signup);
router.post("/login", registerCtrl.login);

module.exports = router;