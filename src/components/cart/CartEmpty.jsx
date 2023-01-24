import { Box, styled, Typography } from "@mui/material";
import React from "react";
import './cart.css'
import { useNavigate } from "react-router-dom";
const MainBox = styled(Box)`
height: 65vh;
width: 80%;
margin: 80px  140px;

`

const Container = styled(Box)`
text-align: center;
width:30%
margin:auto;
margin-top: 140px;
`

const CartEmpty = () => {
  const navigate=useNavigate()
  const additemHandler = () => {
     navigate('/')
  }

  return (
    <MainBox>
      <Container>
        <Typography variant= 'h5'><p className="empty">Cart is Empty</p></Typography>
        <img
          src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="empty"
          style={{width: "40%"}}
        />
        <Typography><div className="Additems" onClick={additemHandler}>Add items in your Cart Now</div></Typography>
      </Container>
    </MainBox>
  );
};

export default CartEmpty;
