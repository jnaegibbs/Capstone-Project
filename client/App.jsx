import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Register from "./components/Register";
import Login from "./components/Login"
import NavBar from "./components/Navbar";
import Admin from "./components/Admin";
import SingleView from "./components/SingleView";
import Cart from './components/Cart';
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import GuestLogin from "./components/GuestLogin";
import UpdateForm from "./components/UpdateForm";
import Review from "./components/Review";
import CreateInventoryForm from "./components/NewProductForm";
import NewProductForm from "./components/NewProductForm";


const App = () => {
  return (
    <>
    <NavBar/>
        <Routes>
         <Route path='/' element = {<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/:productId' element={<SingleView/>}/>
          <Route path="/checkout/:total" element={<Checkout />} />
          <Route path="/confirmPage/:noOfOrder" element={<Confirmation/>} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/guestlogin" element={<GuestLogin/>} />
          <Route path="/updateForm/:productId" element={<UpdateForm/>}/>
          <Route path='/review/:productId' element={<Review/>}/>
          <Route path="/NewProductForm" element={<NewProductForm/>} />
          {/* Add a catch-all route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    </>
  );
};

export default App;
