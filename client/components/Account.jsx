import React from "react";
import { useAppSelector } from "../hooks";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Stack, Typography, Button } from "@mui/material";
import Login from "./Login";
import { useState } from "react";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useNavigate } from "react-router-dom";

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

const styles2 = {
  width: 500,
  maxWidth: "100%",
  paddingLeft: 10,
};

const OrderHistory = ({ productId }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchSingleProductQuery(productId);
  console.log("product data ---" + data);

  return (
    <Paper elevation={1} sx={{width:'80%',m:'1% 5%',padding:'20px'}}>
    
      <br/>
      {data && (
        
        <Stack direction="row" spacing={2}>
         
          <Box sx={styles2}>
            <img src={data.product.image} width="100px" height="100px" />
          </Box>
      
          <Box sx={styles2}>
            <Typography variant="h6">{data.product.name}</Typography>
          </Box>
          <Box sx={styles2}><Typography variant="h6">{data.product.price}</Typography></Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/review/${productId}`);
              }}
            >
              Review
            </Button>
          </Box>
        </Stack>
      )}
      <br/>
     
    </Paper>
  );
};

const Account = () => {
  const user = useAppSelector((state) => state.token.user);
  const [order, setOrder] = useState(user!== null ? [user.order]:null);

  // if(user !== (null && undefined)){
  //   console.log(user.order)
  //   setOrder(user.order)
  // }

  console.log("user:", user);
  console.log("order:", order);

  return (
    <>
      {user !== (null && undefined) ? (
        <div>
          <br />
          <br />
          <Typography sx={styles}>BASIC INFORMATION</Typography>
          <br />
          <br />
          <Box sx={styles2}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={user.profile[0].name}
            />
          </Box>
          <br />

          <Box sx={styles2}>
            <TextField
              fullWidth
              label="Username"
              defaultValue={user.username}
            />
          </Box>
          <br />

          <Box sx={styles2}>
            <TextField
              fullWidth
              label="Email"
              defaultValue={user.profile[0].email}
            />
          </Box>
          <br />

          <Box sx={styles2}>
            <TextField
              fullWidth
              label="Phone Number"
              defaultValue={user.profile[0].phoneNumber}
            />
          </Box>
          <br />

          <Box sx={styles2}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={user.profile[0].address}
            />
          </Box>
          <br />
          <br />
          <Box>
            <Typography sx={styles}> ORDER HISTORY</Typography>
          </Box>
          <br />
          <br />
          {order[0].map((order) => {
            return <div key={order.productId}><OrderHistory productId={order.productId} /></div>;
          })}
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
};

export default Account;
export {OrderHistory}
