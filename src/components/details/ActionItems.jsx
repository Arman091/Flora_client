import { ShoppingCart, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useState } from "react";
import { CART } from "../../constants/routes";
import Button from "../common/button";

const ActionItems = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = product;

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate(CART);
  };

  return (
    <div className="min-w-[40%] pt-10 pl-20">
      <div className="h-[80%] w-[90%] border border-product-image mb-8">
        <img
          src={product.detailUrl}
          alt="img"
          className=" md:h-[300px] w-full  p-[15px]"
        />
      </div>
      <Button
        onClick={() => addItemToCart()}
        className="mr-2.5 h-[45px] w-[45%] rounded-[5px]"
      >
        <ShoppingCart />
        Add To Bag
      </Button>
      <Button className="h-[45px] w-[45%] rounded-[5px]">
        <Zap size={24} /> Buy it Now
      </Button>
    </div>
  );
};

export default ActionItems;
