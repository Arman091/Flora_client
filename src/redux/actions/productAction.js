import axios from "axios";
import * as actionTypes from "../constants/productConstant";

const URL = " https://floralcart.onrender.com";
export const getAllProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);
    // 5. from here data will go inside product reducer 
    dispatch({ type: actionTypes.GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAIL });
    const { data } = await axios.get(`${URL}/product/${id}`);

    dispatch({ type: actionTypes.GET_PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAIL_FAIL,
      payload: error.message,
    });
  }
};
