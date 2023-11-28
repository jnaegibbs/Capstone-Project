import React from "react";
import { useAppSelector } from "../hooks";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const Account = () => {
  const user = useAppSelector((state) => state.token.user);

  console.log("user details:", user);

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

  const styles2 = {
    width: 500,
    maxWidth: "100%",
    paddingLeft: 10,
  };

  return (
 <>
 {user !== null ?
    <div>
        <br/>
        <br/>
        <Typography sx={styles}>
        BASIC INFORMATION
        </Typography>
        <br /> 
        <br /> 
         <Box
      sx={styles2}
    >
      <TextField fullWidth label="Name" defaultValue={user.profile[0].name} />
    </Box>
    <br /> 

      <Box sx={styles2}>
        <TextField fullWidth label="Username" defaultValue={user.username} />
      </Box>
      <br />

    <Box
       sx={styles2}
    >
      <TextField fullWidth label="Email" defaultValue={user.profile[0].email} />
    </Box>
    <br/>

    <Box
       sx={styles2}
    >
      <TextField fullWidth label="Phone Number" defaultValue={user.profile[0].phoneNumber} />
    </Box>
    <br/>

    <Box
       sx={styles2}
    >
      <TextField fullWidth label="Address" defaultValue={user.profile[0].address} />
    </Box>

        </div>:<div>no user</div>}
        </>
    );
};  

export default Account;
