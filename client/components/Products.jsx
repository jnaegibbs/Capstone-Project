import React, { useState } from "react";
import { useFetchProductsQuery } from "../redux/productsApi";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const Products = ({ value, setvalue }) => {
  const { data, error, isLoading } = useFetchProductsQuery();
  console.log("Data:", data); // Log the data to the console

  const map = { 0: "dog", 1: "cat" };
  const category = map[value];
  const dogCategory =
    data && data.products.filter((product) => product.petCategory === category);
  console.log(dogCategory);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "50px",
        }}
      >
        {data &&
          dogCategory.map((product) => (
            <Card  variant="elevation" sx={{ width:300, mb:5,p:1}}>
              <CardMedia sx={{ height: 250 }} image={product.image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add cart</Button>
                <Button size="small">See review</Button>
              </CardActions>
            </Card>
          ))}{" "}
      </div>
    </>
  );
};

export default Products;
