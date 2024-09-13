import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice';
import adminReducer from './slices/adminAuthSlice'

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth:authReducer,
        admin:adminReducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export type RootState = ReturnType<typeof store.getState>
export default store