import {
  Typography,
  Container,
  Toolbar,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import { FaPaw } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFC7C7',
      main: '#7071E8',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});



const NavBar = () => {
 
  
  const color = deepPurple[100];
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.token);
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

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="sticky" theme={theme}>
          <Container fixed >
            <Toolbar>
              <IconButton color="inherit" size="large" >
                <FaPaw onClick={() => navigate("/")} className="icon-button"/>
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
                  href="/login"
                  style={{ marginLeft: "50%" }}
                  sx={styles}
                >
                  SignUp
                </Typography>
              ) : (
                <Typography
                  className="button"
                  variant="h6"
                  noWrap
                  component="a"
                  href="/logout"
                  style={{ marginLeft: "50%" }}
                  sx={styles}
                >
                  Logout
                </Typography>
              )}
              <Typography
              className="button"
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles}
              >
                Orders
              </Typography>

              <IconButton color="inherit" size="large">
                <FaShoppingCart onClick={() => navigate("/cart")} className="icon-button" />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
