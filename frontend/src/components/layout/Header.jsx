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
          <Link to="/" onClick={closeMobileMenu}>
            <img src="https://placehold.co/140x40/ffffff/1a1a1a?text=MS+Enterprises&font=inter" alt="MS Enterprises Logo" className="logo-img" />
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
          {user ? (
            <div className="profile-menu">
               <NavLink to="/profile" className="nav-link">My Profile</NavLink>
               <button onClick={logout} className="nav-link logout-button">Logout</button>
            </div>
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
          {user ? (
            <>
              <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>My Profile</NavLink>
              <button onClick={() => { logout(); closeMobileMenu(); }} className="mobile-nav-link logout-button">Logout</button>
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
