import { Fragment } from "react";
import React from "react";
import Banner from "./Banner";
import { Box } from "@mui/material";
import {getAllProducts} from '../../redux/actions/productAction'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";
import BannerMiddle from "./BannerMiddle";
const Home = () => {
  const getProducts = useSelector((state) => state.getAllProducts);
  const { products } = getProducts;
  // console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    ///2.  getALlProducts was called using dispatch 
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Banner />
        <ProductComponent
          products={products}
          title="Products"
          timer={true}
        />
        <BannerMiddle />
      </Box>
    </>
  );
};
export default Home;
