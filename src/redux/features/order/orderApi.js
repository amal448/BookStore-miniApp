import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/orders`,
  credentials: 'include',
  
})



export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery,
  tagTypes:['Orders'],
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: `/`,
        method: "POST",
        body: newOrder
      }),
    }),
    getOrdersByEmail:(builder.query)({
      query:(email)=>({
        url:`/get-orders/${email}`
      }),
      providesTags:['Orders']
    })

  }),

})



export const { useCreateOrderMutation ,useGetOrdersByEmailQuery} = ordersApi;
export default ordersApi;