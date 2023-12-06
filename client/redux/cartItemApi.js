import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartItemApi = createApi({
  reducerPath: 'cartItemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: (headers, {getState} )=> {
      const token = getState().token.token
      if (token) {
          headers.set("authorization", `Bearer ${token}`)
      }
      return headers
  }

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
    deleteAllCartItem: builder.mutation({
      query: (cartId) => ({
        url: `api/pets/cartItem/cart/${cartId}`,
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
  useDeleteAllCartItemMutation
} = cartItemApi;

export default cartItemApi;