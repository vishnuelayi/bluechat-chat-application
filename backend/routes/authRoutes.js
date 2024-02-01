const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const { loginUser, registerUser, getUsers } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware,getUsers)


module.exports = router;
