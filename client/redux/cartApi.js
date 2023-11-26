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
        fetchCartByUser: builder.query({
            query: ({userId}) =>  `api/pets/cart/${userId}`
        }),

        createCart: builder.mutation({
            query: (newCart) => ({
              url: `api/pets/cart`,
              method: "POST",
              body: newCart,
            })
        })
    })

});


export default cartApi;
export const {
    useFetchCartQuery,
    useCreateCartMutation
} = cartApi
