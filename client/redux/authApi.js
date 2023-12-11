import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    //get all users
    getUsers: builder.query({
      query: () => "/auth/user",
    }),
    //get single users
    getSingleUser: builder.query({
      query: (userId) => `/auth/user/${userId}`,
    }),

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
  useGetUsersQuery,
  useGetSingleUserQuery,
} = authApi;

export default authApi;
