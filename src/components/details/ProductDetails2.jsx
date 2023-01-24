import React from "react";
import { Typography, Box, styled } from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";

const OffersBox = styled(Box)`
  font-size: 14px;
  & > p {
    font-size: 14px;
    padding-top: 7px;
  }
`;

const DiscountIconCSS = styled(DiscountIcon)`
  margin-right: 5px;
  color: green;
  font-size: 12px;
`;

const ProductDetails2 = ({ product }) => {
  return (
    <>
      <Typography>{product.title.longTitle}</Typography>
      <Typography style={{ marginTop: 5, color: "#878787", fontSize: 14 }}>
        8 Rating & Reviews
      </Typography>
      <Typography>
        <Box component="span" style={{ fontSize: 28 }}>
          ₹{product.price.cost}
        </Box>
        &nbsp;
        <Box component="span">
          <strike>₹{product.price.mrp}</strike>
        </Box>
        &nbsp;
        <Box component="span">{product.price.discount}</Box>
      </Typography>
      <Typography>Available Offers</Typography>
      <OffersBox>
        <Typography>
          <DiscountIconCSS /> Get extra 20% off upto ₹200 on 2 items T&C
        </Typography>
        <Typography>
          <DiscountIconCSS />
          Get extra 10% off on SBI credit card T&C
        </Typography>
        <Typography>
          <DiscountIconCSS /> 20% off upto ₹1000 on HDFC card T&C
        </Typography>
        <Typography>
          <DiscountIconCSS />
          Buy 2 items and save 5% extra T&C
        </Typography>
      </OffersBox>
    </>
  );
};

export default ProductDetails2;
