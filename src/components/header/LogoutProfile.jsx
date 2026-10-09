import { Typography, Box, MenuItem, Menu, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
const Component = styled(Menu)`
  margin-top: 5px;
`;

const Signout = styled(Typography)`
  font-size: 14px;
  margin-right:12px;

`;

const LogoutProfile = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  };


  return (
    <>
      <Box onClick={handleClick}>
        <Typography 
          style={{ marginTop: 3, cursor:"pointer", color: "var(--color-text-primary)", marginRight: 18 }}>
          {user?.firstName || user?.name }
        </Typography>
        <Component
          id="basic-menu"
          anchorEl={open}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            <LogOut size={24} className="myicon" style={{ color: "var(--color-text-primary)" }} />
            <Signout>Sign Out</Signout>
          </MenuItem>
        </Component>
      </Box>
    </>
  );
};

export default LogoutProfile;
