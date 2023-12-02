import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),

  endpoints: (builder) => ({
    //get all the reviews
    getReviews: builder.query({
      query: () => `api/pets/review`,
    }),
     // get a single review
    getSingleReview: builder.query({
      query: (reviewId) => `api/pets/review/${reviewId}`,
    }),

    //create a new review
    addReview: builder.mutation({
      query: (reviewDetails) => ({
        url: `api/pets/review`,
        method: "POST",
        body: reviewDetails,
      }
     
      ),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    
    }),

    //update the existed review
    updateReview: builder.mutation({
      query: (reviewId, ...reviewDetails) => ({
        url: `api/pets/review/${reviewId}`,
        method: "PUT",
        body: reviewDetails,
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    }),

    //delete the existed review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `api/pets/review/${reviewId}`,
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

export default reviewApi;
export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
