import React from "react";
import { useSelector } from 'react-redux' 
import { useState } from "react";

import {useGetInventoryQuery} from "../redux/inventoryApi";
import { useDeleteInventoryMutation } from "../redux/inventoryApi";
import {useAddInventoryMutation} from "../redux/inventoryApi";
import { useUpdateInventoryMutation} from "../redux/inventoryApi";

import SearchBar from "./SearchBar";

import {Typography, Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { DataGrid } from '@mui/x-data-grid';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';


const Admin = () => {
    const { data, error, isLoading } = useGetInventoryQuery();
    const [DeleteInventory] = useDeleteInventoryMutation()
    const [CreateInventory] = useAddInventoryMutation();
    const [UpdateInventory] =  useUpdateInventoryMutation();
    const user = useSelector((state) => state.token.user);
    console.log("user details:", user);
  
    const [showInventory, setShowInventory] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [searchProduct, setSearchProduct] = useState("");
    const [updateFormOpen, setUpdateFormOpen] = useState(false);
    const [updateData, setUpdateData] = useState('')

  
  // <------------- HIDE/VIEW TOGGLE----------------->
    const handleInventory = () => {
      setShowInventory(!showInventory)
    }

    const handleData = () => {
      setShowData(!showData)
    }
   
    const handleUsers = () => {
      setShowUsers(!showUsers)
    }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



// <------------------------------ CREATE, DELETE, UPDATE INVENTORY ---------------------------------------->
//CREATE 
const handleCreate = async (inventory) => {
   
  try {
    const {productId, quantity} = inventory
    const result = await CreateInventory({productId, quantity})
    console.log("Inventory to create:", result)
    window.alert("New inventory successfully created!")
  }catch(error) {
    console.error("Error creating inventory", error)
  }
    
}

//DELETE 
  const handleDelete = async (inventoryId) => {
    try{
      const result = await DeleteInventory(inventoryId)
      console.log("Inventory to delete:", result)
      window.alert('Inventory successfully deleted!');
    }catch(error){
      console.error("Error deleting inventory", error)
    }
   
  }


//UPDATE
const handleUpdate = async (inventory) => {
  try{
    const result = await UpdateInventory({
      inventory,
      updatedData: updateData
    })
    console.log("Inventory updated", result)
    window.alert("Inventory successfully updated!")
    setUpdateFormOpen(false)

  }catch(error){
    console.error("Error updating inventory", error)
  }
}

const styles = {
  mr: 2,
  alignItems: "center",
  fontFamily: "monospace",
  fontWeight: 900,
  fontSize: "1.5rem",
  letterSpacing: ".1rem",
  color: "inherit",
  textDecoration: "none",
};



// <------------------------------INVENTORY TABLE DATA--------------------------------->

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ProductId', headerName: 'ProductId', width: 130 },
    { field: 'Quantity', headerName: 'Quantity', width: 130 },
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'categoryName', headerName: 'categoryName', width: 130 },
    { field: 'petCategory', headerName: 'petCategory', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
  ];
  
  const filteredData = data.inventories.filter((inventory) =>
  inventory.product.name.toLowerCase().includes(searchProduct.toLowerCase())
);
  
  const rows = filteredData.map((inventory) => ({
    id: inventory.id,
    ProductId: inventory.productId, 
    Quantity: inventory.quantity, 
    Name: inventory.product.name,
    categoryName: inventory.product.categoryName,
    petCategory: inventory.product.petCategory,
    price: inventory.product.price
  }))
 
  // <---------------------------- TABLE DATA END --------------------------------------->
  
  return(

    <div>
            <Typography margin={10} fontFamily={"monospace"} fontWeight={500} fontSize={30}>Hi there, {user.profile[0].name}!</Typography>
     

{/* <-------------------------------- UPDATE FORM  --------------------------------------->  */}

     {updateFormOpen && 
  <div> 
        <>
        <Box p={3} sx={{ textAlign: 'center' }}>
        <Typography sx={styles}>
        UPDATE INVENTORY DETAILS 
        </Typography>
        <br/>
        <TextField
        label="Enter ProductID"
        value={updateData.product}
        onChange={(e) => setUpdateData({...updateData, product: e.target.value })}>
        </TextField>

        <br/>
        <br/>
        <TextField 
        label="Enter Quantity"
        value={updateData.quantity}
        onChange={(e) => setUpdateData({...updateData, quantity: e.target.value})}>
        </TextField>

        <br /> 
        <br />

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate(inventory)}
        >Submit</Button>
        
        <br/>
        <br />
        </Box>
        </>
</div>
}


{/* <------------------------ SEARCH BAR &  VIEW INVENTORY LIST---------------------------------------------> */}

      <IconButton margin={10} variant="outlined" size="large" onClick={handleInventory}>
        {showInventory ? 'Hide Inventory' : 'View Inventory'}
        <Inventory2OutlinedIcon margin={10}/>
      </IconButton>

      {showInventory && (
      <>
       <SearchBar setSearchProduct={setSearchProduct} />
       <br /> 
       <br />

    <Grid container spacing={2}>
    {filteredData.map((inventory) => (
     
    <Grid item key={inventory.id} xs={12} sm={6} md={4} lg={3}>
    <Card key={inventory.id}variant="elevation" sx={{ width: 300, mb: 5, p: 1, mx: "auto"  }}>
  
      <CardMedia 
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {inventory.product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Product ID: {inventory.productId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {inventory.product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CategoryName: {inventory.product.categoryName}
          <br/>
          PetCategory: {inventory.product.petCategory}
        </Typography>
      </CardContent>
      <CardActions>

  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="primary"
        onClick={() => handleCreate(inventory)}
      >
        Create
      </Chip>
  </Box>

  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="primary"
        onClick={() => {setUpdateFormOpen(true), setUpdateData({
          productId: inventory.id,
          quantity: inventory.quantity,
          name: inventory.product.name,
          price: inventory.product.price,
          categoryName: inventory.product.categoryName,
          petCategory: inventory.product.petCategory
        })
      }}
      >
        Update
      </Chip>
  </Box>

  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="danger"
        onClick={() => handleDelete(inventory.id)}

      >
        Delete
      </Chip>
  </Box>

      </CardActions>
    </Card>
    </Grid>
    ))}
    </Grid>
    </>
      )}
  
<br /> 


{/* <------------------------------------VIEW INVENTORY DATA---------------------------------------------> */}
<>
<IconButton margin={10} variant="outlined" size="large" onClick={handleData}>
  {showData ? 'Hide Inventory Data' : 'View Inventory Data'}
  <TableChartOutlinedIcon margin={10}/>
</IconButton>
</>


{showData && (

<DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 30]}
        checkboxSelection
      />

)}

{/* <------------------------------------VIEW USERS---------------------------------------------> */}
<br />
<IconButton margin={10} variant="outlined" size="large" onClick={handleUsers}>
        {showUsers ? 'Hide Users' : 'View Users'}
        <Inventory2OutlinedIcon margin={10}/>
      </IconButton>


{/* //TODO: CALL GET ALL USERS API --> No query for this yet */}
{/* {showUsers && (



)} */}

</div>       
)}


export default Admin;
