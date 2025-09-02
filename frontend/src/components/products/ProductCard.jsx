import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { user, wishlist, toggleWishlist } = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const isLiked = wishlist.some(p => p._id === product._id);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    if (product && product._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.error('Product ID is missing');
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      console.error('Product is missing');
      return;
    }
    try {
      addItemToCart(product);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  // ONLY CHANGE: Replace this function
  const handleLike = async () => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      navigate('/login');
      return;
    }

    try {
      await toggleWishlist(product._id);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img src={product.images[0]} alt={product.name} className="product-image" />
        <button onClick={handleLike} className={`like-btn ${isLiked ? 'liked' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="font-bold text-lg">₹{product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`button-primary add-to-cart-btn ${isAdded ? 'added' : ''}`}
            disabled={isAdded}
          >
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
