import { configureStore } from '@reduxjs/toolkit';

import authApi from './authApi';
import orderApi from './orderApi';

import tokenReducer from './tokenSlice';

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(authApi.middleware),
});

export default store;