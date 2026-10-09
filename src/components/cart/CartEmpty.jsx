import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routes";
import Button from "../common/button";

const CartEmpty = () => {
  const navigate = useNavigate();
  const additemHandler = () => {
    navigate(HOME);
  };

  return (
    <div className="my-[80px] mx-[140px] h-[65vh] w-[80%]">
      <div className="mx-auto mt-[140px] w-[30%] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="mx-auto mt-2.5  text-[24px] font-[fantasy] font-bold text-cart-empty">
          Cart is Empty
        </h2>
        <img
          src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          alt="empty"
          className="w-[90%]"
        />
        <Button
          type="button"
          onClick={additemHandler}
          className="mt-2.5 h-[33px]  rounded-[23px] border border-black bg-cart-cta pt-2 mt-8 hover:bg-cart-cta-hover font-bold hover:scale-[1.3]"
        >
          Add items in your Cart Now
        </Button>
      </div>
    </div>
  );
};

export default CartEmpty;
