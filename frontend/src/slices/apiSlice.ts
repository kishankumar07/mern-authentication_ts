import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

// create a base query using the base url
const baseQuery = fetchBaseQuery({baseUrl:''});

//Defining the api slice
export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User','Admin'],
    endpoints:(builder) => ({}),/**Admin and User endpoints will be injected to this */
});