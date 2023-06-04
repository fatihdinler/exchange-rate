import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'
import darkModeReducer from '../features/dark-mode/dark-mode-slice'

export const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        darkMode: darkModeReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)