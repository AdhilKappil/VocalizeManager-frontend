import { apiSlice } from './apiSlice';
const ADMIN_URL = 'https://vocalizemanager-backend.onrender.com/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: 'POST',
        body: data,
        credentials: "include",
      })
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
        credentials: "include",
      })
    }),

    getUsersData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: 'GET',
        credentials: "include",
      })
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/delete?id=${data}`,
        method: 'DELETE',
        credentials: "include",
      })
    }),


    updateUserData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/update-user`,
        method: 'PUT',
        body: data,
        credentials: "include",
      })
    }),

    putBlockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: 'PATCH',
        credentials: "include",
      })
    })

  })
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetUsersDataMutation,
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  usePutBlockUserMutation
} = adminApiSlice;
