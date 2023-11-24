import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cartApi = createApi ({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/"
    }),


    endpoints: (builder) => ({
     
        //get all carts
        fetchCart: builder.query({
            query: () => `api/pets/cart`
        }),

    })

})


export default cartApi;
export const {
    useFetchCartQuery,
} = cartApi
