import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/cart/Cart";
import useFcmToken from "./firebase/useFcmToken";
import { useEffect } from "react";
const filePath='./firebase-messaging-sw.js'
function App() {
  const { token, permissionStatus } = useFcmToken();
  console.log(`Notification permission is ${permissionStatus}`);
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .then((registration) => {
           
  //       })
  //       .catch((error) => {
  //         // Service worker registration failed silently
  //       });
  //   }
  // }, []);
  return (
    <DataProvider>
        <Header />
        <Box style={{ marginTop: 55 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>
    </DataProvider>
  );
}

export default App;
