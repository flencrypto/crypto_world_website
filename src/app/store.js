import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi,cryptoApiCoingecko } from "../services/cryptoApi";
import { newsApi } from "../services/newsApi";


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoApiCoingecko.reducerPath]: cryptoApiCoingecko.reducer,
        [newsApi.reducerPath]: newsApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoApiCoingecko.middleware).concat(newsApi.middleware)
})