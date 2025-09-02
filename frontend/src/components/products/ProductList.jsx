import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';
import { useDebounce } from '../../hooks/useDebounce';

const API_URL = '/api/products';

const ProductList = ({ brand, category, searchTerm, limit, sortOrder }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (brand) params.append('brand', brand);
        if (category) params.append('category', category);
        if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
        if (limit) params.append('limit', limit);
        if (sortOrder) params.append('sort', sortOrder);

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
    
    fetchProducts();
  }, [brand, category, debouncedSearchTerm, limit, sortOrder]);

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