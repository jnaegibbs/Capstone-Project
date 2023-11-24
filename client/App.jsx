import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Register from "./components/Register";
import Login from "./components/Login"
import NavBar from "./components/Navbar";
import Admin from "./components/Admin";
import SingleView from "./components/SingleView";
import Cart from "./components/Cart";


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
          <Route path='/cart' element={<Cart/>}/>

          {/* Add a catch-all route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    </>
  );
};

export default App;
