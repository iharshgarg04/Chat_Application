import React, { useState } from "react";
import Form from "../../Components/LoginPage/Form";
import { TextField, Button, CircularProgress } from "@mui/material";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const SignupForm = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup/",
        formdata
      );

      console.log(response);
      if (response.status === 200) {
        toast.success("Signup Successful");
        Cookies.set("userData", JSON.stringify(response),{expires: 7 });
        navigate("/app/welcome");
      } else {
        toast.error("Signup failed. Please try again.");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      if(error.response.status=== 400){
        toast.error("User with this email or username already exits");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Form>
          <h1>Signup</h1>
          <TextField
            onChange={handleInputChange}
            className="input"
            type="text"
            id="standard-basic"
            label="UserName"
            variant="outlined"
            name="name"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
          borderColor: "#e8505b",
                }
              },
            }}
          />
          <TextField
            onChange={handleInputChange}
            className="input"
            type="email"
            id="outlined-email-basic"
            label="Email"
            variant="outlined"
            name="email"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
          borderColor: "#e8505b",
                }
              },
            }}
          />
          <TextField
            onChange={handleInputChange}
            className="input"
            type="password"
            id="outlined-input-basic"
            label="Password"
            variant="outlined"
            name="password"
          />
          <Button
            onClick={handleSubmit}
            className="button"
            variant="contained"
            sx={{
              backgroundColor: "#e8505b",
              "&:hover": {
                backgroundColor: "#e8505b",
              },
            }}
          >
            Signup
          </Button>
          <p className="singupspan">
            Already have an account ?{" "}
            <Link to="/">
              <span>login</span>
            </Link>
          </p>
        </Form>
      )}
    </>
  );
};

export default SignupForm;
