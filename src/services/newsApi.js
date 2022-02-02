import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// For Bing news
const newsApiHeader = { 
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': process.env.REACT_APP_BING_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY_test

}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url)=> ({url,headers:newsApiHeader});

export const newsApi = createApi({
    reducerPath:'newsApi',
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder)=>({
        getNews:builder.query({
            query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`),
        })
    })
})

export const {
    useGetNewsQuery
} = newsApi;