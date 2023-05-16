import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { UserProvider } from "./contexts/user.context";
import { CartContextProvider } from "./contexts/cart.context";
import { CategoriesContextProvider } from "./contexts/categories.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </CategoriesContextProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
