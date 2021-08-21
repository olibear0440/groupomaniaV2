const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
//const multer = require("../middleware/multer-config");
//const auth = require("../middleware/auth");

router.get("/", userCtrl.getUsers);
router.post("/", userCtrl.createUser);
router.delete("/:id", userCtrl.deleteUser);
module.exports = router;
