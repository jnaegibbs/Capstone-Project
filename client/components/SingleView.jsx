import {
  Typography,
  Paper,
  Stack,
  Button,
  Rating,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCreateCartItemMutation } from "../redux/cartItemApi";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useGetSingleUserQuery } from "../redux/authApi";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { FaMagnifyingGlassMinus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";
import { addCartItem } from "../redux/cartSlice";




const SingleView = () => {
  const { productId: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const user = useAppSelector((state) => state.token.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createCartItem] = useCreateCartItemMutation();

  const { data = {}, error, isLoading } = useFetchSingleProductQuery(productId);
  console.log(data);

  const handleAddToCart = async () => {
    try {
      // Check if productId, quantity are available
      if (!productId || !quantity) {
        console.error("Product or quanitity is missing.");
        return;
      }
      if (!user) {
        // Redirect to guest login page if not logged in
        navigate("/guestlogin");
        return;
      }

      //   // Make the API call to add the item to the cart
      const response = await createCartItem({
        productId: productId,
        quantity: quantity,
        cartId: user.cart[0].id,
      }).unwrap();

      dispatch(addCartItem(response));

      //   // Handle success, e.g., show a success message or update UI
      console.log("Item added to cart:", response);

      // Optionally reset the quantity after adding to the cart
      setQuantity(1);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding item to cart:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: theme.palette.text.secondary,
  }));

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <>
        <br />
        <br />
        <IconButton variant="contained" onClick={() => zoomIn()}>
          <FaMagnifyingGlassPlus />
        </IconButton>{" "}
        <IconButton variant="contained" onClick={() => zoomOut()}>
          <FaMagnifyingGlassMinus />
        </IconButton>{" "}
        <IconButton variant="contained" onClick={() => resetTransform()}>
          <GrPowerReset />
        </IconButton>{" "}
      </>
    );
  };

  const handleBuyNow = async () => {
    try {
      if (!productId || !quantity) {
        console.error("Product or quanitity is missing.");
        return;
      }
      if (!user) {
        navigate("/guestlogin");
        return;
      }
      const response = await createCartItem({
        productId: productId,
        quantity: quantity,
        cartId: user.cart[0].id,
      }).unwrap();

      dispatch(addCartItem(response));

      //   // Handle success, e.g., show a success message or update UI
      console.log("Item added to cart from buy now:", response);

      // Optionally reset the quantity after adding to the cart
      setQuantity(1);
      navigate("/checkout");
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <Paper elevation={0} sx={{ width: "80%", m: "2% 10%" }}>
      <Button onClick={() => navigate("/")} sx={{ m: 2 }}>
        Back to results
      </Button>
      <Typography
        fontFamily="monospace"
        variant="h4"
        sx={{ m: 5, alignContent: "center" }}
      >
        Product Details
      </Typography>

      {data && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="left"
          spacing={2}
        >
          <Item>
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={data.product.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "hidden",
                    aspectRatio: "3/2 auto",
                    margin: "20% 0",
                  }}
                />
              </TransformComponent>
              <div>
                {" "}
                <Controls />
              </div>
            </TransformWrapper>
          </Item>
          <Item>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="left"
              spacing={4}
              sx={{ m: 5, p: 5 }}
            >
              <Typography gutterBottom variant="h4" component="div">
                {data.product.name}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                Price : {data.product.price}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {data.product.description} {data.product.description}
              </Typography>

              <Typography>
                <Rating
                  name="product-rating"
                  defaultValue={() => Math.floor(Math.random() * 5) + 3}
                  precision={0.5}
                  size="large"
                  readOnly
                />
              </Typography>
              <Typography>
                <Typography variant="body1" sx={{ color: "green" }}>
                  In Stock
                </Typography>
                <FormControl variant="filled" sx={{ width: 300 }}>
                  <InputLabel id="quantity">Quantity</InputLabel>
                  <Select
                    labelId="product-quantity"
                    id="product-quantity"
                    value={quantity}
                    label="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{ width: 300 }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
              <Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#7071E8", padding: 2, width: 300 }}
                  size="large"
                  onClick={() => handleAddToCart()}
                >
                  Add to cart
                </Button>
              </Typography>
              <Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#7071E8", padding: 2, width: 300 }}
                  size="large"
                  onClick={() => handleBuyNow()}
                >
                  Buy Now
                </Button>
              </Typography>
            </Stack>
          </Item>
        </Stack>
      )}
      <Typography
        fontFamily="monospace"
        variant="h5"
        sx={{ m: 5, alignContent: "center" }}
      >
        Product Reviews
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="left"
        spacing={2}
      >
        {data.product.review && data.product.review.length >= 1 ? (
          data.product.review.map((review) => {
            return (
              <div key={review.id}>
                <Paper sx={{padding:'30px'}}>
                  <ReviewContent userId={review.userId} />
                  <Rating readOnly size="large" value={review.rating} />
                  <Typography>{review.content}</Typography>
                </Paper>
              </div>
            );
          })
        ) : (
          <Typography variant="h4">No Review Found</Typography>
        )}
      </Stack>
    </Paper>
  );
};

const ReviewContent = ({ userId }) => {
  console.log(userId);
  const { data , error, isLoading } = useGetSingleUserQuery(userId);
  console.log(data);
  return (
    <>
      {data && (
        <Stack sx={{padding:' 10px 30px'}} direction="row">
          <Avatar >{data.user.profile[0].name.charAt(0)}</Avatar>
          <Typography variant="body1" sx={{padding:'10px'}}>{data.user.profile[0].name}</Typography>
        </Stack>
      )}
    </>
  );
};

export default SingleView;

