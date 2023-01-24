import { Box, styled, Typography, Button } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RightHeader = styled(Box)`
  padding: 20px 25px;
  text-align: center;
  background: #DBDEBA;
  color:black;
  font-weight:Bold;
  margin-top:50px;
  border-bottom: 1px solid grey;
`;

const Rupees = styled(Box)`
  float: right;
`;
const RightDownBox = styled(Box)`
  padding: 20px 20px;
  background-color: #278d8d;
  color:white;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`;

const RightBox = styled(Box)`
  // box-shadow: 0 -2px 10px 0 rgb(0 0 0/20%);
  height: 100%;
`;

const TotalCartPrice = ({ cartItems }) => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const confirmed = () => {
    alert(`Congratulation... Your order is placed`);
    navigate("/orderConfirmation");
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
    <RightBox>
      <RightHeader>
        <Typography>ORDER PRICE DETAILS</Typography>
      </RightHeader>
      <RightDownBox>
        <Typography>
          Price of {cartItems?.length} item
          <Rupees component="span">₹{price}</Rupees>
        </Typography>
        <Typography>
          Discount on {cartItems?.length} item
          <Rupees component="span">-₹{discount}</Rupees>
        </Typography>
        <Typography>
          Delivery Charges of {cartItems?.length} item
          <Rupees component="span">₹20</Rupees>
        </Typography>
        <Typography variant="h5">
          Total Ammount of {cartItems?.length} item
          <Rupees component="span">₹{price - discount + 20}</Rupees>
        </Typography>
        <Typography style={{ color: "maroon", fontWeight: "500", fontSize: 15, marginTop:"19px" }}>
          Congratulations.......You will save ₹{discount - 20} on this order
        </Typography>
      </RightDownBox>
      <Button
        onClick={() => confirmed()}
        style={{
          width: "100%",
          background: "maroon",
          color: "white",
        }}
      >
        Order Now
      </Button>
    </RightBox>
  );
};

export default TotalCartPrice;
