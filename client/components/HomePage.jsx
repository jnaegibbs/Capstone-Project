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
import { PiBowlFoodFill } from "react-icons/pi";
import { GiClothes, GiToyMallet } from "react-icons/gi";
import { LuToyBrick } from "react-icons/lu";
import { GiMightySpanner } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { GiReptileTail } from "react-icons/gi";

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

const TabContainer = ({ petValue, categoryValue }) => {
  return (
    <>
      <CustomTabPanel value={categoryValue} index={0}>
        <Products petValue={petValue} categoryValue={categoryValue} />
      </CustomTabPanel>
      <CustomTabPanel value={categoryValue} index={1}>
        <Products petValue={petValue} categoryValue={categoryValue} />
      </CustomTabPanel>
      <CustomTabPanel value={categoryValue} index={2}>
        <Products petValue={petValue} categoryValue={categoryValue} />
      </CustomTabPanel>
      <CustomTabPanel value={categoryValue} index={3}>
        <Products petValue={petValue} categoryValue={categoryValue} />
      </CustomTabPanel>
      <CustomTabPanel value={categoryValue} index={4}>
        <Products petValue={petValue} categoryValue={categoryValue} />
      </CustomTabPanel>
    </>
  );
};

const HomePage = () => {
  const [petValue, setPetValue] = useState(0);
  const [categoryValue, setCategoryValue] = useState(0);

  const VerticalTab = () => {
    return (
      <>
        <StyledTabs
          orientation="vertical"
          variant="scrollable"
          value={categoryValue}
          onChange={(e, newvalue) => setCategoryValue(newvalue)}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <StyledTab
            icon={<SiPetsathome />}
            iconPosition="start"
            label="All Products"
            {...a11yProps(0)}
          />
          <StyledTab
            icon={<PiBowlFoodFill />}
            iconPosition="start"
            label="Foods"
            {...a11yProps(1)}
          />
          <StyledTab
            icon={<GiClothes />}
            iconPosition="start"
            label="Clothes"
            {...a11yProps(2)}
          />
          <StyledTab
            icon={<LuToyBrick />}
            iconPosition="start"
            label="Toys"
            {...a11yProps(3)}
          />
          <StyledTab
            icon={<GiMightySpanner />}
            iconPosition="start"
            label="Accessories"
            {...a11yProps(4)}
          />
        </StyledTabs>
      </>
    );
  };
  return (
    <>
      <StyledTabs
        value={petValue}
        onChange={(e, newvalue) => setPetValue(newvalue)}
        aria-label="pet-category"
        centered
      >
        <StyledTab
          icon={<FaDog />}
          iconPosition="start"
          label="Dog"
          {...a11yProps(0)}
        />
        <StyledTab
          icon={<FaCat />}
          iconPosition="start"
          label="Cat"
          {...a11yProps(1)}
        />
        <StyledTab
          icon={<GiReptileTail />}
          iconPosition="start"
          label="Small Pets"
          {...a11yProps(2)}
        />
      </StyledTabs>
      <Divider />
      <CustomTabPanel value={petValue} index={0}>
        <Box
          sx={{
            flexGrow: 2,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={3}>
              <Item>
                <VerticalTab />
              </Item>
            </Grid>
            <Grid item xs={13}>
              <Item>
                <TabContainer
                  petValue={petValue}
                  categoryValue={categoryValue}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={petValue} index={1}>
        <Box
          sx={{
            flexGrow: 2,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={3}>
              <Item>
                <VerticalTab />
              </Item>
            </Grid>
            <Grid item xs={13}>
              <Item>
                <TabContainer
                  petValue={petValue}
                  categoryValue={categoryValue}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={petValue} index={2}>
        <Box
          sx={{
            flexGrow: 2,
            bgcolor: "background.paper",
            display: "flex",
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={3}>
              <Item>
                <VerticalTab />
              </Item>
            </Grid>
            <Grid item xs={13}>
              <Item>
                <TabContainer
                  petValue={petValue}
                  categoryValue={categoryValue}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
    </>
  );
};

export default HomePage;
