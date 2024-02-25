import "./groups.css";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../../assests/welcome.svg";
import Cookies from "js-cookie";
import axios from "axios";
import { myContext } from "../../Components/Main/MainContainer";
import { useDispatch } from "react-redux";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const userData = JSON.parse(Cookies.get("userData"));
  const dispatch = useDispatch();
  console.log(userData);
  const [searchquerry, setSearchquerry] = useState("");

  if (!userData) {
    console.log("User Not Authenticated");
  }

  useEffect(() => {
    console.log("user Refered");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };

    axios
      .get(
        `http://localhost:5000/chat/fetchGroups?search=${searchquerry}`,
        config
      )
      .then((data) => {
        console.log("User refresed in user panel");
        setGroups(data.data);
      });
  }, [refresh, searchquerry]);

  const handleSearchQuerry = (event) => {
    setSearchquerry(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="groups-container">
      <div className={"g-header"}>
        <img
          src={logo}
          style={{ height: "100%", width: "4rem", marginLeft: "10px" }}
        />
        <p className={"g-title"}>Available Groups</p>
        <IconButton
          className={"icon"}
          onClick={() => {
            setRefresh(!refresh);
          }}
        >
          <RefreshIcon />
        </IconButton>
      </div>
      <div className={"sb-search searchback"}>
        <IconButton className={"icon"}>
          <SearchIcon />
        </IconButton>
        <input
          placeholder="Search"
          className={"search-box searchback"}
          onChange={handleSearchQuerry}
        />
      </div>

      {groups.map((user, index) => {
        return (
          <div
            className="g-list"
            key={index}
            onClick={() => {
              console.log("Creating chat with ", user.chatName);
              const config = {
                headers:{
                    Authorization: `Bearer ${userData.data.token}`
                }
              }
              const response = axios.put("http://localhost:5000/chat/addUsers",
              {
                chatId : user._id,
                userId : userData.data._id,
              },
              config).then(()=>{
                setRefresh(!refresh);
              })

            }}
          >
            <div className="avatar-box">
              <img
                src={`data:image/svg+xml;base64,${user.avatarImage}`}
                alt="user avatar"
              />
            </div>
            <p className={"con-title"}>{user.chatName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
