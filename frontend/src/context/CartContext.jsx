import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Import the actual AuthContext

export const CartContext = createContext();

const API_URL = '/api/cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Fetch cart from API if user is logged in, otherwise from localStorage
  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      if (user) {
        // User is logged in, merge local cart with server cart, then fetch
        await mergeGuestCart();
        try {
          const { data } = await axios.get(API_URL);
          setCart(data);
        } catch (error) {
          console.error("Failed to fetch user cart", error);
          setCart([]);
        }
      } else {
        // No user, load from localStorage
        try {
          const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
          setCart(localCart);
        } catch (error) {
          console.error("Failed to parse local cart", error);
          setCart([]);
        }
      }
      setLoading(false);
    };

    initializeCart();
  }, [user]);

  const fetchCart = async () => { // Keep a simple fetch for manual reloads if needed
    setLoading(true);
    if (user) {
      const { data } = await axios.get(API_URL);
      setCart(data);
    }
    setLoading(false);
  }

  const addItemToCart = async (product, quantity = 1) => {
    if (user) {
      const { data } = await axios.post(API_URL, { productId: product._id, quantity });
      setCart(data);
    } else {
      const newCart = [...cart];
      const itemIndex = newCart.findIndex(item => item.product._id === product._id);
      if (itemIndex > -1) {
        newCart[itemIndex].quantity = quantity;
      } else {
        newCart.push({ product, quantity });
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    if (user) {
      // Use same endpoint as addItemToCart which updates quantity if item exists
      const { data } = await axios.post(API_URL, { productId, quantity });
      setCart(data);
    } else {
      // Update guest/local cart
      const newCart = cart.map(item => {
        const pid = item.product ? item.product._id : (item._id || (item.product && item.product._id));
        if (pid === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };


  const removeItemFromCart = async (productId) => {
    if (user) {
      const { data } = await axios.delete(`${API_URL}/${productId}`);
      setCart(data);
    } else {
      const newCart = cart.filter(item => item.product._id !== productId);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const clearCart = async () => {
    if (user) {
      // This would be a "clear all" endpoint on the backend
      // For now, we remove items one by one
      for (const item of cart) {
        await removeItemFromCart(item.product._id);
      }
    }
    setCart([]);
    localStorage.removeItem('cart');
  };

  const clearLocalCart = () => {
    localStorage.removeItem('cart');
  }

  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (guestCart.length > 0) {
      try {
        await axios.post(`${API_URL}/merge`, { guestCart }); // Merge on server
        clearLocalCart(); // Clear local cart after successful merge
      } catch (error) {
        console.error("Failed to merge cart", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addItemToCart,
      removeItemFromCart,
      clearCart,
      fetchCart,
      mergeGuestCart,
      clearLocalCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
