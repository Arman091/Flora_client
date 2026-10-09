import React from "react";
import { BadgePercent } from "lucide-react";

const DiscountIcon = () => (
  <BadgePercent size={12} className="mr-[5px] text-success" />
);

const ProductDetails2 = ({ product }) => {
  return (
    <>
      <p>{product.title.longTitle}</p>
      <p className="mt-[5px] text-sm text-text-muted">8 Rating & Reviews</p>
      <p>
        <span className="text-[28px]">₹{product.price.cost}</span>
        &nbsp;
        <span>
          <strike>₹{product.price.mrp}</strike>
        </span>
        &nbsp;
        <span>{product.price.discount}</span>
      </p>
      <p>Available Offers</p>
      <div>
        <p className="pt-[7px] text-sm flex items-center ">
          <DiscountIcon /> Get extra 20% off upto ₹200 on 2 items T&C
        </p>
        <p className="pt-[7px] text-sm flex items-center">
          <DiscountIcon />
          Get extra 10% off on SBI credit card T&C
        </p>
        <p className="pt-[7px] text-sm flex items-center">
          <DiscountIcon /> 20% off upto ₹1000 on HDFC card T&C
        </p>
        <p className="pt-[7px] text-sm flex items-center">
          <DiscountIcon />
          Buy 2 items and save 5% extra T&C
        </p>
      </div>
    </>
  );
};

export default ProductDetails2;
