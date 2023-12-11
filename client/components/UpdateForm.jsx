import { useUpdateProductMutation } from "../redux/productsApi";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

const UpdateForm = () => {

    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation();
    const [product, setProduct] = useState({})
    const { productId: productId} = useParams();
    const {data, error, isLoading} = useFetchSingleProductQuery(productId)



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const result = await updateProduct({
        id: Number(productId),
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        categoryName: product.categoryName,
        petCategory: product.petCategory,
      });

      window.alert("Product succesfully updated!");

      setProduct({
        name: "",
        image: "",
        price: "",
        description: "",
        categoryName: "",
        petCategory: "",
      });
    } catch (error) {
      console.error("Error updating product", error);
    }
  }
  const styles = {
    mr: 2,
    mt: 5,
    alignItems: "center",
    fontFamily: "monospace",
    fontWeight: 900,
    fontSize: "1.5rem",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
        
  <div> 
        <>

        <Button 
        onClick={() => navigate('/admin')}
        variant="contained"
        color="primary">BACK
        </Button>

        <br /> 

        <form onSubmit={onSubmit}>
        <Box p={3} sx={{ textAlign: 'center' }}>
        <Typography sx={styles}>
        Update Product Details:
        </Typography>
        <br/>

        <TextField
        label="Enter Product Name"
        defaultValue={data.product.name}
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}>
        </TextField>

        <br/>
        <br/>
        <TextField 
        label="Enter image URL"
        defaultValue={data.product.image}
        value={product.image}
        onChange={(e) => setProduct({...product, image: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter price"
        defaultValue={data.product.price}
        value={product.price}
        onChange={(e) => setProduct({...product, price: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter categoryName"
        defaultValue={data.product.categoryName}
        value={product.categoryName}
        onChange={(e) => setProduct({...product, categoryName: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter petCategory"
        defaultValue={data.product.petCategory}
        value={product.petCategory}
        onChange={(e) => setProduct({...product, petCategory: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >Submit</Button>
        
        <br/>
        <br />
        </Box>
        </form>
        </>
</div>

  );
};

export default UpdateForm;
