import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const petsApi = createApi({
  reducerPath: "petsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => `api/pets/product`,
    }),
    fetchSingleProduct: builder.query({
      query: (productId) => `api/pets/product/${productId}`
    }),

    //user registration 
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/user/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) =>response,
    }),

    //user login
    login: builder.mutation({
      query: (user) => ({
        url: "auth/user/login",
        method: "POST",
        body:user,
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status)
      }
    })

  }),
});

export const { 
  useFetchProductsQuery, 
  useFetchSingleProductQuery,
  useRegisterMutation,
  useLoginMutation
 } = petsApi;

export default petsApi;