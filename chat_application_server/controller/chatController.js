const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");



exports.accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId Not found");
    res.sendStatus(400);
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

  // res.send(isChat);

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    console.log("Chat retrived");
    res.status(200).json(isChat[0]);
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
      res.status(400);
      console.log(error.message)
    }
  }
});

exports.fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    console.log("Fetch Chats API : ", req);
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
        res.status(200).json(results);
    })
  }catch(error) {
    res.status(400).json({
      success:false,
    });
    console.log(error.message);
  }
});


exports.createGroupChat = expressAsyncHandler(async(req,res)=>{
  if(!req.body.users || !req.body.name){
    return res.status(400).send({message : "Data is insufficient"})
  }

  var users = JSON.parse(req.body.users);
  users.push(req.user);

  try{
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users : users,
      isGroupChat : true,
      groupAdmin : req.user,
    })

    const fullGroupChat = await Chat.findOne({_id : groupChat._id})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    res.status(200).json(fullGroupChat);
  }catch(error){
    res.status(400);
    console.log(error);
  }

})