import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
 
reportWebVitals();
