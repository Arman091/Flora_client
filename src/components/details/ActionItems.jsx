import { Box, Button, styled } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useState } from "react";
const DetailLeftBox = styled(Box)`
  min-width: 40%;
  padding: 40px 0 0 80px;
`;

const Image = styled("img")`
  padding: 15px;
`;

const ButtonCSS = styled(Button)`
  width: 45%;
  height: 45px;
  border-radius: 5px;
`;
    
const ActionItems = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = product;

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  return (
    <DetailLeftBox>
      <Box
        style={{
          padding: "15 20",
          border: "1px solid #f0f0f0",
          width: "90%",
          height: "80%",
        }}
      >
        <Image src={product.detailUrl} alt="img" width="90%" height="80%" />
      </Box>
      <ButtonCSS
        onClick={() => addItemToCart()}
        variant="contained"
        style={{ marginRight: 10, background: "#51875f" }}
      >
        <ShoppingCart />
        Add To Bag
      </ButtonCSS>
      <ButtonCSS variant="contained" style={{ background: "#51875f" }}>
        <FlashOnIcon /> Buy it Now
      </ButtonCSS>
    </DetailLeftBox>
  );
};

export default ActionItems;
