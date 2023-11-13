import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Register from "./components/Register";
import Login from "./components/Login"


const App = () => {
  return (
    <>
        <Routes>
         <Route path='/' element = {<HomePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Add a catch-all route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    </>
  );
};

export default App;
