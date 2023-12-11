import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetInventoryQuery } from "../redux/inventoryApi";
import { useDeleteInventoryMutation } from "../redux/inventoryApi";

import SearchBar from "./SearchBar";
import { Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../redux/authApi";
import { createTheme } from "@mui/material/styles";
import {
  PetsTwoTone,
  TableChart,
  VerifiedUserSharp,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

const Admin = () => {
  const { data, error, isLoading } = useGetInventoryQuery();
  const { data: users } = useGetUsersQuery();

  const [DeleteInventory] = useDeleteInventoryMutation();
  const user = useSelector((state) => state.token.user);

  const [showInventory, setShowInventory] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5c6bc0",
      },
    },
  });

  // <------------- HIDE/VIEW TOGGLE----------------->
  const handleInventory = () => {
    setShowInventory(!showInventory);
  };

  const handleData = () => {
    setShowData(!showData);
  };

  const handleUsers = () => {
    setShowUsers(!showUsers);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const styles = {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 500,
    fontSize: "large",
    letterSpacing: ".1rem",
    color: "inherit",
    textDecoration: "none",
  };

  // <--------------------------------------- DELETE INVENTORY ---------------------------------------->

  const handleDelete = async (inventoryId) => {
    try {
      const result = await DeleteInventory(inventoryId);
      window.alert("Inventory successfully deleted!");
    } catch (error) {
      console.error("Error deleting inventory", error);
    }
  };

  // <-------------------------------- INVENTORY TABLE DATA --------------------------------------->

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "ProductId", headerName: "ProductId", width: 130 },
    { field: "Quantity", headerName: "Quantity", width: 130 },
    { field: "Name", headerName: "Name", width: 300 },
    { field: "categoryName", headerName: "categoryName", width: 150 },
    { field: "petCategory", headerName: "petCategory", width: 150 },
    { field: "price", headerName: "Price", width: 130 },
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
    price: inventory.product.price,
  }));

  return (
    <div>
      <Typography
        margin={10}
        fontFamily={"monospace"}
        fontWeight={500}
        fontSize={30}
      >
        Hi there, {user.profile[0].name}!
      </Typography>

      {/* <-----------------------------   INVENTORY LIST  ---------------------------------------------> */}
      <Button
        theme={theme}
        size="large"
        style={{ marginLeft: "50px" }}
        onClick={() => navigate("/NewProductForm")}
      >
        <PetsTwoTone sx={{ paddingRight: 2 }}></PetsTwoTone>
        <h3>Create a new product</h3>
      </Button>
      <br />
      <br />

      <Button
        theme={theme}
        size="large"
        style={{ marginLeft: "50px" }}
        onClick={handleInventory}
      >
        <PetsTwoTone sx={{ paddingRight: 2 }}></PetsTwoTone>
        {showInventory ? <h3>Hide Inventory</h3> : <h3>Edit Inventory</h3>}
      </Button>

      {showInventory && (
        <>
          <SearchBar setSearchProduct={setSearchProduct} />
          <br />
          <br />

          <Grid container spacing={2}>
            {filteredData.map((inventory) => (
              <Grid item key={inventory.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  key={inventory.id}
                  variant="elevation"
                  sx={{ width: 300, mb: 2, p: 1, mx: "auto" }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h7" component="div">
                      {inventory.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Product ID: {inventory.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {inventory.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(`/updateForm/${inventory.productId}`)
                        }
                      >
                        Update
                      </Chip>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
     


      {/* <------------------------------------VIEW INVENTORY DATA---------------------------------------------> */}
      <Button
        theme={theme}
        size="large"
        style={{ marginLeft: "50px", marginTop: "20px" }}
        onClick={handleData}
      >
        <TableChart sx={{ paddingRight: 2 }}></TableChart>
        {showData ? <h3>Hide Inventory Data</h3> : <h3>View Inventory Data</h3>}
      </Button>

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
        />
      )}

      <br />
      {/* <------------------------------------VIEW USERS---------------------------------------------> */}

      <Button
        theme={theme}
        size="large"
        style={{ marginLeft: "50px", marginTop: "20px" }}
        onClick={handleUsers}
      >
        <VerifiedUserSharp sx={{ paddingRight: 2 }}></VerifiedUserSharp>
        {showUsers ? <h3>Hide Users</h3> : <h3>View Users</h3>}
      </Button>

      {showUsers && (
        <div>
          {users.map((user) => (
            <Box>
              <div key={user.id}>
                <ol>
                  <Typography sx={styles}>ID: {user.id} </Typography>
                  <Typography sx={styles}>
                    Username: {user.username}{" "}
                  </Typography>
                  <Typography sx={styles}>
                    Is Admin: {user.isAdmin ? "Yes" : "No"}{" "}
                  </Typography>
                  ----------------------------------------------------
                </ol>
              </div>
            </Box>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
