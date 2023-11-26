import React from "react";
import { useFetchCartByUserQuery } from "../redux/cartApi";
import { useSelector } from "react-redux";




const Cart = () => {
    const user = useSelector((state) => state.token.user);
    const { data, error, isLoading } = useFetchCartByUserQuery(user.id);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }



    return (
        <>
            <h1>Your Shopping Cart:</h1>
            {data?.userCart?.map((cart) => (
                <div key={cart.id}>
                    <h2>Cart ID: {cart.id}</h2>
                    <p>User ID: {cart.userId}</p>
                    <h3>Cart Items:</h3>
                    {cart.cartItem.map((item) => (
                        <div key={item.id}>
                            <p>Product ID: {item.productId}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default Cart