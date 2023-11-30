import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Checkout = () => {
  const user = useAppSelector((state) => state.token.user);
  console.log(user);

   const navigate = useNavigate();

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
  const bodyStyle = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 500,
    fontSize: "medium",
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
    <div>
      {/*user !== null ? ( */}
        <Paper elevation={0} sx={styles2}>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Contact
          </Typography>
          <br />

          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].email}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].phoneNumber}
          </Typography>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Delivery
          </Typography>
          <br />
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].name}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {user.profile[0].address}
          </Typography>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Payment
          </Typography>
          <br/>
          <br/>
           <br/>
          <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#7071E8", padding: "8px 10px" }}
              onClick={()=>navigate('/confirmPage')}
            >
             Place your Order
            </Button>
          <br />
        </Paper>  
      </div>
      );
    };

export default Checkout;
