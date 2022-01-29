import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoApiCoingecko } from "../services/cryptoApi";


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoApiCoingecko.reducerPath]: cryptoApiCoingecko.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoApiCoingecko.middleware)
})