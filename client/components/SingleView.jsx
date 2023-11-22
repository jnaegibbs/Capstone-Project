import {
  Card,
  Typography,
  CardMedia,
  Paper,
  Stack,
  Button,
  Rating,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useParams, useNavigate } from "react-router-dom";

import { useState } from "react";

const SingleView = () => {
  const { productId: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { data = {}, error, isLoading } = useFetchSingleProductQuery(productId);

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
            <img
              src={data.product.image}
              width="90%"
              height="70%"
              padding="4% 0"
            />
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
                  defaultValue={4}
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
                  size="medium"
                >
                  Add to cart
                </Button>
              </Typography>
              <Typography>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#7071E8", padding: 2, width: 300 }}
                  size="medium"
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
    </Paper>
  );
};

export default SingleView;
