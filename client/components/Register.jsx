import { React, useState } from "react";
import { useRegisterMutation } from "../redux/authApi";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [register, { error }] = useRegisterMutation();

  const submitRegister = async (event) => {
    event.preventDefault();
    const response = await register({
      username: username,
      password: password,
      name: name,
      email: email,
      phone: phone,
      address: address,
    });
    setSuccess(response.data.message);
    setUsername("");
    setPassword("");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
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
          Create Account
        </Typography>
        <form onSubmit={submitRegister}>
          <TextField
            required
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <br />
          <br />
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
          />
          <br />
          <br />

          <TextField
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <TextField
            required
            label="Mobile Number"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <TextField
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#7071E8", padding: "10px 15px" }}
          >
            continue
          </Button>
        </form>
        {success && <p>{success}</p>}
        {error && <p>Error: {error.message}</p>}
      </Box>
    </div>
  );
};

export default Register;
