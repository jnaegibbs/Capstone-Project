import { createSlice } from "@reduxjs/toolkit";
import petsApi from "./petsApi";

const tokenSlice = createSlice ({
    name: "token",
    initialState: null,
    reducers: {
        setToken: (_state, {payload}) => payload.token
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            petsApi.endpoints.register.matchFulfilled,
            (state, {payload}) => payload.token
        );

        builder.addMatcher(
            petsApi.endpoints.login.matchFulfilled,
            (state, {payload}) => payload.token
        )
    }
});

export default tokenSlice.reducer;
export const {setToken} = tokenSlice.actions;