import React, { useState } from "react";
import { useFetchProductsQuery } from "../redux/productsApi";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import theme from "./theme";
import SearchBar from "./SearchBar";

const Products = ({ petValue, categoryValue }) => {
  const { data, error, isLoading } = useFetchProductsQuery();
  const [searchProduct,setSearchProduct] = useState('');
  const petMap = { 0: "dog", 1: "cat" };
  const categoryMap = {
    0: "all",
    1: "food",
    2: "clothes",
    3: "toy",
    4: "accessories",
  };
  const petName = petMap[petValue];
  const categoryName = categoryMap[categoryValue];
  const productData =
   searchProduct
  ? data && data.products.filter((product)=> product.name.toLowerCase().includes(searchProduct))
  :data &&
    data.products.filter(
      (product) =>
        product.petCategory === petName && ("all" == categoryName || product.categoryName === categoryName)
    );
 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SearchBar searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
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
            <Card variant="elevation" sx={{ width: 300, mb: 5, p: 1 }}>
              <CardMedia sx={{ height: 250 }} image={product.image} />
              <CardContent sx={{maxHeight:250}}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{m:'5% 10% '}} >
                <Button variant='contained'sx={{bgcolor:'#7071E8',padding:1}} size="small">Add cart</Button>
                <Button variant='outlined' sx={{color:'#7071E8',borderColor:'#7071E8'}} size="small">See review</Button>
              </CardActions>
            </Card>
          ))}{" "}
      </div>
    </>
  );
};

export default Products;
