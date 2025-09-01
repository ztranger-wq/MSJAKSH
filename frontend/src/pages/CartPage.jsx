import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeItemFromCart, addItemToCart, loading } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.product ? item.product.price * item.quantity : 0), 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="container cart-page">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="button-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div>
            {cart.map(item => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.product.name}</h3>
                  <p>₹{item.product.price.toFixed(2)}</p>
                </div>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity) && newQuantity > 0) {
                        addItemToCart(item.product, newQuantity);
                      }
                    }}
                    min="1"
                    className="form-input"
                    style={{ width: '60px', textAlign: 'center' }}
                  />
                </div>
                <button onClick={() => removeItemFromCart(item.product._id)} className="button-danger">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Subtotal: ₹{total.toFixed(2)}</h2>
            <button onClick={handleCheckout} className="button-primary">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
