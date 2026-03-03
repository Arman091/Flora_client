import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./reducers/prductReducer";
import { getProductDetailReducer } from "./reducers/prductReducer";
import { cartReducer } from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    getAllProducts: getAllProductsReducer,
    getProductDetail: getProductDetailReducer,
    cart: cartReducer,
  },
});

export default store;
