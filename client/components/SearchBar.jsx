import { Box, InputAdornment, TextField, Toolbar } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";

const SearchBar = ({ searchProduct, setSearchProduct }) => {
  const [value, setValue] = useState("");
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: "30%",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(TextField)(({ theme }) => ({
    color: "inherit",
    "& .MuiTextField-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "50%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const handleSearchText = (e) => {
    e.preventDefault();

    setSearchProduct(e.target.value.toLowerCase());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TextField
        type="text"
        value={searchProduct}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
        placeholder="Search Products..."
        onChange={(e) => handleSearchText(e)}
        style={{
          backgroundColor: "#F3EEEA",
          borderRadius: "5%",
          width: "400px",
        }}
      />
    </Box>
  );
};

export default SearchBar;
