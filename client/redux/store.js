import { configureStore } from '@reduxjs/toolkit';

import petsApi from './petsApi';
import orderApi from './orderApi';

const store = configureStore({
    reducer: {
        [petsApi.reducerPath]: petsApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(petsApi.middleware),
});

export default store;