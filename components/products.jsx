import React from "react";
import { useFetchProductsQuery } from "../client/Redux/FluffyFriendsAPI";

function Products(){
    const {data, error, isLoading} = useFetchProductsQuery();
    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>      
}

return (
    <div>
       {data && data.products.map((product) => (
        <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <h3>{product.image}</h3>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
        </div>
       ))}
    </div>
);
}

export default Products;
