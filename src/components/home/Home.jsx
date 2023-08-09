import { Fragment } from "react";
import React from "react";
import Banner from "./Banner";
import { Box } from "@mui/material";
import {getAllProducts} from '../../redux/actions/productAction'
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useState } from "react";
import ProductComponent from "./ProductComponent";
import BannerMiddle from "./BannerMiddle";
const Home = () => {
  const [Allproducts, setProducts] = useState([]);
  async function myproducts() {
    let response = fetch("https://floralcart.onrender.com/products");
    let data = await response;
    let productsarray = await data.json();
    setProducts(productsarray);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    ///2.  getALlProducts was called using dispatch
    dispatch(getAllProducts());
    myproducts();
  }, [dispatch]);

  return (
    <>
      <Box>
        <Banner />
        <ProductComponent
          products={Allproducts}
          title="Products"
          timer={true}
        />
        <BannerMiddle />
      </Box>
    </>
  );
};
export default Home;
