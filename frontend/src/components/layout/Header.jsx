import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container container">
        <div className="logo-container">
          <Link to="/" onClick={closeMobileMenu} className="logo-link">
            <img src="/logo.png" alt="MS Enterprises Logo" className="logo-img" />
            <span className="logo-text">MS Enterprises</span>
          </Link>
        </div>
        <nav className="desktop-nav">
          <NavLink to="/" className="nav-link">About</NavLink>
          <NavLink to="/products" className="nav-link">Products</NavLink>
          <NavLink to="/jaksh" className="nav-link jaksh-link">Jaksh</NavLink>
          <NavLink to="/cart" className="nav-link cart-link">
            <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </NavLink>
          {user && (
            <NavLink to="/wishlist" className="nav-link wishlist-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="wishlist-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            </NavLink>
          )}
          {user ? (
            <NavLink to="/profile" className="nav-link profile-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM12 21a9 9 0 100-18 9 9 0 000 18z" />
              </svg>
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link">Login/Sign Up</NavLink>
          )}
        </nav>
        <div className="mobile-menu-button-container">
          <button onClick={toggleMobileMenu} className="mobile-menu-button">
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>About</NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>Products</NavLink>
          <NavLink to="/jaksh" className="mobile-nav-link jaksh-link" onClick={closeMobileMenu}>Jaksh</NavLink>
          <NavLink to="/cart" className="mobile-nav-link" onClick={closeMobileMenu}>
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </NavLink>
          {user && (
            <NavLink to="/wishlist" className="mobile-nav-link" onClick={closeMobileMenu}>Wishlist</NavLink>
          )}
          {user ? (
            <>
              <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>My Profile</NavLink>
            </>
          ) : (
            <NavLink to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>Login/Sign Up</NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
