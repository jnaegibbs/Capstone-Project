import { configureStore } from '@reduxjs/toolkit';

import petsApi from './petsApi';
import orderApi from './orderApi';

import tokenReducer from './tokenSlice';

const store = configureStore({
    reducer: {
        [petsApi.reducerPath]: petsApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(petsApi.middleware),
});

export default store;