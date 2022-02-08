import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// For Bing news
const newsApiHeader = { 
    'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY

}

const baseUrl = 'https://free-news.p.rapidapi.com'

const createRequest = (url)=> ({url,headers:newsApiHeader});

export const newsApi = createApi({
    reducerPath:'newsApi',
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder)=>({
        getNews:builder.query({
            query: ({newsCategory,page_size}) => createRequest(`/v1/search?q=${newsCategory}&page_size=${page_size}&lang=en`),
        })
    })
})

export const {
    useGetNewsQuery
} = newsApi;