import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const inventoryApi = createApi ({
    reducerPath: "inventoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, {getState} )=> {
            const token = getState().token.token
            console.log(token)
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),

    endpoints: (builder) => ({
        //get all inventory
        getInventory: builder.query({
            query: () => `api/pets/inventory`
        }),

        //get single inventory
        getSingleInventory: builder.query({
            query: (inventoryId) => `api/pets/inventory/${inventoryId}`
        }),

        //create new inventory
        addInventory: builder.mutation({
            query: (newInventory) => ({
                url: `api/pets/inventory`,
                method: "POST",
                body: newInventory,
            }),
            transformResponse: (response) => {
                console.log(response);
                return(response);
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            },
        }),

        //update existing inventory
        updateInventory: builder.mutation({
            query: ({inventoryId, updateInventory}) => ({
                url: `api/pets/inventory/${inventoryId}`,
                method: "PUT",
                body: updateInventory
            }),

            transformResponse: (response) => {
                console.log(response);
                return response 
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            },
        }),

        //delete existing inventory
        deleteInventory: builder.mutation({
            query: (inventoryId) => ({
                url: `api/pets/inventory/${inventoryId}`,
                method: "DELETE",
            }),
            transformResponse: (response) => {
                console.log(response)
                return response;
            },
            transformErrorResponse: (response) => {
                console.log(response.status)
            }
        })
    })
})

export default inventoryApi;
export const {
    useGetInventoryQuery,
    useGetSingleInventoryQuery,
    useAddInventoryMutation,
    useUpdateInventoryMutation,
    useDeleteInventoryMutation
} = inventoryApi