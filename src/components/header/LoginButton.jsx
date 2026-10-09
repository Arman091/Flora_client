import React from "react";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import LoginDialog from "../login/Login";
import { useState } from "react";
import LogoutProfile from "./LogoutProfile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthProvider";
import { CART } from "../../constants/routes";
import Button from "../common/button";

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { cartItems } = useSelector((state) => state.cart);
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="ml-auto mt-6 mr-[3%] flex">
      {user ? (
        <LogoutProfile user={user} />
      ) : (
        <Button
          variant="ghost"
          onClick={() => openDialog()}
          className="mr-10 h-8 text-[15px]"
        >
          Login
        </Button>
      )}
      <Link
        to={CART}
        className="flex pt-[5px] text-text-primary no-underline"
      >
        <span className="relative">
          <ShoppingCartIcon />
          {cartItems?.length > 0 && (
            <span className="absolute top-0 right-0 flex h-5 min-w-[20px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-badge px-1.5 text-xs text-white">
              {cartItems?.length}
            </span>
          )}
        </span>
        <span className="ml-2.5 mr-10">Cart</span>
      </Link>
      <LoginDialog open={open} setOpen={setOpen} />
    </div>
  );
};
export default LoginButton;
