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
  }),
});

export const { useFetchProductsQuery, useFetchSingleProductQuery } = petsApi;

export default petsApi;