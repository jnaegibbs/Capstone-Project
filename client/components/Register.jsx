import { React, useState } from "react";
import { useRegisterMutation } from "../redux/authApi";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PetsTwoTone, PhotoSizeSelectActual } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const submitRegister = async (event) => {
    event.preventDefault();

    const sanitizedPhone = phone.replace(/\D/g, "");

    try {
      const response = await register({
        username: username,
        password: password,
        name: name,
        email: email,
        phone: sanitizedPhone,
        address: address,
      });

      if (response && response.error) {
        setError(
          <Typography fontWeight="bold" color="red">
            {response.error.data.error}
          </Typography>
        );

        setTimeout(() => {
          setError("");
        }, 10000);
      } else if (response.data.message) {
        setError(response.data.message);
      } else {
        setSuccess(
          <Box>
            <Typography fontWeight="bold" color="blue">
              You have successfully registered! Click continue to enter the
              website.
              <PetsTwoTone></PetsTwoTone>{" "}
            </Typography>
          </Box>
        );
      }

      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error(error);
      setError("An error occured. Please try again.");
    }
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
            type="text"
            placeholder="XXX-XXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <TextField
            required
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <br />
          <br />
          <br />

          {success ? (
            <Box>
              <Button
                onClick={() => navigate("/")}
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#7071E8" }}
              >
                Continue
              </Button>
            </Box>
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#7071E8", padding: "10px 15px" }}
            >
              Submit
            </Button>
          )}
        </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </Box>
    </div>
  );
};

export default Register;
