import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// For coinranking
const cryptoApiHeader = { 
    'x-rapidapi-host': process.env.REACT_APP_COINRANKING_RAPIDAPI_HOST_test,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY_test
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url)=> ({url,headers:cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: () => createRequest(`/coins`)
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi;


//For Coingecko
const cryptoApiHeaderCoingecko = { 
    'x-rapidapi-host': process.env.REACT_APP_COINGECKO_RAPIDAPI_HOST,
    'x-rapidapi-key':  process.env.REACT_APP_RAPIDAPI_API_KEY,
}

const params = {vs_currency:'usd'};

const baseUrlCoingecko = 'https://coingecko.p.rapidapi.com';

const createSecondRequest = (url)=> ({url,headers:cryptoApiHeaderCoingecko,params:params});

export const cryptoApiCoingecko = createApi({
    reducerPath: 'cryptoApiCoingecko',
    baseQuery: fetchBaseQuery({baseUrl:baseUrlCoingecko}),
    endpoints: (builder)=>({
        getCryptosCoingecko: builder.query({
            query: ({page,per_page}) => createSecondRequest(`/coins/markets?page=${page}&per_page=${per_page}`),
        }),

        getAllCryptosCoingecko: builder.query({
            query: () => createSecondRequest('/coins/list'),
        }),
    })
})

export const {
    useGetCryptosCoingeckoQuery,
    useGetAllCryptosCoingeckoQuery,
} = cryptoApiCoingecko;







