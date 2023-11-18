import { React, useState } from "react";

import { useLoginMutation } from "../redux/authApi";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { setToken } from "../redux/tokenSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();

  const dispatch = useDispatch();

  const submitLogin = async (event) => {
    event.preventDefault();
    const response = await login({
      username: username,
      password: password,
    });

    console.log(response)
    setSuccess(response.data.message);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      <br />
      <Box justifyContent="left" width="50%">
        <Typography variant="h4" align="left" gutterBottom>
          Login Here!
        </Typography>
        <form onSubmit={submitLogin}>
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
          <Button type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </form>
        {success && <p>{success}</p>}
        {error && <p>Error: {error.message}</p>}
      </Box>
    </div>
  );
};

export default Login;
