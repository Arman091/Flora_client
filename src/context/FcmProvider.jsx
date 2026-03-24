import React, { createContext, useContext } from 'react';
import useFcmToken from '../firebase/useFcmToken';

const FcmContext = createContext({
  token: '',
  notificationPermissionStatus: '',
});

export const FcmProvider = ({ children }) => {
  const { token, notificationPermissionStatus } = useFcmToken();
  return (
    <FcmContext.Provider value={{ token, notificationPermissionStatus }}>
      {children}
    </FcmContext.Provider>
  );
};

export const useFcm = () => useContext(FcmContext);
