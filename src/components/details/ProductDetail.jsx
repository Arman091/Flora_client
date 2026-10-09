import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import ActionItems from "./ActionItems";
import ProductDetails2 from "./ProductDetails2";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.getProductDetail);

  useEffect(() => {
    if (product && id !== product.id) dispatch(getProductDetail(id));
  }, [dispatch, product, loading]);

  return (
    <div className="mx-auto mt-[120px] w-[95%] bg-deal-band">
      {product && Object.keys(product).length && (
        <div className="flex h-[500px] flex-wrap bg-white">
          <div className="w-full sm:w-2/3 md:w-1/3">
            <ActionItems product={product} />
          </div>
          <div className="mt-[50px] ml-[50px] w-full sm:w-2/3 md:w-1/3">
            <ProductDetails2 product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
