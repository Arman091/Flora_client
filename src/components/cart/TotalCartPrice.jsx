import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ORDER_CONFIRMATION } from "../../constants/routes";
import Button from "../common/button";

const TotalCartPrice = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const confirmed = () => {
    alert(`Congratulation... Your order is placed`);
    navigate(ORDER_CONFIRMATION);
  };

  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.map((item) => {
      price += +item.price.mrp;
      discount += item.price.mrp - item.price.cost;
    });
    setPrice(price);
    setDiscount(discount);
  };

  return (
    <div className="h-full">
      <div className="mt-[50px] border-b border-grey bg-price-header px-[25px] py-5 text-center font-bold text-black">
        <p>ORDER PRICE DETAILS</p>
      </div>
      <div className="bg-price-panel p-5 text-white">
        <p className="mb-5 text-sm">
          Price of {cartItems?.length} item
          <span className="float-right">₹{price}</span>
        </p>
        <p className="mb-5 text-sm">
          Discount on {cartItems?.length} item
          <span className="float-right">-₹{discount}</span>
        </p>
        <p className="mb-5 text-sm">
          Delivery Charges of {cartItems?.length} item
          <span className="float-right">₹20</span>
        </p>
        <h5 className="mb-5 text-xl">
          Total Ammount of {cartItems?.length} item
          <span className="float-right">₹{price - discount + 20}</span>
        </h5>
        <p className="mb-5 mt-[19px] text-[15px] font-medium text-maroon">
          Congratulations.......You will save ₹{discount - 20} on this order
        </p>
      </div>
      <Button onClick={() => confirmed()} className="w-full bg-maroon">
        Order Now
      </Button>
    </div>
  );
};

export default TotalCartPrice;
