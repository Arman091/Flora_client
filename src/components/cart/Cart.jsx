import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, styled, Button } from "@mui/material";
import CartItem from "./CartItem";
import TotalCartPrice from "./TotalCartPrice";
import CartEmpty from "./CartEmpty";

const MainGrid = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  [theme.breakpoints.down("md")]: {
    padding: "20px 0",
  },
}));
const LeftHeader = styled(Box)`
  padding: 20px 20px;
  background: maroon;
  color:white;
  border-radius:6px;
  text-align: center;
  margin-top:50px;
`;

const LeftGrid = styled(Grid)(({ theme }) => ({
  paddingRight: "20px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: 20,
  },
}));

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  //    console.log(cartItems)

  return (
    <>
      {cartItems.length ? (
        <MainGrid container>
          <LeftGrid item lg={6} md={6} sm={12} xs={12}>
            <LeftHeader>
              <Typography>My Cart( {cartItems.length})</Typography>
            </LeftHeader>
            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
          </LeftGrid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TotalCartPrice cartItems={cartItems} />
          </Grid>
        </MainGrid>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default Cart;
