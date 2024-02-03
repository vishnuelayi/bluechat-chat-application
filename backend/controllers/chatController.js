const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//access the chat between the logged in id and the other given id
const accessChat = asyncHandler(async (req, res) => {
  var { userId } = req.body;
  console.log(userId);

  try {
    if (!userId) {
      console.log("No user id found");
      return res.status(400).json({ error: "No user id found" });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "fname email picture",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var newChat = await Chat.create({
        isGroupChat: false,
        users: [req.user._id, userId],
        chatName: "sender",
      });
    }

    var fullChat = await Chat.findOne({ _id: newChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullChat);
  } catch (error) {
    throw new Error(error.message);
  }
});

//controller for getting all chats for the particular user
const getChats = asyncHandler(async (req, res) => {
  try {
    await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fname picture email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//controller for creating a group chat
const createGroup = asyncHandler(async (req, res) => {
  try {
    const { groupName, users } = req.body;

    if (!groupName || !users) {
      res.status(400).send("Please fill all the fields");
      return;
    }
    const usersArry = JSON.parse(users);

    if (usersArry.length < 2) {
      return res.status(400).send("Need users more than one for group chats");
    }

    usersArry.push(req.user);

    const groupChat = await Chat.create({
      chatName: groupName,
      users: usersArry,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//controller for rename a particular group
const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, groupName } = req.body;
  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: groupId },
      { chatName: groupName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(400).send("Group not found");
    }
    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//controller for adding a user to a group chat
const addUserToGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const added = await Chat.findOneAndUpdate(
      { _id: groupId },
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    1;
    if (!added) {
      res.status(400).send("Invalid groupId");
      return;
    }

    res.status(200).json(added);
  } catch (error) {
    throw new Error(error.message);
  }
});

const rmvUserToGroup = asyncHandler(async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const removed = await Chat.findOneAndUpdate(
      { _id: groupId },
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    1;
    if (!removed) {
      res.status(400).send("Invalid groupId");
      return;
    }

    res.status(200).json(removed);
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  getChats,
  createGroup,
  renameGroup,
  addUserToGroup,
  rmvUserToGroup,
};
