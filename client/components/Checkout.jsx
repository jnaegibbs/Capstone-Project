import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGuestLoginMutation} from "../redux/authApi";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const Checkout = () => {
  const user = useSelector((state) => state.token.user);
  console.log(user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [guestLogin, { error }] = useGuestLoginMutation();

  const submitRegister = async (event) => {
    console.log("submit clicked")
    event.preventDefault();
    const response = await guestLogin({
      username: email,
      password: "",
      name: name,
      email: email,
      phone: phone,
      address: address,
    });
    setSuccess(response.data.message);

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const styles = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 900,
    fontSize: "large",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
    paddingLeft: 10,
  };
  const bodyStyle = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 500,
    fontSize: "medium",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
    paddingLeft: 10,
  };

  const styles2 = {
    width: 500,
    maxWidth: "100%",
    paddingLeft: 10,
  };

  return (
    <div>
      {user !== null ? (
        <Paper elevation={0} sx={styles2}>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Contact
          </Typography>
          <br />

          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].email}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].phoneNumber}
          </Typography>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Delivery
          </Typography>
          <br />
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].name}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].address}
          </Typography>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Payment
          </Typography>
          <br/>
          <br/>
           <br/>
          <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#7071E8", padding: "8px 10px" }}
              onClick={()=>navigate('/confirmPage')}
            >
             Place your Order
            </Button>
          <br />
        </Paper>
      ) : (
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
            Login as Guest
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
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#7071E8", padding: "10px 15px" }}
            >
              continue
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};

export default Checkout;
