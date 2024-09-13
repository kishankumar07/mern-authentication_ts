import { apiSlice } from "./apiSlice";

const ADMIN_URL = `/api/admin`;

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getUsers:builder.query({
            query:() =>({
                url:`${ADMIN_URL}/getUsers`,
                method:'GET',
                
            }),
            providesTags:['User'],
        }),
        AdLogin:builder.mutation({
           query :(data) =>({
                url: `${ADMIN_URL}/auth`,
                method:'POST',
                body:data,
            })
        }),
        AdLogout:builder.mutation({
            query:() =>({
                url:`${ADMIN_URL}/logout`,
                method:'POST',
            })
        }),
        createUser:builder.mutation({
            query:(data) =>({
                url:`${ADMIN_URL}/createUser`,
                method:'POST',
                body:data,
            }),
            invalidatesTags:['User'],
        }),
        AdupdateUser:builder.mutation({
            query:(data) =>({
                url:`${ADMIN_URL}/updateUserInfo`,
                method:'PUT',
                body:data,
            })
        }),
        getUserInfo:builder.query({
            query:(id) =>({
                url:`${ADMIN_URL}/getUserInfo/${id}`,
                method:'GET'
            }),
            providesTags:['User'],
        }),
        deleteUser:builder.mutation({
            query:(id) =>({
                url:`${ADMIN_URL}/deleteUser/${id}`,
                method:'POST'
            }),
            invalidatesTags:['User']
        })
    })
})
export const { useGetUsersQuery,useAdLoginMutation,useAdLogoutMutation,useCreateUserMutation,useAdupdateUserMutation,useGetUserInfoQuery,useDeleteUserMutation } = adminApiSlice;