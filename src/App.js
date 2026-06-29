import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { Routes, Route ,useNavigate} from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/cart/Cart";
import {FcmProvider} from "./context/FcmProvider"
import useFcmToken from "./firebase/useFcmToken";
import { HOME, PRODUCT_DETAIL, CART } from "./constants/routes";
import { useEffect } from "react";


function App() {
  const {deviceToken} = useFcmToken();
  useEffect(() => {
    if (deviceToken) {
      console.log("deviceToken", deviceToken);
    }
  }, [deviceToken]);

  return (
    <FcmProvider>
      <DataProvider>
        <Header />
        <Box style={{ marginTop: 55 }}>
          <Routes>
            <Route path={HOME} element={<Home />} />
            <Route path={PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={CART} element={<Cart />} />
          </Routes>
        </Box>
     </DataProvider>
    </FcmProvider>
  );
}

export default App;
