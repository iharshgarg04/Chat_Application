import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import SearchIcon from "@mui/icons-material/Search";
// import ConversationBox from "../conversationItems/ConversationBox";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Features/themeslice";
import "./sidebar.css";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { myContext } from "../Main/MainContainer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refresh, setRefresh } = useContext(myContext);
  const lighttheme = useSelector((state) => state.themeKey);
  const [conversation, setConversation] = useState([]);
  const [searchquerry, setSearchquerry] = useState("");

  //menu option
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userData = JSON.parse(Cookies.get("userData"));

  if (!userData) {
    console.log("User not authenticated");
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    const response = axios
      .get(`http://localhost:5000/chat?search=${searchquerry}`, config)
      .then((response) => {
        console.log("Data refresed in sidebar", response.data);
        setConversation(response.data);
      });
    console.log(response);
  }, [refresh, searchquerry]);

  const handleSearchQuerry = (event) => {
    setSearchquerry(event.target.value);
    console.log(event.target.value);
  };

  //logout
  const handleLogout = () => {
    Cookies.remove("userData");
    navigate("/");
  };

  return (
    <div className={"sidebar"}>
      <div className={"sb-header " + (lighttheme ? "" : "dark")}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "rgba(0, 0, 0, 0.54)",
            fontWeight: "bolder",
          }}
        >
          <IconButton onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          {/* menu */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <p style={{ textTransform: "uppercase" }}>{userData.data.name}</p>
        </div>
        <div className="other-icons">
          <IconButton
            className="iconshadow"
            onClick={() => {
              navigate("users");
            }}
          >
            <PersonAddIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <IconButton className="iconshadow">
            <GroupAddIcon
              onClick={() => navigate("joinGroup")}
              className={"icon " + (lighttheme ? "" : "dark")}
            />
          </IconButton>
          <IconButton
            className="iconshadow"
            onClick={() => {
              navigate("create-groups");
            }}
          >
            <AddCircleIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <IconButton
            className="iconshadow"
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {lighttheme ? (
              <NightlightRoundIcon
                className={"icon " + (lighttheme ? "" : "dark")}
              />
            ) : (
              <LightModeIcon className={"icon " + (lighttheme ? "" : "dark")} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={"sb-search-container " + (lighttheme ? "" : "dark")}>
        <div className={"sb-search " + (lighttheme ? "" : "dark")}>
          <IconButton>
            <SearchIcon className={"icon " + (lighttheme ? "" : "dark")} />
          </IconButton>
          <input
            type="text"
            placeholder="Search"
            className={lighttheme ? "" : "dark"}
            onChange={handleSearchQuerry}
          />
        </div>
      </div>
      <div className={"sb-conversation " + (lighttheme ? "" : "dark")}>
        {conversation.map((conversation, index) => {
          if (
            conversation.users.length === 1 
          ) {
            return <div key={index}></div>;
          }
          if (conversation.latestMessage === undefined) {
            return (
              <div
                key={index}
                onClick={() => {
                  console.log("Refresed fired from sidebar");
                  setRefresh(!refresh);
                }}
              >
                <div
                  key={index}
                  className="conversation-container"
                  onClick={() => {
                    navigate(
                      `chat/${conversation._id}&${
                        conversation.isGroupChat === false
                          ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].name : conversation.users[0].name)
                          : conversation.chatName
                      }&${
                        conversation.isGroupChat === false
                          ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].avatarImage : conversation.users[0].avatarImage)
                          : conversation.avatarImage
                      }`
                    );
                  }}
                >
                  <div className="avatar-box ">
                    <img
                      src={`data:image/svg+xml;base64,${
                        conversation.isGroupChat === false
                          ?( conversation.users[0]._id === userData.data._id ? conversation.users[1].avatarImage : conversation.users[0].avatarImage)
                          : conversation.avatarImage
                      }`}
                      alt="user avatar"
                    />
                  </div>
                  <p className="con-title">
                    {conversation.isGroupChat === false
                      ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].name : conversation.users[0].name)
                      : conversation.chatName}
                  </p>
                  <p className="con-lastMessage">
                    No previous Messages, click here to start a new chat
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="conversation-container"
                onClick={() => {
                  navigate(
                    `chat/${conversation._id}&${
                      conversation.isGroupChat === false
                        ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].name : conversation.users[0].name)
                        : conversation.chatName
                    }&${
                      conversation.isGroupChat === false
                        ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].avatarImage : conversation.users[0].avatarImage)
                        : conversation.avatarImage
                    }`
                  );
                }}
              >
                <div className="avatar-box">
                  <img
                    src={`data:image/svg+xml;base64,${
                      conversation.isGroupChat === false
                        ? ( conversation.users[0]._id === userData.data._id ? conversation.users[1].avatarImage : conversation.users[0].avatarImage)
                        : conversation.avatarImage
                    }`}
                    alt="user avatar"
                  />
                </div>
                <p className="con-title">
                    {conversation.isGroupChat === false
                      ?( conversation.users[0]._id === userData.data._id ? conversation.users[1].name : conversation.users[0].name)
                      : conversation.chatName}
                  </p>
                <p className="con-lastMessage">
                  {conversation.latestMessage.content}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SideBar;
