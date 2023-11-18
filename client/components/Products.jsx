import React, { useState } from 'react';
import { useFetchProductsQuery } from '../redux/productsApi';


const Products = () => {


 // const fetchProductsQuery = useFetchProductsQuery();
 // console.log('Fetch Products Query:', fetchProductsQuery);

   const { data, error, isLoading } = useFetchProductsQuery();
   console.log('Data:', data); // Log the data to the console





   if (isLoading) {
       return <div>Loading...</div>
   }


   if (error) {
       return <div>Error: {error.message}</div>
   }


   return (
       <div className="main">
         <h1> All Products </h1>
         {data && data.products.map(product => (
           <div key={product.id} className="product">
             <div className="product-details">
               <h2>{product.name}</h2>
               <img src={product.image} alt={product.name} style={{width:'300px', height: "400px" }}></img>
               <h3>{product.price}</h3>
               <h4>{product.description}</h4>


             </div>
           </div>
         ))
         }
       </div>
     );
    
    
};


export default Products;