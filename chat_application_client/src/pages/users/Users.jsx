import React, { useContext, useEffect, useState } from "react";
import User from "../../Components/User";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../../assests/chat.png";
import "./users.css";
import Cookies from "js-cookie";
import axios from "axios";
import { myContext } from "../../Components/Main/MainContainer";

const Users = () => {

  const [users, setusers] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const userData = JSON.parse(Cookies.get("userData"));
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
          style={{ height: "2rem", width: "2rem", marginLeft: "10px" }}
        />
        <p className={"ug-title"}>Available Users</p>
        <IconButton className={"icon"} onClick={()=>{
          setRefresh(!refresh);
        }}>
          <RefreshIcon />
        </IconButton>
      </div>
      <div className={"sb-search"}>
        <IconButton className={"icon"}>
          <SearchIcon />
        </IconButton>
        <input placeholder="Search" className={"search-box"} />
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
            );
            console.log("dispatching");
            setRefresh(!refresh);
            console.log("dispatched");
          }}
          >
            <p className={"con-icon"}>{user.name[0]}</p>
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
