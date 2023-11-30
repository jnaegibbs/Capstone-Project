import { React, useState } from "react";

import { useLoginMutation } from "../redux/authApi";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const submitLogin = async (event) => {
    event.preventDefault();
    const response = await login({
      username: username,
      password: password,
    });

    console.log(response);
    setSuccess(response.data.message);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      <br />
      <Box
        sx={{
          width: 500,
          border: "1px solid #F3EEEA",
          padding: 10,
          borderRadius: 10,
          m: "10% 20%",
        }}
      >
        <Typography
          fontFamily="monospace"
          variant="h4"
          align="left"
          gutterBottom
        >
        Sign In
        </Typography>
        <form onSubmit={submitLogin}>
          <TextField
            required
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
           
          />
          <br />
          <br />
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <br />
          <br />
          <Typography variant="body1" align="left" gutterBottom>
           New to Fluffy Friends?{" "}
            <Button  sx={{color:'#7071E8'}} onClick={() => navigate("/register")}>Create an account</Button>
          </Typography>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#7071E8", padding: "10px 15px" }}
          >
          Continue
          </Button>
        </form>
        {success && <p>{success}</p>}
        {error && <p>Error: {error.message}</p>}
      </Box>
    </div>
  );
};

export default Login;
