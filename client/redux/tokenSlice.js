import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

const tokenSlice = createSlice ({
    name: "token",
    initialState: {token: null, user:null},
    reducers: {
        setToken: (_state, {payload}) => payload.token
    },

    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, {payload}) => ({token: payload.token, user: payload.user})
        );

        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, {payload}) => ({token: payload.token, user: payload.user})
        );
    }
});

export default tokenSlice.reducer;
export const {setToken} = tokenSlice.actions;