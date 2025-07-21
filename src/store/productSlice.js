import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";



export const getProducts = createAsyncThunk('product/getProducts',async(queryString)=>{
    const response = await api.get(`/public/products?${queryString}`);
    return response.data;
    
})

export const getCategoris = createAsyncThunk('categories/getCategories',async()=>{
    const response = await api.get(`/public/categories`);
    return response.data;
    
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: null,
        categories: null,
        pagination: {},
        isLoading: false,
        errorMessage: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getCategoris.fulfilled,(state,action)=>{
            state.categories = action.payload.content;
        })
        .addCase(getProducts.pending,(state)=>{
            state.isLoading=true;
            
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.products = action.payload.content;
            state.pagination.pageNumber=action.payload.pageNumber;
            state.pagination.totalPages=action.payload.totalPages;
            state.pagination.totalElements=action.payload.totalElements;
            state.pagination.pageSize=action.payload.pageSize;
            state.pagination.last=action.payload.last;

        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.errorMessage=action.error.message || "Something went wrong";
            
        })

    }
      
});

export default productSlice.reducer;