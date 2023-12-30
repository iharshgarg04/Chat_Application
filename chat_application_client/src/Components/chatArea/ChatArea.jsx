import React from "react";
import "./chatArea.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from '@mui/icons-material/Send';
import Messageother from "../Messages/Messageother";
import Messageself from "../Messages/Messageself";

const ChatArea = () => {
  const props = {
    name:"harsh",
    timestamp :"today",
  }
  return (
    <div className="chatArea-container">
      <div className="chatArea-header">
        <p className="con-icon">{props.name[0]}</p>
        <div className="header-text">
          <p className="con-title">{props.name}</p>
          <p className="con-timestamp">{props.timestamp}</p>
        </div>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="messages-container">
          <Messageother />
          <Messageself />
          <Messageother />
          <Messageself />
          <Messageother />
          <Messageself />
          <Messageother />
          <Messageself />
      </div>
      <div className="text-input-area">
        <input type="text" placeholder="Type a Message" className="search-box" />
        <IconButton>
            <SendIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
