import { Typography, Box, MenuItem, MenuList, Paper, Popper, styled } from "@mui/material";
import React from "react";
import { useState, useRef } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuth } from "../../context/AuthProvider";
import { useClickOutside } from "../../shared/helpers";

const Dropdown = styled(Paper)`
  margin-top: 5px;
  z-index: 1500;
`;

const Signout = styled(Typography)`
  font-size: 14px;
  margin-right:12px;
`;

const SignoutIcon = styled(PowerSettingsNewIcon)`
  color: var(--color-text-primary);
`;

const LogoutProfile = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const ref = useRef(null);

  useClickOutside(ref, () => setAnchorEl(null));

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ref={ref}>
      <Typography 
        onClick={handleClick}
        style={{ marginTop: 3, cursor:"pointer", color: "var(--color-text-primary)", marginRight: 18 }}>
        {user?.firstName || user?.name }
      </Typography>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 1500 }} disablePortal>
        <Dropdown>
          <MenuList>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              <SignoutIcon  className="myicon"/>
              <Signout>Sign Out</Signout>
            </MenuItem>
          </MenuList>
        </Dropdown>
      </Popper>
    </Box>
  );
};

export default LogoutProfile;
