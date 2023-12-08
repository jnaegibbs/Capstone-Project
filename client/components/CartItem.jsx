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
} from "../redux/cartSlice";
import { Typography,Button } from "@mui/material";
import { useEffect } from "react";
import { selectUser } from "../redux/tokenSlice";
import { useFetchCartItemByUserCartQuery,useDeleteAllCartItemMutation } from "../redux/cartItemApi";

const GetUserCart = () => {
    const user = useSelector(selectUser);
    if(user){
        const {data} = useFetchCartItemByUserCartQuery(user.cart[0].id);
        console.log(data)
    }
    
//   useEffect(() => {
//     async function getUserCartItem() {
//       if (user) {
//         console.log(user.cart[0].id);
//         const { data } = await getItem(user.cart[0].id);

//         console.log(data);
//         if (data) dispatch(addCartItem(data));
//       }
//     }
//     getUserCartItem();
//   }, []);

  return(
    <>
    </>
  )
};

const CartItem = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const [deleteCartItem] = useDeleteAllCartItemMutation()
  console.log("cartItem   " + cartItems);
  console.log("cartTotal  " + cartTotalAmount);
  console.log("cartquantity  " + cartQuantity);


  const increaseHandle = (cart) => {
    dispatch(addCartItem(cart));
  };

  const decreaseHandle = (cart) => {
    dispatch(decreaseQuantity(cart));
  };

 const clearItemFromCart = async () => {
    dispatch(clearCart());
    const {data} = await deleteCartItem(user.cart[0].id)
    console.log(data);
  };

  const removeItem = (cart) => {
    dispatch(removeItemFromCart(cart));
    
  };

//   useEffect(() => {
//     const handleTotalQuantity = () => {
//       dispatch(calculateQuantity());
//     };

//     const handleTotalAmount = () => {
//       dispatch(calculateSubtotal());
//     };
//     handleTotalAmount();
//     handleTotalQuantity();
//   }, [cartItems]);

  return (
    <>
      <Typography>Shopping cart</Typography>
      {/* <GetUserCart/> */}
      {cartItems.length === 0 ? (
        <Typography>Your Cart is empty.</Typography>
      ) : (
        cartItems.map((item) => {
          return <Typography>{item.name}</Typography>;
        })
      )}
      <Button onClick={()=>clearItemFromCart()}>clear</Button>
    </>
  );
};
export default CartItem;
