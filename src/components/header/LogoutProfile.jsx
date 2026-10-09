import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const LogoutProfile = ({ user }) => {
  const { logout } = useAuth();

  return (
    <Menu as="div" className="relative mr-[18px] text-left">
      <MenuButton className="mt-[3px] cursor-pointer text-text-primary">
        {user?.firstName || user?.name}
      </MenuButton>
      <MenuItems className="absolute left-0 z-[1300] mt-[5px] w-40 origin-top-left rounded-md border border-divider bg-white py-1 shadow-lg focus:outline-none">
        <MenuItem>
          {({ focus }) => (
            <button
              type="button"
              onClick={logout}
              className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm text-text-primary ${
                focus ? "bg-hover-overlay" : ""
              }`}
            >
              <LogOut
                size={24}
                style={{ color: "var(--color-text-primary)" }}
              />
              <span className="mr-3 text-sm">Sign Out</span>
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default LogoutProfile;
