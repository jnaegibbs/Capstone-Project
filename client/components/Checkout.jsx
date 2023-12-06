import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useFetchCartByIdQuery } from "../redux/cartApi";
import { useFetchSingleProductQuery } from "../redux/productsApi";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAddOrderMutation } from "../redux/orderApi";


const Product = ({ productId, quantity }) => {
  const { data } = useFetchSingleProductQuery(productId);

  return (
    <>
      {data && (
        <>
          <TableCell>
            {" "}
            <Avatar
              src={data.product.image}
              sizes="large"
              variant="square"
            />{" "}
          </TableCell>
          <TableCell>
            <Typography variant="body1">{data.product.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">{data.product.price} </Typography>
          </TableCell>
        </>
      )}
    </>
  );
};

const Checkout = () => {
  const user = useAppSelector((state) => state.token.user);
  const [cart, setCart] = useState(user !== null ? user.cart : null);
  const { data } = useFetchCartByIdQuery(cart[0].id);
  const navigate = useNavigate();
  const [createOrder] = useAddOrderMutation();

 
 function handleOrder() {
    let noOfOrder = data.cart.cartItem.length;

    try {
      data.cart.cartItem.map(async (order) => {
        const { data } =  await createOrder({
          productId: order.productId,
          quantity: order.quantity,
          userId: user.id,
        });
       
      });

       navigate(`/confirmPage/${noOfOrder}`);
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
        <TableContainer sx={{ minWidth: 700, m: "0 20%" }} component={Paper}>
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
              {data &&
                data.cart.cartItem.map((cartItem) => {
                  return (
                    <TableRow key={cartItem.id}>
                      <Product
                        productId={cartItem.productId}
                        quantity={cartItem.quantity}
                      />

                      <TableCell>
                        <Typography variant="body1">
                          {cartItem.quantity}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={1}>Subtotal</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#7071E8", padding: "8px 10px" }}
          onClick={() => handleOrder()}
        >
          Place your Order
        </Button>

        <br />
      </Paper>
    </div>
  );
};

export default Checkout;
export { Product };
