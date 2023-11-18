import {
  Typography,
  Container,
  Toolbar,
  IconButton,
  Box
} from "@mui/material";
import React from "react";
import AppBar from "@mui/material/AppBar";
import { FaPaw } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import theme from "./theme";

const NavBar = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
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
                  style={{ marginLeft: "50%" }}
                  sx={styles}
                  onClick={()=>{
                    dispatch(setToken({token:null}))
                  }}
                >
                  Logout
                </Typography>
              )}
              <Typography
                className="button"
                variant="h6"
                noWrap
                component="a"
                href="/orders"
                sx={styles}
              >
                Orders
              </Typography>

              <IconButton color="inherit" size="large">
                <FaShoppingCart
                  onClick={() => navigate("/cart")}
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
