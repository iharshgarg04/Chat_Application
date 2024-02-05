import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutline";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./creategroup.css";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"
import Cookies from "js-cookie";
import axios from "axios";

const Creategroup = () => {
  const userData = JSON.parse(Cookies.get("userData"));
  if(!userData){
    console.log("user not authenticates");
  }

  const[groupName, setGroupName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const createGroups = ()=>{
    const config ={
      headers:{
        Authorization : `Bearer ${userData.data.token}`,
      },
    }

    axios.post(
      "http://localhost:5000/chat/createGroup",{
        name : groupName,
        users : '["65908be6db44e4da3e2dd971" , "6593d451d083f62ac91966e4"]'
      },config
    )
  } 

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to create a Group Named " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will create a create group in which you will be the admin and
              other will be able to join this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                createGroups();
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={"createGroups-container"}>
        <input
          placeholder="Enter Group Name"
          className={"search-box"}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <IconButton
          className={"icon"}
          onClick={() => {
            handleClickOpen();
            // createGroup();
          }}
        >
          <DoneOutlineRoundedIcon />
        </IconButton>
      </div>
    </>
  );

};

export default Creategroup;
