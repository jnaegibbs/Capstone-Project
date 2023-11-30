import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import tokenReducer from "../redux/tokenSlice";
import authApi from "../redux/authApi";
import orderApi from "../redux/orderApi";
import productsApi from "../redux/productsApi";
import inventoryApi from "../redux/inventoryApi";
import cartApi from "../redux/cartApi";
import cartItemApi from "../redux/cartItemApi";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        [authApi.reducerPath]:authApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [productsApi.reducerPath]:productsApi.reducer,
        [inventoryApi.reducerPath]:inventoryApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer,
        [cartItemApi.reducerPath]:cartItemApi.reducer,
         token: tokenReducer 
        },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
