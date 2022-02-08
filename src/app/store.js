import { configureStore } from "@reduxjs/toolkit";
import {cryptoApiCoingecko } from "../services/cryptoApi";
import { newsApi } from "../services/newsApi";


export default configureStore({
    reducer: {
        [cryptoApiCoingecko.reducerPath]: cryptoApiCoingecko.reducer,
        [newsApi.reducerPath]: newsApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(cryptoApiCoingecko.middleware).concat(newsApi.middleware)
})