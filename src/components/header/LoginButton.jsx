import React from "react";
import { Badge, Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginDialog from "../login/Login";
import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import LogoutProfile from "./LogoutProfile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ButtonCss = styled(Button)`
  color: white;
  height: 32px;
  font-size: 15px;
  text-transform: none;
`;

const BoxWraper = styled(Box)`
  display: flex;
  margin: 0 3% 0 auto;
  & > Button,
  & > p {
    margin-right: 40px;
  }
`;

const CartBox = styled(Link)`
  display: flex;
  text-decoration: none;
  color: white;
  padding-top:5px
`;

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  const { accountName, setAccountName } = useContext(DataContext);
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems.length);
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <BoxWraper>
      { accountName ? (
        <LogoutProfile
          accountName={accountName}
          setAccountName={setAccountName}
        />
      ) : (
        <ButtonCss onClick={() => openDialog()}>Login</ButtonCss>
      )}
      <CartBox to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <Typography style={{marginLeft: 10}}>Cart</Typography>
      </CartBox>
      <LoginDialog open={open} setOpen={setOpen}  />
    </BoxWraper>
  );
};
export default LoginButton;
