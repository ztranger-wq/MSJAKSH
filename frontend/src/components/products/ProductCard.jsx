import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { user, wishlist, toggleWishlist } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const isLiked = wishlist.some(p => p._id === product._id);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addItemToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleLike = () => {
    if (!user) {
      // In a real app, you might show a login modal here
      alert('Please log in to add items to your wishlist.');
      return;
    }
    toggleWishlist(product._id);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`${product.name} ${index + 1}`} className="slider-image" style={{ opacity: index === currentImageIndex ? 1 : 0 }} />
        ))}
        {product.images.length > 1 && (
          <div className="slider-nav">
            <button onClick={prevImage} className="slider-btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button onClick={nextImage} className="slider-btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        )}
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