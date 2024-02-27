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
import React, { useContext, useEffect, useState } from "react";
import "./creategroup.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useAvatar } from "../hooks/useAvatar";
import AvatarUploader from "../AvatarUploader";
import { myContext } from "../Main/MainContainer";
import { useSelector } from "react-redux";

const Creategroup = () => {
  const lightTheme= useSelector((state)=>state.themeKey);
  const userData = JSON.parse(Cookies.get("userData"));
  if (!userData) {
    console.log("user not authenticates");
  }

  const { refresh, setRefresh } = useContext(myContext);

  const [groupName, setGroupName] = useState({
    name : "",
    avatarImage: "",
  });

  const handleInputChange = (e) => {
    setGroupName({ ...groupName, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = React.useState(false);
  const {
    error: avatarError,
    isLoading: avatarLoading,
    fetchAvatar,
  } = useAvatar();

  //Avatar
  const generateAvatar = async () => {
    const avatar = await fetchAvatar();
    setGroupName((prev) => ({
      ...prev,
      avatarImage: avatar,
    }));
  };

  const handleGenerate = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    generateAvatar();
  }

  useEffect(()=>{
    generateAvatar();
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createGroups =async() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    const response = await axios.post(
      "http://localhost:5000/chat/createGroup",
      {
        name:groupName.name,
        avatarImage:groupName.avatarImage,
      },
      config
    )
    if(response.status===200){
      setRefresh(!refresh);
    }
  };

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
                setRefresh(!refresh)
                handleClose();
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={"createGroups-container "+ (lightTheme ? "" : "dark borderdark")}>
        <div className={"createGroups-box "+ (lightTheme ? "" : "darkerbox")}>
          <div className={(lightTheme ? "" : "darkerbox")}>
            <h1>Enter Group Name</h1>
          </div>
          <div className="creategroupInput">
            <input
              onChange={handleInputChange}
              name="name"
              placeholder="Group Name"
              className={"search-box " + (lightTheme ? "" : "")}
            />
            <AvatarUploader
              error={avatarError}
              isLoading={avatarLoading}
              onGenerate={handleGenerate}
              avatar={groupName.avatarImage}
            />
            <Button
              variant="contained"
              className={"icon " + (lightTheme ? "" : "darker")}
              onClick={() => {
                handleClickOpen();
                // createGroup();
              }}
              sx={{
                backgroundColor: "#e8505b",
                padding: "10px 10px",
                "&:hover": {
                  backgroundColor: "#e8505b",
                },
              }}
            >
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creategroup;
