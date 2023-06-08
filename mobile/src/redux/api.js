import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { products } from './services/products'
import { user } from './services/user'
import { API_KEYS } from '../shared/constants/config'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_KEYS.API }),
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