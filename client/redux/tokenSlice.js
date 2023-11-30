import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token") || null,
    user:localStorage.getItem('profileDetails') || null
  },
  reducers: {
    logout: (state, { payload }) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("profileDetails");
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        return { token: payload.token, user: payload.user };
      }
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        return { token: payload.token, user: payload.user };
      }
    );
    builder.addMatcher(
      authApi.endpoints.guestLogin.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("profileDetails", JSON.stringify(payload.user));
        localStorage.setItem("token", payload.token);
        return { token: payload.token, user: payload.user };
      }
    );
  },
});

export default tokenSlice.reducer;
export const { logout } = tokenSlice.actions;
