import { createContext } from "react";
import { useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function updateItem() {}

  function deleteItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function clearAll() {
    dispatch({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    updateItem,
    deleteItem,
    clearAll,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
