import { Typography, Container, Toolbar, IconButton, Box } from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import { FaPaw } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";

import { logout } from "../redux/tokenSlice";
import theme from "./theme";

const NavBar = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.token.user);

  const styles = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    fontSize: "large",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
  };

  const navigateToCart = () => {
   if(user) {
    navigate(`/cart`)
  }else{
    navigate('/guestlogin')
  }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" theme={theme}>
          <Container fixed>
            <Toolbar>
              <IconButton color="inherit" size="large">
                <FaPaw onClick={() => navigate("/")} className="icon-button" />
              </IconButton>
              <Typography variant="h6" component="a" href="/" sx={styles}>
                FLUFFY FRIENDS
              </Typography>
              {token === null ? (
                <Typography
                  className="button"
                  variant="h6"
                  noWrap
                  component="a"
                  onClick={() => navigate("/login")}
                  style={{ marginLeft: "50%" }}
                  sx={styles}
                >
                  SignUp
                </Typography>
              ) : (
                <>
                  <Typography
                    className="button"
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={() => {
                      dispatch(logout());
                    }}
                    style={{ marginLeft: "50%" }}
                    sx={styles}
                  >
                    Logout
                  </Typography>

                  <Typography
                    className="button"
                    variant="h6"
                    noWrap
                    component="a"
                    sx={styles}
                    onClick={() => navigate("/account")}
                  >
                    Account
                  </Typography>

                  {user.isAdmin && (
                    <Typography
                      className="button"
                      variant="h1"
                      noWrap
                      component="a"
                      sx={styles}
                      onClick={() => navigate("/admin")}
                    >
                      Admin
                    </Typography>
                  )}
                </>
              )}
              <IconButton color="inherit" size="large">
                <FaShoppingCart
                  onClick={() => { navigateToCart() }}

                  className="icon-button"
                />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
