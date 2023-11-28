import React from "react";
import {
  useFetchCartByUserQuery,
  useFetchCartByIdQuery,
} from "../redux/cartApi";
import { useAppSelector } from "../hooks";

const Cart = () => {
  const user = useSelector((state) => state.token.user);
  const {
    data: userCartData,
    error: userCartError,
    isLoading: userCartLoading,
  } = useFetchCartByUserQuery(user.id);

  const {
    data: cartByIdData,
    error: cartByIdError,
    isLoading: cartByIdLoading,
  } = useFetchCartByIdQuery(userCartData?.cart?.id || null);

  if (userCartLoading || cartByIdLoading) {
    return <p>Loading...</p>;
  }

  if (userCartError || cartByIdError) {
    return <p>Error: {userCartError?.message || cartByIdError?.message}</p>;
  }

  const cartId = userCartData?.cart?.id;

  console.log("CartId:", cartId);
  console.log("CartData:", cartByIdData);

  return (
    <>
      <div>
        <h1>Your Shopping Cart Details:</h1>
        {cartByIdData?.cart && (
          <div key={cartByIdData.cart.id}>
            <p>Cart ID: {cartByIdData.cart.id}</p>
            <p>User ID: {cartByIdData.cart.userId}</p>
            <p>Cart Status: {cartByIdData.cart.cartStatus}</p>
            <h3>Cart Items:</h3>
            {cartByIdData.cart.cartItem.map((item) => (
              <div key={item.id}>
                <p>Item ID: {item.id}</p>
                <p>Added At: {item.itemAddedAt}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Product ID: {item.productId}</p>
                <p>Cart ID: {item.cartId}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
