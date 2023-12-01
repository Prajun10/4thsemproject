import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../store/productSlice"
import productDetailReducer from "./productDetailSlice"

const store = configureStore({
  reducer: {
    products:productReducer,
    product:productDetailReducer
  },
})

export default store