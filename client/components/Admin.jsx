import React from "react";
import { useSelector } from 'react-redux' 
import { useState } from "react";

import {useGetInventoryQuery} from "../redux/inventoryApi";
import { useDeleteInventoryMutation } from "../redux/inventoryApi";
import SearchBar from "./SearchBar";

import {Typography, Grid} from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { DataGrid } from '@mui/x-data-grid';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';


const Admin = () => {
    const { data, error, isLoading } = useGetInventoryQuery();
    const [deleteInventory] = useDeleteInventoryMutation()
    const user = useSelector((state) => state.token.user);
    console.log("user details:", user);
  
    const [showInventory, setShowInventory] = useState(false);
    const [showData, setShowData] = useState(false)
    const [searchProduct, setSearchProduct] = useState("");
  
  
    const handleClick = () => {
      setShowInventory(!showInventory)
    }

    const handleData = () => {
      setShowData(!showData)
    }
   

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


//handle Delete
  const Delete = async (inventoryId) => {
    try{
      await deleteInventory({id: inventoryId})

    }catch(error){
      console.error("Error deleting inventory", error)
    }
   
  }

  //handle Update - PUT
  //handle Create - POST 

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
  
  
  return(

    <div>
            <Typography margin={10} fontFamily={"monospace"} fontWeight={500} fontSize={30}>Hi there, {user.profile[0].name}!</Typography>
      <IconButton margin={10} variant="outlined" size="large" onClick={handleClick}>
        {showInventory ? 'Hide Inventory' : 'View Inventory'}
        <Inventory2OutlinedIcon margin={10}/>
      </IconButton>


      {showInventory && (
      <>
       <SearchBar setSearchProduct={setSearchProduct} />

    {filteredData.map((inventory) => (
      <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
    <Card key={inventory.id}variant="elevation" sx={{ width: 300, mb: 5, p: 1 }}>
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
        onClick={() => Update(inventory.id)}
      >
        Update
      </Chip>
  </Box>
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="primary"
        onClick={() => Create(inventory.id)}
      >
        Create
      </Chip>
  </Box>
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="danger"
        onClick={() => Delete(inventory.id)}
      >
        Delete
      </Chip>
  </Box>
      </CardActions>
    </Card>
    </Grid>
    ))}
    </>
      )}
  
<br /> 
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



</div>       
)}


export default Admin;
