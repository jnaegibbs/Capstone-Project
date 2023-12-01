import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartItemApi = createApi({
  reducerPath: 'cartItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
  }),
  endpoints: (builder) => ({
    fetchCartItems: builder.query({
      query: () => 'api/pets/cartItem',
    }),
    createCartItem: builder.mutation({
      query: (newCartItem) => ({
        url: 'api/pets/cartItem',
        method: 'POST',
        body: newCartItem,
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ cartItemId, updatedCartItem }) => ({
        url: `api/pets/cartItem/${cartItemId}`,
        method: 'PATCH',
        body: updatedCartItem,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (cartItemId) => ({
        url: `api/pets/cartItem/${cartItemId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchCartItemsQuery,
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartItemApi;

export default cartItemApi;