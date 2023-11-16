import { Typography, Container, Toolbar, IconButton } from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import { FaPaw } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              {" "}
              <FaPaw sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}  />
            </div>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: "large",
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FLUFFY FRIENDS
            </Typography>

            <IconButton color="inherit">
                Sign up
            </IconButton>
            <IconButton color="inherit">
              Orders 
            </IconButton>
            <IconButton color="inherit">
              <FaShoppingCart />
            </IconButton>
           
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
