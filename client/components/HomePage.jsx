import React, { useState } from "react";
import Products from "./Products";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { SiPetsathome } from "react-icons/si";

const category = ["All products", "Food", "Clothes", "Toys", "Accessories"];

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 100,
    width: "100%",
    backgroundColor: "#363062",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 900,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: "#7071E8",
    "&.Mui-selected": {
      color: "#363062",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  const [horiValue, setHoriValue] = useState(0);
  const [verticalValue, setVerticalValue] = useState(0);
  return (
    <>
      <StyledTabs
        value={horiValue}
        onChange={(e, newvalue) => setHoriValue(newvalue)}
        aria-label="pet-category"
        centered
      >
        <StyledTab label="Dog" {...a11yProps(0)} />
        <StyledTab label="Cat" {...a11yProps(1)} />
        <StyledTab label="Small Pets" {...a11yProps(2)} />
      </StyledTabs>
      <Divider />
      <CustomTabPanel value={horiValue} index={0}>
        <Box
          sx={{
            flexGrow: 2,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
              <Item>
                {" "}
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={verticalValue}
                  onChange={(e, newvalue) => setVerticalValue(newvalue)}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  <Tab label="All Products" {...a11yProps(0)} />
                  <Tab label="Foods" {...a11yProps(1)} />
                  <Tab label="Clothes" {...a11yProps(2)} />
                  <Tab label="Toys" {...a11yProps(3)} />
                  <Tab label="Accessories" {...a11yProps(4)} />
                </Tabs>
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <CustomTabPanel value={verticalValue} index={0}>
                  <Products value={horiValue} setHoriValue={setHoriValue} />
                </CustomTabPanel>
                <CustomTabPanel value={verticalValue} index={1}>
                  Item Two
                </CustomTabPanel>
                <CustomTabPanel value={verticalValue} index={2}>
                  Item Three
                </CustomTabPanel>
                <CustomTabPanel value={verticalValue} index={3}>
                  Item Four
                </CustomTabPanel>
                <CustomTabPanel value={verticalValue} index={4}>
                  Item Five
                </CustomTabPanel>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={horiValue} index={1}>
        <Products value={horiValue} setHoriValue={setHoriValue} />
      </CustomTabPanel>
      <CustomTabPanel value={horiValue} index={2}>
        <Products value={horiValue} setHoriValue={setHoriValue} />
      </CustomTabPanel>
    </>
  );
};

export default HomePage;
