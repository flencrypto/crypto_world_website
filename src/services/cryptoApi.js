import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// For coinranking
const cryptoApiHeader = { 
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'd15052e859msh9a97166e104b84ap1a1193jsn40d1de61b5d6'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url)=> ({url,headers:cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi;




//For Coingecko
const cryptoApiHeaderCoingecko = { 
    'x-rapidapi-host': 'coingecko.p.rapidapi.com',
    'x-rapidapi-key': 'd15052e859msh9a97166e104b84ap1a1193jsn40d1de61b5d6'
}

const params = {vs_currency:'usd'};

const baseUrlCoingecko = 'https://coingecko.p.rapidapi.com';

const createSecondRequest = (url)=> ({url,headers:cryptoApiHeaderCoingecko,params:params});

export const cryptoApiCoingecko = createApi({
    reducerPath: 'cryptoApiCoingecko',
    baseQuery: fetchBaseQuery({baseUrl:baseUrlCoingecko}),
    endpoints: (builder)=>({
        getCryptosCoingecko: builder.query({
            query: () => createSecondRequest('/exchanges')
        })
    })
})

export const {
    useGetCryptosCoingeckoQuery,
} = cryptoApiCoingecko;





