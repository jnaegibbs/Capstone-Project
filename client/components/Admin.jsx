import React from "react";
import {useGetInventoryQuery} from "../redux/inventoryApi";

const Admin = () => {
    const { data: inventories, error, isLoading } = useGetInventoryQuery();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <div>
    <h1> Welcome, Admin!</h1>
    <h3> Here is your adminstrator page where you can edit products and inventory </h3>
      <h3>Inventory List</h3>

  { /* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td>
              <td>{inventory.product.id}</td>
              <td>{inventory.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    */}
    </div>
  )
};


export default Admin;