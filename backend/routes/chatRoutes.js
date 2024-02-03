const express = require("express");
const {
  accessChat,
  getChats,
  createGroup,
  renameGroup,
  addUserToGroup,
  rmvUserToGroup,
} = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, accessChat);
router.get("/", authMiddleware, getChats);
router.post("/create-group", authMiddleware, createGroup);
router.put("/rename-group", authMiddleware, renameGroup);
router.put("/add-user", authMiddleware, addUserToGroup);
router.put("/remove-user", authMiddleware, rmvUserToGroup);

module.exports = router;
