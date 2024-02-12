import React, { useContext, useEffect, useState } from "react";
import User from "../../Components/User";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../../assests/welcome.svg";
import "./users.css";
import Cookies from "js-cookie";
import axios from "axios"
import { refreshSidebarfun } from "../../Features/refreshSidebar";
import { myContext } from "../../Components/Main/MainContainer";
import { useDispatch } from "react-redux";

const Users = () => {

  const [users, setusers] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const userData = JSON.parse(Cookies.get("userData"));
  const dispatch = useDispatch();
  console.log(userData);

  if(!userData){
    console.log("User Not Authenticated");
  }

  useEffect(()=>{
    console.log("user Refered");
    const config = {
        headers:{
            Authorization : `Bearer ${userData.data.token}`
        }
    }

    axios.get("http://localhost:5000/user/fetchAllUsers",config).then((data)=>{
        console.log("User refresed in user panel");
        setusers(data.data);
    })
  },[refresh])
  
  return (
    <User>
      <div className={"ug-header"}>
        <img
          src={logo}
          style={{ height: "100%", width: "4rem", marginLeft: "10px" }}
        />
        <p className={"ug-title"}>Available Users</p>
        <IconButton className={"icon"} onClick={()=>{
          setRefresh(!refresh);
        }}>
          <RefreshIcon />
        </IconButton>
      </div>
      <div className={"sb-search searchback"}>
        <IconButton className={"icon"}>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search" className={"search-box searchback"} />
      </div>

      {users.map((user,index) => {
        return (
          <div className="ug-list"
          key={index}
          onClick={()=>{
            console.log("Creating chat with ", user.name);

            const config={
              headers:{
                Authorization:`Bearer ${userData.data.token}`
              },
            };

            axios.post(
              "http://localhost:5000/chat/",{
                userId:user._id,
              },
              config
            ).then(()=>{
              setRefresh(!refresh)
            });
            console.log("dispatching");
            console.log("dispatched");
          }}
          >
            <div className="avatar-box">
            <img src={`data:image/svg+xml;base64,${user.avatarImage}`} alt="user avatar"/>
            </div>
            <p className={"con-title" }>
              {user.name}
            </p>
          </div>
        );
      })}
    </User>
  );
};

export default Users;
