const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes");
const cors = require('cors');
const { Server, Socket } = require('socket.io');



const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.use("/user",userRoutes);
app.use("/chat",chatRoutes);
app.use("/message",messageRoutes);

const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully")
    }
    catch(error){
        console.log("Error connecting to dataBase");
        console.log(error);
    }
};
connectDb();

const server = app.listen(PORT,()=>{
    console.log(`server is running on "http://localhost:${PORT}"`);
});

const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:3000",
    },
    pingTimeout : 60000
});

io.on("connection",(socket)=>{
    socket.on("setup",(user)=>{
        socket.join(user.data._id);
        socket.emit("connected");
    });

    socket.on("join chat",(room)=>{
        socket.join(room);
    });

    socket.on("new message",(newMessageStatus)=>{
        var chat = newMessageStatus.chat;
        if(!chat.users){
            return console.log("chat users not defines")
        }
        chat.users.forEach((user) => {
            if(user._id == newMessageStatus.sender._id) return;
            socket.in(user._id).emit("message received",newMessageRecieved);
        });
    })
})
