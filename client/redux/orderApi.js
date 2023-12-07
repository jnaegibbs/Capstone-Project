import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, {getState} )=> {
      const token = getState().token.token
      if (token) {
          headers.set("authorization", `Bearer ${token}`)
      }
      return headers
  }

  }),

  endpoints: (builder) => ({
    //get all the orders
    getOrders: builder.query({
      query: () => `api/pets/order`,
    }),
     // get a single order
    getSingleorder: builder.query({
      query: (orderId) => `api/pets/order/${orderId}`,
    }),
     // get a single order
     getUserOrder: builder.query({
      query: (userId) => `api/pets/order/user/${userId}`,
    }),

    //create a new order
    addOrder: builder.mutation({
      query: (orderDetails) => ({
        url: `api/pets/order`,
        method: "POST",
        body: orderDetails,
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    
    }),

    //update the existed order
    updateOrder: builder.mutation({
      query: (orderId, ...orderDetails) => ({
        url: `api/pets/order/${orderId}`,
        method: "PUT",
        body: orderDetails,
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    }),

    //delete the existed order
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `api/pets/order/${orderId}`,
        method: "DELETE",
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    }),
  }),
});

export default orderApi;
export const {
  useGetOrdersQuery,
  useGetSingleorderQuery,
  useGetUserOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
