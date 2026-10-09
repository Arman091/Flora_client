import React from "react";
import OperationButton from "./OperationButton";
import { removeFromCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import Button from "../common/button";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="mt-0.5 flex rounded-[3px] border-t border-grey bg-deal-band">
      <div>
        <img
          src={item.url}
          alt="cartItem"
          className="h-[110px] w-[110px]"
        />
        <OperationButton />
      </div>
      <div className="m-[15px] flex flex-col font-[cursive]">
        <p>{item.title.longTitle}</p>
        <p>{item.title.sortTitle}</p>
        <p className="my-2.5">
          <span className="text-[28px]">₹{item.price.cost}</span>
          &nbsp;
          <span>
            <strike>₹{item.price.mrp}</strike>
          </span>
          &nbsp;
          <span>{item.price.discount}</span>
        </p>
        <Button
          onClick={() => removeItem(item.id)}
          className="mt-5 rounded-[3px] bg-remove text-base"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
