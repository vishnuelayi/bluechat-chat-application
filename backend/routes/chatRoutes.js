const express = require("express");
const { accessChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/",authMiddleware, accessChat);

module.exports = router;