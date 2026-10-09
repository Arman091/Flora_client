import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalCartPrice from "./TotalCartPrice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      {cartItems.length ? (
        <div className="flex flex-wrap px-[135px] py-[30px] max-md:px-0 max-md:py-5">
          <div className="w-full pr-5 md:w-1/2 max-sm:mb-5">
            <div className="mt-[50px] rounded-[6px] bg-maroon p-5 text-center text-white">
              <p>My Cart( {cartItems.length})</p>
            </div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="w-full md:w-1/2">
            <TotalCartPrice cartItems={cartItems} />
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default Cart;
