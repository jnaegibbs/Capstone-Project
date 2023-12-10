import { Typography, Container, Toolbar, IconButton, Box, Badge } from "@mui/material";
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
  const cart = useAppSelector((state)=> state.cart);
  console.log(cart);
  console.log(cart.cartItems.length);


  const buttonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '9px',
    marginLeft: '9px',
    width: '100px',
    cursor: 'pointer',
  }

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
      navigate(`/cart`)
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
              <Container fixed sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {token === null ? (
                  <Typography
                    className="button"
                    variant="h6"
                    noWrap
                    component="a"
                    onClick={() => navigate("/login")}
                    style={buttonStyles}
                    sx={styles}
                  >
                    SignIn
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
                      style={buttonStyles}
                      sx={styles}
                    >
                      Logout
                    </Typography>

                    <Typography
                      className="button"
                      variant="h6"
                      noWrap
                      component="a"
                      style={buttonStyles}
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
                        style={buttonStyles}
                        sx={styles}
                        onClick={() => navigate("/admin")}
                      >
                        Admin
                      </Typography>
                    )}
                  </>
                )}
                <IconButton
                  color="inherit"
                >
                <Badge badgeContent={cart.cartItems.length} color="secondary">                 
                  <FaShoppingCart
                    onClick={() => { navigateToCart() }}

                    className="icon-button"
                    style={{
                      fontSize: '1.2rem',
                      }}
                  />
                  </Badge>
                </IconButton>
              </Container>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
