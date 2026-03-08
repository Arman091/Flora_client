import { configureStore } from "@reduxjs/toolkit";
import getAllProductsReducer from "./reducers/productReducer";
import { getProductDetailReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    getAllProducts: getAllProductsReducer,
    getProductDetail: getProductDetailReducer,
    cart: cartReducer,
  },
});

export default store;
