const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.post("/", auth, multer, userCtrl.createUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
