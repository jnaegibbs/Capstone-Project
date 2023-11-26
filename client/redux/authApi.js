import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),

  endpoints: (builder) => ({
    //user registration
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/user/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),

    //userDetail Updation
    updateUser: builder.mutation({
      query: (userId, ...user) => ({
        url: `/auth/user/register/${userId}`,
        method: "PUT",
        body: user,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),

    //guest login
    guestLogin: builder.mutation({
      query: (user) => ({
        url: "/auth/user/guest",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),

    //user login
    login: builder.mutation({
      query: (user) => ({
        url: "auth/user/login",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGuestLoginMutation,
  useUpdateUserMutation,
} = authApi;

export default authApi;
