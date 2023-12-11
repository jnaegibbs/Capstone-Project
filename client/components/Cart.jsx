import React from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import {
  useFetchCartByUserQuery,
  useFetchCartByIdQuery,
} from "../redux/cartApi";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import {
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} from "../redux/cartItemApi";
import { useAppSelector } from "../hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const total = [];

const ProductDetails = ({ productId, quantity }) => {
  const {
    data: productData,
    error: productError,
    isLoading: productLoading,
  } = useFetchSingleProductQuery(productId);
  if (productData) {
    total.push(Number(productData.product.price.substring(1)) * quantity);
  }
  if (productLoading) {
    return <p>Loading product details...</p>;
  }

  if (productError) {
    return <p>Error fetching product details: {productError.message}</p>;
  }

  const product = productData.product;

  return (
    <div>
      <Card
        variant="elevation"
        sx={{ display: "flex", width: 300, height: 200 }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxHeight: 200,
            p: 2,
          }}
        >
          <Typography gutterBottom variant="body1" component="div">
            <p>{product.name}</p>
            {/* Add more details as needed */}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Product Image"
          height="auto"
          sx={{ height: "35%", width: "35%", display: "block", margin: "auto" }}
          image={product.image}
        />
      </Card>
    </div>
  );
};

const Cart = () => {
  const user = useAppSelector((state) => state.token.user);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

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

  const [increaseQuantity] = useUpdateCartItemMutation();
  const [decreaseQuantity] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleDeleteItem = async (cartItemId) => {
    try {
      const response = await deleteCartItem(cartItemId).unwrap();
      setIsUpdated(true);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (cartItemId) => {
    try {
      const response = await increaseQuantity({
        cartItemId,
        updatedCartItem: {
          quantity:
            userCartData.cart.cartItem.find((item) => item.id === cartItemId)
              .quantity + 1,
        },
      }).unwrap();

      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  const handleDecreaseQuantity = async (cartItemId) => {
    try {
      const response = await decreaseQuantity({
        cartItemId,
        updatedCartItem: {
          quantity:
            userCartData.cart.cartItem.find((item) => item.id === cartItemId)
              .quantity - 1,
        },
      }).unwrap();

      setIsUpdated(true);
    } catch (error) {
      console.error("Error updating item quantity in cart:", error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      window.location.reload();
    }
  }, [isUpdated]);

  return (
    <>
      <Paper elevation={0} sx={{ width: "80%", m: "2% 10%" }}>
        <Button size="medium" onClick={() => navigate("/")}>
          continue shopping
        </Button>
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
                <Card
                  key={item.id}
                  variant="elevation"
                  sx={{
                    width: 850,
                    mb: 5,
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(240, 240, 240, 0.8)",
                  }}
                >
                  <ProductDetails
                    productId={item.productId}
                    quantity={item.quantity}
                  />
                  <CardContent sx={{ maxHeight: 200 }}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#4CAF50", padding: 0.5, width: 45 }}
                      size="large"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#FF5733",
                        padding: 0.5,
                        width: 45,
                        marginLeft: 0.5,
                      }}
                      size="large"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ margin: "10px 0" }}
                    >
                      Quantity: {item.quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#7071E8", padding: 1, width: 120 }}
                      size="medium"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Remove Item
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <div>
                {cartByIdData.cart.cartItem.length >= 1 ? (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#7071E8",
                      padding: 1,
                      width: 300,
                      m: "0 25%",
                    }}
                    size="medium"
                    onClick={() =>
                      navigate(`/checkout/${total.reduce((s, c) => s + c)}`)
                    }
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      padding: 1,
                      width: 300,
                      m: "0 25%",
                    }}
                  >
                    No item found
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default Cart;
