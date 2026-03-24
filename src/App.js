import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { Routes, Route ,useNavigate} from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/cart/Cart";
import {FcmProvider} from "./context/FcmProvider"
import useFcmToken from "./firebase/useFcmToken";


function App() {
  return (
    <FcmProvider>
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
    </FcmProvider>
  );
}

export default App;
