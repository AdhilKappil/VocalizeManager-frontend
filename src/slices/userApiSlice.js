import {apiSlice} from './apiSlice'

const USER_URL = 'https://vocalizemanager-backend.onrender.com/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data,
                credentials: "include",
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST',
                credentials: "include",
            })
        }),

        register: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}`,
              method: 'POST',
              body: data,
              credentials: "include",
            }),
          }),

          update: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/profile`,
              method: 'PUT',
              body: data,
              credentials: "include",
            }),
          }),

          setImg: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/addProfile`,
              method: 'POST', // Corrected method to POST
              body: data,
              credentials: "include",
            }), 
          }),
          
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation,
useSetImgMutation} = userApiSlice