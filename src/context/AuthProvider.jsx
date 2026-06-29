import React, { createContext, useContext, useMemo, useState } from "react";
import { URL } from "../lib/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("authUser");
    return raw ? JSON.parse(raw) : null;
  });

  const [accessToken, setAccessTokenState] = useState(
    () => localStorage.getItem("accessToken") || ""
  );

  const [refreshToken, setRefreshTokenState] = useState(
    () => localStorage.getItem("refreshToken") || ""
  );

  const login = (userData, token, refToken) => {
    setUser(userData || null);
    setAccessTokenState(token || "");
    setRefreshTokenState(refToken || "");

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

    if (refToken) {
      localStorage.setItem("refreshToken", refToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
  };

  const logout = async () => {
    const refToken = localStorage.getItem("refreshToken");
    try {
      await fetch(`${URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refToken }),
      });
    } catch {
      // best-effort: proceed with local cleanup even if the request fails
    }
    setUser(null);
    setAccessTokenState("");
    setRefreshTokenState("");
    localStorage.removeItem("authUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      login,
      logout,
      isAuthenticated: Boolean(accessToken),
    }),
    [user, accessToken, refreshToken]
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
