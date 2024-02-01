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


module.exports = { accessChat };