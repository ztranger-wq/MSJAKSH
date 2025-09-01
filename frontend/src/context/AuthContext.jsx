import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = 'http://localhost:5001/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async (token) => {
    try {
      const { data } = await axios.get(`${API_URL}/profile/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      fetchWishlist(userData.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      fetchWishlist(response.data.token);
    }
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setWishlist([]); // Start with an empty wishlist for new users
    }
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    setWishlist([]);
    // Note: We don't clear the cart here, so the guest cart persists on logout
  };

  const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  };

  const resetPassword = async (token, password) => {
    const response = await axios.patch(`${API_URL}/reset-password/${token}`, { password });
    return response.data;
  };

  const updateProfile = async (userData) => {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
    }
    return response.data;
  };

  const deleteAccount = async () => {
    await axios.delete(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    logout(); // On successful deletion, log the user out
  };

  const toggleWishlist = async (productId) => {
    const { data } = await axios.put(`${API_URL}/profile/wishlist`, { productId }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    // Refetch to get populated wishlist
    fetchWishlist(user.token);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword, updateProfile, deleteAccount, wishlist, toggleWishlist }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
