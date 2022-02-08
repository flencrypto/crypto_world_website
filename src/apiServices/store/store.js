import { configureStore } from "@reduxjs/toolkit";
import {cryptoApiCoingecko } from "../cryptoApi";
import { newsApi } from "../newsApi";


export default configureStore({
    reducer: {
        [cryptoApiCoingecko.reducerPath]: cryptoApiCoingecko.reducer,
        [newsApi.reducerPath]: newsApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(cryptoApiCoingecko.middleware).concat(newsApi.middleware)
})