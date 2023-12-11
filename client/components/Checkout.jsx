import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAddOrderMutation } from "../redux/orderApi";
import { selectCartItems, selectCartTotalAmount } from "../redux/cartSlice";
import GuestLogin from "./GuestLogin";

const Checkout = () => {
  const user = useAppSelector((state) => state.token.user);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotalAmount = useAppSelector(selectCartTotalAmount);

  const navigate = useNavigate();
  const [createOrder] = useAddOrderMutation();

  function handleOrder() {
    try {
      cartItems.map(async (order) => {
        const { data } = await createOrder({
          productId: order.id,
          quantity: order.cartQuantity,
          userId: user.id,
        });
      });

      navigate(`/confirmPage`);
    } catch (e) {
      console.log(e);
    }
  }

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
      {user === null ? (
        <GuestLogin />
      ) : (
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
            Shipping Address
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
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            Review Item
          </Typography>
          <br />
          <br />
          <TableContainer sx={{ minWidth: 800, m: "0 20%" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Product Details
                  </TableCell>
                  <TableCell align="center" colSpan={1}>
                    Price
                  </TableCell>
                  <TableCell align="right" colSpan={1}>
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems &&
                  cartItems.map((cartItem) => {
                    return (
                      <TableRow key={cartItem.id}>
                        <TableCell>
                          {" "}
                          <Avatar
                            src={cartItem.image}
                            sizes="large"
                            variant="square"
                          />{" "}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {cartItem.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6">
                            {cartItem.price}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">
                            x {cartItem.cartQuantity}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Total Price</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="h6">${cartTotalAmount}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#7071E8", padding: "8px 10px", m: "5% 20%" }}
            onClick={() => handleOrder()}
          >
            Place your Order
          </Button>

          <br />
        </Paper>
      )}
    </div>
  );
};

export default Checkout;
