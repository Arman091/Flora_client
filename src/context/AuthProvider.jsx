import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  });

  const [accessToken, setAccessTokenState] = useState(
    () => localStorage.getItem("accessToken") || ""
  );

  const login = (userData, token) => {
    setUser(userData || null);
    setAccessTokenState(token || "");

    if (userData) {
      localStorage.setItem("authUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("authUser");
    }

    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessTokenState("");
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      login,
      logout,
      isAuthenticated: Boolean(accessToken),
    }),
    [user, accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

