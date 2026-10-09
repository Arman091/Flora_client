import React from "react";
import Search from "./Search";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import { LOGO } from "../../lib/config";
import { HOME } from "../../constants/routes";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-[1100] h-[90px] bg-bg-primary">
      <div className="mr-[10%] flex h-full items-center justify-between">
        <Link to={HOME}>
          <div className="ml-[30px] flex h-[75px] w-[251px] items-center justify-center">
            <img
              src={LOGO}
              alt="logo"
              className="mt-4 h-full w-full object-contain"
            />
          </div>
        </Link>
        {/* <Search />   */}
        <div className="flex w-1/2">
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
