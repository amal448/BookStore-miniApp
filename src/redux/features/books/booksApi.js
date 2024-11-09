import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: 'include',
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      Headers.set('Authorization', `Bearer ${token}`);
    }
    return Headers
  }
})



export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery,
  endpoints: (builder) => ({

    fetchAllBooks: builder.query({
      query: () => "/getbooks",
      providesTags: ["Books"]
    }),

    fetchBooksById: builder.query({
      query: (id) => `/getsingle-book/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id }]
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: `/create-book`,
        method: "POST",
        body: newBook
      }),
      invalidatesTags: ['Books']
    }),
    
    updateBook: builder.mutation({
      query: ({id,...rest}) => ({
        url: `/edit-book/${id}`,
        method: "PUT",
        body:rest,
        headers :{
          'Content-Type':'application/json'
        }
      }),
      invalidatesTags: ['Books']
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Books']
    }),



  }),

})



export const { useFetchAllBooksQuery ,useFetchBooksByIdQuery ,useAddBookMutation,useUpdateBookMutation,useDeleteBookMutation} = booksApi;
export default booksApi;