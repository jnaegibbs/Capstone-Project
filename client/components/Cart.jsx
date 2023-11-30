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
import { useUpdateCartItemMutation } from "../redux/cartItemApi";
import { useSelector } from "react-redux";

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
            <Card variant="elevation" sx={{ display: 'flex', width: 300 }}>
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
                    sx={{ height: '35%', width: '35%', display: 'block', margin: 'auto' }}
                    image={product.image}
                />
            </Card>
        </div>
    );
};

const Cart = () => {
    const user = useSelector((state) => state.token.user);
    const { data: userCartData, error: userCartError, isLoading: userCartLoading } = useFetchCartByUserQuery(user.id);

    const { data: cartByIdData, error: cartByIdError, isLoading: cartByIdLoading } = useFetchCartByIdQuery(userCartData?.cart?.id || null);

    const [increaseQuantity] = useUpdateCartItemMutation();
    const [decreaseQuantity] = useUpdateCartItemMutation();

    const handleIncreaseQuantity = async () => {
        try {


            const response = await increaseQuantity({
                cartItemId: userCartData.cart.cartItem[0].id,
                updatedCartItem: {
                    quantity: userCartData.cart.cartItem[0].quantity + 1,
                },
            }).unwrap();

            console.log('Item quantity updated in cart:', response);

            window.location.reload();
        } catch (error) {
            console.error('Error updating item quantity in cart:', error);
        }
    };

    const handleDecreaseQuantity = async () => {
        try {


            const response = await decreaseQuantity({
                cartItemId: userCartData.cart.cartItem[0].id,
                updatedCartItem: {
                    quantity: userCartData.cart.cartItem[0].quantity - 1,
                },
            }).unwrap();

            console.log('Item quantity updated in cart:', response);

            window.location.reload();
        } catch (error) {
            console.error('Error updating item quantity in cart:', error);
        }
    };

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
                                <Card key={item.id} variant="elevation" sx={{ width: 850, mb: 5, p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(240, 240, 240, 0.8)' }}>
                                    <ProductDetails productId={item.productId} />
                                    <CardContent sx={{ maxHeight: 200 }}>
                                        <Button
                                            variant="contained"
                                            sx={{ bgcolor: "#7071E8", padding: 1.5, width: 100 }}
                                            size="large"
                                            onClick={handleIncreaseQuantity}
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
                                            onClick={handleDecreaseQuantity}
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
};

export default Cart;
