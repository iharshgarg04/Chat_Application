const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");

exports.accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId Not found");
    return res.sendStatus(400);
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

  res.send(isChat);

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    console.log("Chat retrived");
    res.send(isChat[0]);
  } else {
    console.log("New chat is creating...");
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.statusCode(400);
    console.log(error.message)
    }
  }
});

exports.fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    console.log("Fetch Chats API : ", res);
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .then(async(results)=>{
        results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name email",
        });
        res.status(200).send(results);
    })
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
});
