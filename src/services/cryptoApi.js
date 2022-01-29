import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// For coinranking
const cryptoApiHeader = { 
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'd15052e859msh9a97166e104b84ap1a1193jsn40d1de61b5d6'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'



// //For Coingecko
// const cryptoApiHeader = { 
//     'x-rapidapi-host': 'coingecko.p.rapidapi.com',
//     'x-rapidapi-key': 'd15052e859msh9a97166e104b84ap1a1193jsn40d1de61b5d6'
// }

// const params = {vs_currency:'usd'} 

// const baseUrl = 'https://coingecko.p.rapidapi.com/'


const createRequest = (url)=> ({url,headers:cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        })
    })
})

export const {
    useGetCryptosQuery,
} = cryptoApi;

// var options = {
//   method: 'GET',
//   url: 'https://coingecko.p.rapidapi.com/exchanges',
//   headers: {
//     'x-rapidapi-host': 'coingecko.p.rapidapi.com',
//     'x-rapidapi-key': 'd15052e859msh9a97166e104b84ap1a1193jsn40d1de61b5d6'
//   }
// };
