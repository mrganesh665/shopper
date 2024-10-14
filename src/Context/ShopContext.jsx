import { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

// Function to initialize the cart with default values
const getDefaultCart = () => {
  const cart = {};
  // Initialize each product in the cart with 0 items
  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0; // Note: Adjusted to use index < all_product.length
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) + 1; // Ensure no undefined error
      return { ...prev, [itemId]: newCount };
    });
    console.log(cartItems);
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1; // Ensure no negative counts
      return { ...prev, [itemId]: Math.max(newCount, 0) }; // Prevent negative item counts
    });
  };

  // Function to calculate the total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Function to calculate the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += Math.max(cartItems[item], 0); // Prevent counting negative values
    }
    return totalItem;
  };

  // Context value to be provided to children
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
