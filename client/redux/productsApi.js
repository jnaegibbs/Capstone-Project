import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi ({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/",
        prepareHeaders: (headers, {getState} )=> {
            const token = getState().token.token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
      
    }),

    endpoints: (builder) => ({
        //get all products
        fetchProducts: builder.query({
            query: () => `api/pets/product`,
        }),

        //get single product
        fetchSingleProduct: builder.query({
            query: (productId) => `api/pets/product/${productId}`
        }),

        //create a new product 
        newProduct: builder.mutation({
            query: (newProduct) => ({
                url: `api/pets/product`,
                method: "POST",
                body: newProduct,
            }),
            transformResponse: (response) => {
                console.log(response);
                return(response);
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            },
        }),

        //update existing product
        updateProduct: builder.mutation({
            query:(productId, updateProduct) => ({
                url:`api/pets/product/${productId}`,
                method: "POST",
                body: updateProduct
            }),
            transformResponse: (response) => {
                console.log(response);
                return(response);
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            },
        }),

        //delete existing product
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url:`api/pets/product/${productId}`,
                method: "DELETE",
            }),
            transformResponse: (response) => {
                console.log(response);
                return response;
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            }
        })
    })
})

export default productsApi;
export const {
    useFetchProductsQuery,
    useFetchSingleProductQuery,
    useNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApi