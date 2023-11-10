import { configureStore } from '@reduxjs/toolkit';

import petsApi from './petsApi';

const store = configureStore({
    reducer: {
        [petsApi.reducerPath]: petsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(petsApi.middleware),
});

export default store;