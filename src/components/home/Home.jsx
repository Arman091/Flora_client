import React from "react";
import Banner from "./Banner";
import { getAllProducts } from "../../redux/actions/productAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";
import BannerMiddle from "./BannerMiddle";
import Loader from "../loader/loader";

const Home = () => {
  const { loading, products } = useSelector((state) => state.getAllProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      {loading ? (
        <Loader />
      ) : (
        <ProductComponent
          products={products}
          title="Products"
          timer={true}
        />
      )}
      <BannerMiddle />
    </div>
  );
};
export default Home;
