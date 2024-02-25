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

    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User information is missing or incomplete",
      });
    }
    Chat.find({ 
      users: { $elemMatch: { $eq: req.user._id } },
      isGroupChat: { $exists: true },
    })
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
  const {name,avatarImage} = req.body;
  console.log("Hii am groups");
  console.log(req.body);
  if(!name){
    return res.status(400).send({message : "Data is insufficient"})
  }


  try{
    const groupChat = await Chat.create({
      chatName: name,
      users : req.user,
      isGroupChat : true,
      groupAdmin : req.user,
      avatarImage : avatarImage
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

exports.fetchGroup = expressAsyncHandler(async(req,res)=>{
    try{
      const allGroups = await Chat.where("isGroupChat").equals(true);
      res.status(200).send(allGroups);
    }
    catch(error){
      res.status(400);
      console.log("Error while fetching groups");
    }
})

exports.addTogroup = expressAsyncHandler(async(req,res)=>{
  try{
    const {chatId} = req.body;
    if(!chatId){
      console.log("group id is not present ");
      return res.status(400).json({
        success:false,
        message:"group id is not present",
      })
    }

    const adduser = await Chat.findByIdAndUpdate(chatId,{$push:{users:req.user._id}},{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!adduser){
      res.status(404).json({
        success:false,
        message:"Error while adding user",
      })
    }else{
      res.json(adduser);
    }

  }catch(error){
    console.log(error.message);
  }
})