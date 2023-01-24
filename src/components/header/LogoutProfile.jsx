import { Typography, Box, MenuItem, Menu, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
const Component = styled(Menu)`
  margin-top: 5px;
`;

const Signout = styled(Typography)`
  font-size: 14px;
  margin-right:12px;

`;

const SignoutIcon = styled(PowerSettingsNewIcon)`
  color: white;

`;

const LogoutProfile = ({ accountName, setAccountName }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    setAccountName("");
  };


  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginTop: 3, cursor:"pointer" }}>{accountName}</Typography>
        <Component
          id="basic-menu"
          anchorEl={open}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              Logout();
            }}
          >
            <SignoutIcon  className="myicon"/>
            <Signout>Sign Out</Signout>
          </MenuItem>
        </Component>
      </Box>
    </>
  );
};

export default LogoutProfile;
