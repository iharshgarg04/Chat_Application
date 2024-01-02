import React from "react";
import Form from "../../Components/LoginPage/Form";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./login.css"; 



const LoginForm = () => {

  return (
    <Form>
      <h1>Login</h1>
      <TextField
        className="input"
        type="text"
        id="outlined-username"
        label="UserName"
        variant="outlined"
        name = "username"
      />
      <TextField
        className="input"
        type="password"
        id="outlined-password"
        label="Password"
        variant="outlined"
        name = "password"
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
        Do not have an account ? <Link to='/signup'>
        <span>Sign up</span>
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;

