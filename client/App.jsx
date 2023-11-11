import React, { useState } from 'react';
import Products from './component/Products';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {

    return (
      <Provider store={store}>
      <Routes>
        <Route path="/" element={<Products />} />
        {/* Add a catch-all route */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Provider>
    );
  }
  
  export default App;