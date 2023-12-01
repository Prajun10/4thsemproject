import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProductsDetails = (id) => (dispatch) => {
    dispatch(fetchProductsDetailRequest())
     axios.get(`/api/v1/product/${id}`).then((res)=>{
        dispatch(fetchProductsDetailSuccess(res.data))
    }).catch((err)=>{
        dispatch(fetchProductsDetailFailure(err.message))
    })
}

const initialState = {
    product:{},
    loading:false,
    error:null
}

const productDetailSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        fetchProductsDetailRequest:(state) => {
            state.loading = true
            state.error = null
        },
        fetchProductsDetailSuccess: (state,action) => {
            state.loading = false
            state.product = action.payload
        },
        fetchProductsDetailFailure: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
        
    }
})

export const {
    fetchProductsDetailRequest,
    fetchProductsDetailSuccess,
    fetchProductsDetailFailure
} = productDetailSlice.actions

export default productDetailSlice.reducer