import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

const tokenSlice = createSlice ({
    name: "token",
    initialState: {token: null, user:null},
    reducers: {
        setToken: (state, {payload}) => {
            state.token = payload.token;
            state.user = payload.user;
        }
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