import { createSlice } from "@reduxjs/toolkit";

// Slice for handling the list of all products
const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: { products: [], loading: false },
  reducers: {
    getProductsRequest: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Slice for handling individual product details
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: { product: {}, loading: false },
  reducers: {
    getProductRequest: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProductReset: (state) => {
      state.product = {};
    },
  },
});

// Exporting actions to be used in the action creators (next step)
export const { 
  getProductsSuccess, 
  getProductsFail,
  getProductsRequest
} = allProductsSlice.actions;

export const { 
  getProductRequest, 
  getProductSuccess, 
  getProductFail, 
  getProductReset 
} = productDetailSlice.actions;

export const getProductDetailReducer = productDetailSlice.reducer;
export default allProductsSlice.reducer;
