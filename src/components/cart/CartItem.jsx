import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import OperationButton from "./OperationButton";
import { removeFromCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux"; 

const ComponentWraper = styled(Box)`
  border-top: 1px solid grey;
  display: flex;
  background: #FEFFEC;
  border-radius: 3px;
  margin-top:2px;
`;
const LeftBox = styled(Box)`
  margin: 15px;
  display: flex;
  flex-direction: column;
  font-family:cursive;
`;

const RemoveButton = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: white;
  background-color: #679289;
  border-radius: 3px;
`;

const CartItem = ({ item }) => {

const dispatch = useDispatch()
  const removeItem =(id)=>{
dispatch(removeFromCart(id))

  }


  return (
    <ComponentWraper style={{  }}>
      <Box>
        <img src={item.url} alt="cartItem" style={{height: 110, width: 110}} />
        <OperationButton />
      </Box>
      <LeftBox>
        <Typography>{item.title.longTitle}</Typography>
        <Typography>{item.title.sortTitle}</Typography>
         
        <Typography style={{ margin: "10px 0" }}>
          <Box component="span" style={{ fontSize: 28 }}>
            ₹{item.price.cost}
          </Box>
          &nbsp;
          <Box component="span">
            <strike>₹{item.price.mrp}</strike>
          </Box>
          &nbsp;
          <Box component="span">{item.price.discount}</Box>
        </Typography>
        <RemoveButton onClick={()=> removeItem(item.id)}>Remove</RemoveButton>
      </LeftBox>

    </ComponentWraper>
  );
};

export default CartItem;
