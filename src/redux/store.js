import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import getAllProductsReducer from "./reducers/prductReducer";
import { getProductDetailReducer } from "./reducers/prductReducer";
import { cartReducer } from "./reducers/cartReducer"
const reducer = combineReducers({
  //8. GetAllProducts values can be seen in  Redux devtools
  getAllProducts: getAllProductsReducer,
  getProductDetail: getProductDetailReducer,
  cart: cartReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
