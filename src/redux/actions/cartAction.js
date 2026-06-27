import axios from "axios";
import { addToCart as add, removeFromCart as remove } from "../reducers/cartReducer";
import { URL } from "../../lib/config";

export const addToCart = (id, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/product/${id}`);
    dispatch(add({ ...data, quantity }));
  } catch (error) {
    console.log("Error while calling add to cart API", error.message);
  }
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch(remove(id));
};
