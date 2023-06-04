import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { products } from './services/products'
import { user } from './services/user'
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => products()
        }),
        getUser: builder.query({
            query: (id) => user(id)
        })
    })
})

export const { useGetProductsQuery, useGetUserQuery } = api