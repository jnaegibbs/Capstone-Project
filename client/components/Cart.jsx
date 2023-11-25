import React from "react";
import { useFetchCartQuery } from "../redux/cartApi";




const Cart = () => {

const {data} = useFetchCartQuery();


return (
    <>
      <h1>Your Shopping Cart:</h1>
      {data && data.map((cart) => 
        <h2 key={cart.id}>{cart.id}</h2>
      )}
    </>
  );
}

export default Cart