import { configureStore } from '@reduxjs/toolkit';

import authApi from './authApi';
import orderApi from './orderApi';

import tokenReducer from './tokenSlice';
import productsApi from './productsApi';
import inventoryApi from './inventoryApi';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [productsApi.reducerPath]:productsApi.reducer,
        [inventoryApi.reducerPath]:inventoryApi.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(authApi.middleware),
});

export default store;