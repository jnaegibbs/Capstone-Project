import React, { useState } from "react";
import { useFetchProductsQuery } from "../redux/productsApi";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Rating,
} from "@mui/material";
import theme from "./theme";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Products = ({ petValue, categoryValue }) => {
  const { data, error, isLoading } = useFetchProductsQuery();
  const [searchProduct, setSearchProduct] = useState("");
  const petMap = { 0: "dog", 1: "cat", 2: "smallPet" };
  const navigate = useNavigate();
  const categoryMap = {
    0: "all",
    1: "food",
    2: "clothes",
    3: "toy",
    4: "accessories",
  };
  const petName = petMap[petValue];
  const categoryName = categoryMap[categoryValue];
  const productData = searchProduct
    ? data &&
      data.products.filter((product) =>
        product.name.toLowerCase().includes(searchProduct)
      )
    : data &&
      data.products.filter(
        (product) =>
          product.petCategory === petName &&
          ("all" == categoryName || product.categoryName === categoryName)
      );

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SearchBar
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "50px",
        }}
        theme={theme}
      >
        {data &&
          productData.map((product) => (
            <Card
              key={product.id}
              variant="elevation"
              sx={{ width: 300, mb: 5, p: 1 }}
            >
              <CardActionArea onClick={() => navigate(`/${product.id}`)}>
                <CardMedia
                  sx={{ height: 250, objectFit: "contain" }}
                  component="img"
                  src={product.image}
                />
                <CardContent sx={{ maxHeight: 250 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.price}
                  </Typography>
                  <Rating
                    name="product-rating"
                    defaultValue={() => Math.floor(Math.random() * 5 + 3)}
                    precision={0.5}
                    size="large"
                    readOnly
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}{" "}
      </div>
    </>
  );
};

export default Products;
