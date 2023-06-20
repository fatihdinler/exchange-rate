import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEYS } from '../shared/constants/config'
import { user } from './services/user'
import { getRates } from './services/exchange-rate'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_KEYS.API }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => user(id)
        }),
        getRates: builder.query({
            query: () => getRates()
        })
    })
})

export const { useGetProductsQuery, useGetUserQuery, useGetRatesQuery } = api