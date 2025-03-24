import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";
import { UIContext } from "../context/UIContext";
export default function Header() {
  const { color } = useContext(ThemeContext);
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UIContext);
  const totalCartItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header>
      <nav
        className={`navbar navbar-expand bg-${color} border-bottom border-body`}
        data-bs-theme="dark"
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            🍕 Pizza Hot
          </a>
          <button className="btn btn-dark" onClick={() => showCart()}>
            <i className="bi bi-cart3"></i>
            <span className="ms-2">({totalCartItems})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
