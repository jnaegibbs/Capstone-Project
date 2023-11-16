import { Typography, Container, Toolbar, IconButton, Box } from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import { FaPaw } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate }  from "react-router-dom";
import { useSelector } from "react-redux";


const NavBar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="primary">
          <Container maxWidth="xl">
            <Toolbar>
              <IconButton color="inherit" size="large">
                <FaPaw />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
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

              <Typography
                variant="h6"
                component="div"
                href="#app-bar-with-responsive-menu"
                style={{ marginLeft: "50%" }}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "large",
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Signup
              </Typography>

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
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Orders
              </Typography>

              <IconButton color="inherit">
                <FaShoppingCart />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
