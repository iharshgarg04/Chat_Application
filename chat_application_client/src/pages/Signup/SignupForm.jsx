import React from "react";
import Form from "../../Components/LoginPage/Form";
import { TextField, Button } from "@mui/material";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <Form>
      <h1>Signup</h1>
      <TextField
        className="input"
        type="username"
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
      <TextField
        className="input"
        type="email"
        id="outlined-basic"
        label="email"
        variant="outlined"
      />
      <TextField
        className="input"
        type="FullName"
        id="outlined-basic"
        label="FullName"
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
        Signup
      </Button>
      <p className="singupspan" >
        Already have an account ?<Link to='/login'>
        <span>login</span>
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;

