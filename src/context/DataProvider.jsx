import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [accountName, setAccountName] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false)
  return (
    <DataContext.Provider
      value={{
        accountName,
        setAccountName,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
