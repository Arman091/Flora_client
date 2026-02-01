import React from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import Search from "./Search";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import './Header.css'
import { LOGO } from "../../lib/config";
const StyledHeader = styled(AppBar)`
  
  
  height: 90px;
`;

const CustomWraper = styled(Box)`
  width: 50%;
  display: flex;
`;
const Header = () => {
  return (
    <div>
      <StyledHeader style={{ 'backgroundColor': "#00827B"}} >
        <Toolbar className="mytoolbar">
          <Link to="/">
           <div className="logo_container">
            <img
              src={LOGO}
              alt="logo"
               style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // scales logo to fit container
              }}
              />
            </div>
          </Link>
          {/* <Search />   */}
          <CustomWraper>
            <LoginButton />
          </CustomWraper>
        </Toolbar>
      </StyledHeader>
       <style>
        {`
          .logo_container {
            height: 90px;
            margin-left: 30px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
