import axios from "axios";
import {
  getProductsSuccess,
  getProductsFail,
  getProductsRequest,
  getProductRequest,
  getProductSuccess,
  getProductFail,
} from "../reducers/productReducer";

const URL = "https://floralcart.onrender.com";

export const getAllProducts = () => async (dispatch) => {
  try {
    // IT WAS Dispatched to set loading state
    
    dispatch(getProductsRequest());
    const { data } = await axios.get(`${URL}/products`);

    // it is to update global state of cart
    dispatch(getProductsSuccess(data));
  } catch (error) {
    dispatch(getProductsFail(error.message));
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(getProductRequest());
    const { data } = await axios.get(`${URL}/product/${id}`);

    dispatch(getProductSuccess(data));
  } catch (error) {
    dispatch(getProductFail(error.message));
  }
};
