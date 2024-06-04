import {apiSlice} from './apiSlice'

const USER_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=>({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `${USER_URL}/logout`,
                method: 'POST'
            })
        }),

        register: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}`,
              method: 'POST',
              body: data,
            }),
          }),

          update: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
          }),

          setImg: builder.mutation({
            query: (data) => ({
              url: `${USER_URL}/addProfile`,
              method: 'POST', // Corrected method to POST
              body: data,
            }), 
          }),
          
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateMutation,
useSetImgMutation} = userApiSlice