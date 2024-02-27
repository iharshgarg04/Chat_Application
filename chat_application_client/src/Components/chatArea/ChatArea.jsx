import React, { useContext, useEffect, useRef, useState } from "react";
import "./chatArea.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Messageother from "../Messages/Messageother";
import Messageself from "../Messages/Messageself";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios, { all } from "axios";
import Cookies from "js-cookie";
import { myContext } from "../Main/MainContainer";
import io from "socket.io-client";
import { toast } from "react-toastify";
import image from "../../assests/doodle.jpg";
import SeeUsers from "../SeeUsers.jsx";

var socket , selectedChat;
const ENDPOINT = "http://localhost:5000";

const ChatArea = () => {
  // const lightTheme = useSelector((state) => state.themeKey);
  const { refresh, setRefresh ,notification , setNotification ,chatcontext , setChatcontext} = useContext(myContext);
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user, avatarImage] = dyParams._id.split("&");
  const userData = JSON.parse(Cookies.get("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const lighttheme = useSelector((state) => state.themeKey);
  const msgRef = useRef(null);
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();
  // const [allMessagesCopy, setAllMessagesCopy] = useState([]);


  const fetchMessages = async () => {
    if (!chatcontext) {
      console.log("chatcontext is not available",chatcontext)
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/message/" + chatcontext._id,
        config
      );
      setAllMessages(data);
      setloaded(true);
      socket.emit("join chat", chatcontext._id);
    } catch (error) {
      toast.error("Error while fetching");
    }
  };

  const sendMessage = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    setMessageContent("");

    const { data } = await axios.post(
      "http://localhost:5000/message/",
      {
        content: messageContent,
        chatId: chatcontext,
      },
      config
    );
    socket.emit("new message", data);
    setRefresh((prevRefresh) => !prevRefresh);
    setAllMessages([...allMessages, data]);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => {
      setSocketConnectionStatus(true);
    });
  }, []);


  useEffect(() => {
    fetchMessages();
    selectedChat = chatcontext;
  }, [chatcontext,refresh,userData.data.token]);
 

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
        if(!notification.includes(newMessage)){
          setNotification([newMessage,...notification]);
          setRefresh(!refresh);
        }
        console.log("Users are not chating with each other");
      } else {
        console.log("message is recieved");
        setAllMessages([...allMessages, newMessage]);
        setRefresh(!refresh);
      }
    });
  });



  // useEffect(() => {
  //   console.log("Users refreshed");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${userData.data.token}`,
  //     },
  //   };
  //   axios.get("http://localhost:5000/message/" + chat_id, config)
  //     .then(({ data }) => {
  //       // console.log("Hii i am allmessagescopy");
  //       setAllMessages(data);
  //       // console.log(data);
  //       // console.log("hii ba")
  //       setloaded(true);
  //       socket.emit("join chat",chat_id);
  //     });
  // }, [refresh,chat_id, userData.data.token]);



  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  });

  const handleOpen = ()=>{
    setOpen(true);
  }
  const handleclose = ()=>{
    setOpen(false);
  }



  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
    return (
      <div className="chatArea-container">
        <div className={"chatArea-header " + (lighttheme ? "" : "darker")}>
          <div className="avatar-box ">
            <img
              src={`data:image/svg+xml;base64,${avatarImage}`}
              alt="user avatar"
            />
          </div>
          <div className={"header-text " + (lighttheme ? "" : "darker")}>
            <p className={"con-title " + (lighttheme ? "" : "darker")}>
              {chat_user}
            </p>
            {/* <p className="con-timestamp">{props.timestamp}</p> */}
          </div>
          {chatcontext.isGroupChat=== true ? <SeeUsers handleOpen={handleOpen} handleClose={handleclose} open={open} name={chat_user} /> : <div/>}
          
        </div>
        <div className="messages-container" ref={msgRef}>
          <div
            className={"msg-cont-back " + (lighttheme ? "" : "darkerdoodle")}
          ></div>
          {allMessages
            .slice(0)
            // .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                return <Messageself props={message} key={index} />;
              } else {
                return <Messageother props={message} key={index} />;
              }
            })}
        </div>
        <div ref={messagesEndRef} className="BOTTOM" />
        <div className={"text-input-area " + (lighttheme ? "" : "darker")}>
          <input
            type="text"
            placeholder="Type a Message"
            className={"search-box " + (lighttheme ? "" : "darker")}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code == "Enter") {
                // console.log(event);
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }
            }}
          />
          <IconButton
            className={"icon " + (lighttheme ? "" : "darkerlight")}
            sx={{
              backgroundColor: "#e8505b",
              borderRadius: "30%",
              color: "white",
              margin: "auto",
              padding: "7px 11px",
            }}
            onClick={() => {
              sendMessage();
              setRefresh(!refresh);
            }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
};

export default ChatArea;
