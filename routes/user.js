const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/", userCtrl.getUsers);
//router.post("/", auth, userCtrl.createUser);
router.delete("/:id", auth, userCtrl.deleteUser);
module.exports = router;
