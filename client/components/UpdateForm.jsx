import { useUpdateInventoryMutation } from "../redux/inventoryApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";


const InventoryForm = () => {
    const navigate = useNavigate();
    const [updateInventory] = useUpdateInventoryMutation();
    const [inventory, setInventory] = useState({
        productId: "",
        quantity: "",
        product: {
          name: "",
          petCategory: "",
          categoryName: "",
        },
      });


 
async function onSubmit(e) {
    e.preventDefault();

    try {

        const result = await updateInventory(
            inventory.productId, 
            inventory.quantity, 
            inventory.product.name, 
            inventory.product.petCategory, 
            inventory.product.categoryName
            )
        console.log("Inventory updated", result)
        window.alert("Inventory succesfully updated!")
        
    }catch(error){
        console.error("Error updating inventory", error)
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
        UPDATE INVENTORY DETAILS 
        </Typography>
        <br/>
        <TextField
        label="Enter ProductID"
        value={inventory.productId}
        onChange={(e) => setInventory({...inventory, productId: e.target.value})}>
        </TextField>

        <br/>
        <br/>
        <TextField 
        label="Enter Quantity"
        value={inventory.quantity}
        onChange={(e) => setInventory({ ...inventory, quantity: e.target.value })}>
        </TextField>

        <br /> 
        <br />

        <TextField
        label="Enter Product Name"
        value={inventory.product.name}
        onChange={(e) =>   setInventory({
            ...inventory,
            product: { ...inventory.product, name: e.target.value },
          })}>
        </TextField>

        <br/>
        <br/>

        <TextField
        label="Enter Category Name"
        value={inventory.product.categoryName}
        onChange={(e) =>   setInventory({
            ...inventory,
            product: { ...inventory.product, categoryName: e.target.value },
          })}>
        </TextField>

        <br/>
        <br/>

        <TextField
        label="Enter Pet Category"
        value={inventory.product.petCategory}
        onChange={(e) =>   setInventory({
            ...inventory,
            product: { ...inventory.product, petCategory: e.target.value },
          })}>
        </TextField>

        <br/>
        <br/>

        <Button onClick={onSubmit}
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




export default InventoryForm 