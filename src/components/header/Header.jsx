import React from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import Search from "./Search";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import './Header.css'
const StyledHeader = styled(AppBar)`
  
  
  height: 100px;
`;

const CustomWraper = styled(Box)`
  margin: 0 5% 0 auto;
`;
const Header = () => {
  return (
    <div>
      <StyledHeader style={{ 'backgroundColor': "black"}} >
        <Toolbar className="mytoolbar">
          <Link to="/">
            <img
              src="../images/logo.png"
              alt="logo"
              style={{ width: 200, height: 80, marginLeft: 30 }}
            />
          </Link>
          <Search />  
          <CustomWraper>
            <LoginButton />
          </CustomWraper>
        </Toolbar>
      </StyledHeader>
    </div>
  );
};

export default Header;
