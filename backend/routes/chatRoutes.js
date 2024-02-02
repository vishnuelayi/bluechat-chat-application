const express = require("express");
const { accessChat, getChats, createGroup, renameGroup } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");



const router = express.Router();

router.post("/",authMiddleware, accessChat);
router.get("/",authMiddleware, getChats);
router.post("/create-group", authMiddleware, createGroup)
router.put("/rename-group", authMiddleware, renameGroup)

module.exports = router;