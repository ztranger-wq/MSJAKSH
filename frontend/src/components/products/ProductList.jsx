import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const API_URL = 'http://localhost:5001/api/products';

const ProductList = ({ brand, category, searchTerm, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (brand) params.append('brand', brand);
        if (category && category !== 'all') params.append('category', category);
        if (searchTerm) params.append('search', searchTerm);
        if (limit) params.append('limit', limit);

        const { data } = await axios.get(`${API_URL}?${params.toString()}`);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (err.code === "ERR_NETWORK") {
          setError("Network Error: Could not connect to the server. Please ensure the backend is running.");
        } else {
          setError("An error occurred while loading products.");
        }
      } finally {
        setLoading(false);
      }
    };
    // Debounce search term to avoid excessive API calls
    const timer = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(timer);
  }, [brand, category, searchTerm, limit]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  if (products.length === 0) return <div>No products found.</div>;

  return (
    <div className="product-list-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;