import React from "react";
import Form from "../../Components/LoginPage/Form";
import { TextField, Button } from "@mui/material";
import "./login.css";
import {  useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {

  const navigate = useNavigate();

  return (
    <Form>
      <h1>Login</h1>
      <TextField
        className="input"
        type="name"
        id="outlined-basic"
        label="UserName"
        variant="outlined"
      />
      <TextField
        className="input"
        type="password"
        id="outlined-basic"
        label="Password"
        variant="outlined"
      />
      <Button  className="button" variant="contained"
        sx={{
            backgroundColor:'#4e416cff',
            '&:hover':{
                backgroundColor:'#4e416cff'
            }
        }}
      >
        Login
      </Button>
      <p className="loginspan">
        Do not have an account ?<Link to='/signup'>
        <span>sign up</span>
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;

