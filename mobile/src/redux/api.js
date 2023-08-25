import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_KEYS } from '../shared/constants/config'
import { user } from './services/user'
import { getRates } from './services/exchange-rate'
import { getMoneyConverter } from './services/money-converter'
import { getFavourites } from './services/favourites'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_KEYS.API }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => user(id)
        }),
        getRates: builder.query({
            query: () => getRates()
        }),
        getMoneyConverter: builder.query({
            query: (param) => getMoneyConverter(param)
        }),
        getFavourites: builder.query({
            query: (id) => getFavourites(id)
        })
    })
})

export const {
    useGetProductsQuery,
    useGetUserQuery,
    useGetRatesQuery,
    useGetMoneyConverterQuery,
    useLazyGetMoneyConverterQuery,
    useGetFavouritesQuery
} = api