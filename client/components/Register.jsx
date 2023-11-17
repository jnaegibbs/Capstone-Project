import { React, useState } from "react";
import { useRegisterMutation } from "../redux/authApi";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Register = () => {


  console.log("register rendered");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [register, { error }] = useRegisterMutation();

  const submitRegister = async (event) => {
    event.preventDefault();
    const response = await register({
      username: username,
      password: password,
      name: name,
      //  email: email,
    });
    setSuccess(response.data.message);
    setUsername("");
    setPassword("");
    setName("");
    //setEmail("");
    navigate("/");
  };

  return (
    <div>
      <br />
      <Box justifyContent="left" width="50%">
        <Typography variant="h4" align="left" gutterBottom>
          Register Here!
        </Typography>
        <form onSubmit={submitRegister}>
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <br />
          <br />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <br />
          <br />
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <br />
          {/* <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          />   
          <br />
          */}
          <br />
          <Button type="submit" variant="contained" color="secondary">
            Register
          </Button>
        </form>
        {success && <p>{success}</p>}
        {error && <p>Error: {error.message}</p>}
      </Box>
    </div>
  );
};

export default Register;
