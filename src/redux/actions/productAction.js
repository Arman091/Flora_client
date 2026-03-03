import axios from "axios";
import {
  getProductsSuccess,
  getProductsFail,
  getProductRequest,
  getProductSuccess,
  getProductFail,
} from "../reducers/prductReducer";

const URL = "https://floralcart.onrender.com";

export const getAllProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);
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
