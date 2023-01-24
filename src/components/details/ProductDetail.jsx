import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/actions/productAction";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Grid, styled } from "@mui/material";
import ActionItems from "./ActionItems";
import ProductDetails2 from "./ProductDetails2";

const Component = styled(Box)`
   background-color: #FEFFEC;
   margin:auto;
  margin-top: 120px;
  width:95%;
`;

const Container = styled(Grid)`
  background-color: white;
  display: flex;
  height:500px
`;

const RightContainer = styled(Grid)`
  margin-top: 50px;
  margin-left: 50px;
`;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.getProductDetail);

  useEffect(() => {
    if (product && id !== product.id) dispatch(getProductDetail(id));
  }, [dispatch, product, loading]);

  return (
    <Component>
      {product && Object.keys(product).length && (
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItems product={product} />
          </Grid>
          <RightContainer item lg={4} md={4} sm={8} xs={12}>
            <ProductDetails2 product={product} />
          </RightContainer>
        </Container>
      )}
    </Component>
  );
};

export default ProductDetail;
