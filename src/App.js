import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { Routes, Route ,useNavigate} from "react-router-dom";
import ProductDetail from "./components/details/ProductDetail";
import Cart from "./components/cart/Cart";
import useFcmToken from "./firebase/useFcmToken";


function App() {
  const { token, permissionStatus ,latestNotification} = useFcmToken();
  console.log(latestNotification,"latestNotification");
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
