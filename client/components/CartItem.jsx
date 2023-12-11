import { useSelector, useDispatch } from "react-redux";
import {
  addCartItem,
  calculateQuantity,
  calculateSubtotal,
  clearCart,
  removeItemFromCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import {
  Typography,
  Button,
  Stack,
  Paper,
  Avatar,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { selectUser } from "../redux/tokenSlice";
import { useDeleteAllCartItemMutation } from "../redux/cartItemApi";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const [deleteCartItem] = useDeleteAllCartItemMutation();
  const [quantity,setQuantity] = useState(1)
  const navigate = useNavigate();
  const increaseHandle = (cart) => {
    dispatch(addCartItem(cart));
  };

  const decreaseHandle = (cart) => {
    if(cart.cartQuantity > 1) dispatch(decreaseQuantity(cart));
  };

  const clearItemFromCart = async () => {
    dispatch(clearCart());
    const { data } = await deleteCartItem(user.cart[0].id);
  };

  const removeItem = (cart) => {
    dispatch(removeItemFromCart(cart));
  };

    useEffect(() => {
      const handleTotalQuantity = () => {
        dispatch(calculateQuantity());
      };

      const handleTotalAmount = () => {
        dispatch(calculateSubtotal());
      };
      handleTotalAmount();
      handleTotalQuantity();
    }, [dispatch,cartItems]);

  return (
    <>
      <Button size="medium" variant='contained' onClick={() => navigate("/")} sx={{ m: "2%",bgcolor: "#7071E8" }} >
        continue shopping
      </Button>

      <Typography
        fontFamily="monospace"
        variant="h4"
        sx={{ m: 5, alignContent: "center" }}
      >
        Your Shopping Cart Items:
      </Typography>

      {cartItems.length === 0 ? (
        <Typography  fontFamily="monospace"
        variant="h6"
        sx={{ m: 5, alignContent: "center" }}>Your Cart is empty.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{m:'2% 10%',width:'80%'}}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                      {" "}
                      Product Details
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                      Price
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                    
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Avatar
                          src={item.image}
                          variant="square"
                          sx={{
                            width: "50px",
                            height: "100px",
                            aspectRatio: "1/1",
                            m: "0 30px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Typography variant="body1">{item.name}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body1" >
                          {item.price}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ alignItems: "right" }}
                        >
                         <IconButton onClick={()=>increaseHandle(item)}><AddCircleIcon size='large' variant='filled'/></IconButton>
                          <Typography variant="h6">
                           {item.cartQuantity}
                          </Typography>
                          <IconButton onClick={()=>decreaseHandle(item)}><RemoveCircleIcon size='large' variant='filled'/></IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                       <Typography> $ {Number(item.price.substring(1)) * Number(item.cartQuantity)}</Typography>
                      </TableCell>
                      <TableCell><IconButton size="large" sx={{color:'red'}} onClick={()=>removeItem(item)}><DeleteIcon/></IconButton></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4} align="right"><Typography variant="h5" sx={{fontFamily:'monospace'}}>SubTotal</Typography></TableCell>
                  <TableCell><Typography variant="h5">$ {cartTotalAmount}</Typography></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={() => clearItemFromCart()} variant= 'contained' sx={{ m: "2% 10%",bgcolor: "#C70039"}}>Clear Cart</Button>
          <Button onClick={()=>navigate('/checkout')} variant= 'contained' sx={{ m: "2% 10%",bgcolor: "#7071E8",float:'right'}}>Proceed to Checkout</Button>
        
         
        </>
      )}
     
    </>
  );
};
export default CartItem;
