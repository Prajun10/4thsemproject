import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProducts = (keyword="") => (dispatch) => {
    // console.log("Keyword in fetchProducts action:", keyword);
    dispatch(fetchProductsRequest())
     axios.get(`/api/v1/products?keyword=${keyword}`).then((res)=>{
        dispatch(fetchProductsSuccess(res.data))
    }).catch((err)=>{
        dispatch(fetchProductsFailure(err.message))
    })
}

const initialState = {
    products:[],
    loading:false,
    error:null,
    resultPerPage:null
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        fetchProductsRequest:(state) => {
            state.loading = true
            state.error = null
        },
        fetchProductsSuccess: (state,action) => {
            state.loading = false
            state.products = action.payload
            state.resultPerPage = action.payload
        },
        fetchProductsFailure: (state,action) => {
            state.loading = false
            state.error = action.payload
        },
        
    }
})

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure
} = productSlice.actions

export default productSlice.reducer