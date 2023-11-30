import React from "react";
import {
    Typography,
    Paper,
    Card,
    CardContent,
    CardMedia,
    Button
} from "@mui/material";
import {
  useFetchCartByUserQuery,
  useFetchCartByIdQuery,
} from "../redux/cartApi";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useAppSelector } from "../hooks";

const Cart = () => {
    const user = useSelector((state) => state.token.user);
    const { data: userCartData, error: userCartError, isLoading: userCartLoading } = useFetchCartByUserQuery(user.id);

    const { data: cartByIdData, error: cartByIdError, isLoading: cartByIdLoading } = useFetchCartByIdQuery(userCartData?.cart?.id || null);

    if (userCartLoading || cartByIdLoading) {
        return <p>Loading...</p>;
    }

    if (userCartError || cartByIdError) {
        return <p>Error: {userCartError?.message || cartByIdError?.message}</p>;
    }

    const cartId = userCartData?.cart?.id;

    console.log('CartId:', cartId);
    console.log('CartData:', cartByIdData);



    return (
        <>
            <Paper elevation={0} sx={{ width: "80%", m: "2% 10%" }}>
                <div>
                    <Typography
                        fontFamily="monospace"
                        variant="h4"
                        sx={{ m: 5, alignContent: "center" }}
                    >
                        Your Shopping Cart Items:
                    </Typography>
                    {cartByIdData?.cart && (
                        <div key={cartByIdData.cart.id}>

                            {cartByIdData.cart.cartItem.map((item) => (

                                <Card variant="elevation" sx={{ width: 850, mb: 5, p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(240, 240, 240, 0.8)' }}>
                                    <ProductDetails productId={item.productId} />

                                    <CardContent sx={{ maxHeight: 200 }}>

                                        <Button
                                            variant="contained"
                                            sx={{ bgcolor: "#7071E8", padding: 1.5, width: 100 }}
                                            size="large"
                                        >
                                            +
                                        </Button>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <p>Quantity: {item.quantity}</p>
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{ bgcolor: "#7071E8", padding: 1.5, width: 100 }}
                                            size="large"
                                        >
                                            -
                                        </Button>

                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </Paper>
        </>
    );

}

const ProductDetails = ({ productId }) => {
    const { data: productData, error: productError, isLoading: productLoading } = useFetchSingleProductQuery(productId);

    if (productLoading) {
        return <p>Loading product details...</p>;
    }

    if (productError) {
        return <p>Error fetching product details: {productError.message}</p>;
    }

    const product = productData.product;

    return (
        <div>
            <Card variant="elevation" sx={{ display: 'flex', width: 300}}>
              
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxHeight: 200, p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        <p>{product.name}</p>
                        {/* Add more details as needed */}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    alt="Product Image"
                    height="auto"
                    sx={{ height: '35%', width: '35%', display: 'block', margin: 'auto' }}  // Adjust these values as needed
                    image={product.image}
                />
            </Card>
        </div>
    );
};
