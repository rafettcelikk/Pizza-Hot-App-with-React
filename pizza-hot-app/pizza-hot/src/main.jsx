import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { UIProvider } from "./context/UIContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </UIProvider>
  </StrictMode>
);
