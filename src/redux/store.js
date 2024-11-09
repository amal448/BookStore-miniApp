import { configureStore } from '@reduxjs/toolkit'
import CartReducers from './features/cart/CartSlice'
import booksApi from './features/books/booksApi'
import { ordersApi } from './features/order/orderApi'

export const store = configureStore({
  reducer: {
    cart:CartReducers,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware),
})