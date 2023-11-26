import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getAuthToken = (state) => state.token.token;


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
            query: (userId) =>  `api/pets/cart/${userId}`,

            // transformHeaders: (headers, { getState }) => {
            //     const token = getAuthToken(getState());
            //     if (token) {
            //       headers.set('Authorization', `Bearer ${token}`);
            //     }
            //     return headers;
            // },
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
    useFetchCartByUserQuery,
    useCreateCartMutation
} = cartApi
