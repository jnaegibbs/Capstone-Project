import { useNewProductMutation } from "../redux/productsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";


const NewProductForm = () => {
    const navigate = useNavigate();
    const [CreateNewProduct] = useNewProductMutation();


    const [product, setProduct] = useState({
        id: "",
        name: "",
        image: "",
        price: "",
        description: "",
        categoryName: "",
        petCategory: "",
    });


async function onSubmit(e) {
    e.preventDefault();
      
   try {
     const result = await CreateNewProduct({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        categoryName: product.categoryName,
        petCategory: product.petCategory
    });
        console.log("New product created:", result)
        window.alert("New product succesfully created!")

        setProduct({
            name: "",
            image: "",
            price: "",
            description: "",
            categoryName: "",
            petCategory: "",
          });

        
    }catch(error){
        console.error("Error creating inventory", error)
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
        <>
        
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
        Create New Product:
        </Typography>
        <br/>

        <TextField
        label="Enter Product Name"
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value})}>
        </TextField>

        <br/>
        <br/>
        <TextField 
        label="Enter image URL"
        value={product.image}
        onChange={(e) => setProduct({...product, image: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter price"
        value={product.price}
        onChange={(e) => setProduct({...product, price: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter categoryName"
        value={product.categoryName}
        onChange={(e) => setProduct({...product, categoryName: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <TextField 
        label="Enter petCategory"
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



        </>
    )

}




export default NewProductForm 