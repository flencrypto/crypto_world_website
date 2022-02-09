import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


//For Coingecko
const cryptoApiHeaderCoingecko = { 
    'x-rapidapi-host': process.env.REACT_APP_COINGECKO_RAPIDAPI_HOST,
    'x-rapidapi-key':  process.env.REACT_APP_RAPIDAPI_API_KEY,
}

const baseUrlCoingecko = 'https://coingecko.p.rapidapi.com';

const createRequest = (url)=> ({url,headers:cryptoApiHeaderCoingecko});

export const cryptoApiCoingecko = createApi({
    reducerPath: 'cryptoApiCoingecko',
    baseQuery: fetchBaseQuery({baseUrl:baseUrlCoingecko}),
    endpoints: (builder)=>({
        getCryptosCoingecko: builder.query({
            query: ({page,per_page}) => createRequest(`/coins/markets?vs_currency=usd&page=${page}&per_page=${per_page}`),
        }),
        getSpecificCoin: builder.query({
            query: ({coinId}) => createRequest(`/coins/${coinId}`),
        }),

        getAllCryptosCoingecko: builder.query({
            query: () => createRequest('/coins/list'),
        }),
        getExchangesCoingecko: builder.query({
            query: () => createRequest(`/exchanges`),
        }),
        getGlobalStatCoingecko: builder.query({
            query: () => createRequest(`/global`),
        }),
    })
})

export const {
    useGetCryptosCoingeckoQuery,
    useGetSpecificCoinQuery,
    useGetAllCryptosCoingeckoQuery,
    useGetExchangesCoingeckoQuery,
    useGetGlobalStatCoingeckoQuery,
} = cryptoApiCoingecko;







