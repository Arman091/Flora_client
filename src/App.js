import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/cart/Cart";
import useFcmToken from "./firebase/useFcmToken";
import { useEffect ,useState} from "react";
const filePath='./firebase-messaging-sw.js'
function App() {
  const { token, permissionStatus } = useFcmToken();
  
  useEffect(() => {
    if(permissionStatus){
    console.log(`Notification permission is ${permissionStatus}`);
    }
    else{
     console.log(`Notification permission is Not Granted`);
    }
  }, [permissionStatus]);

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
