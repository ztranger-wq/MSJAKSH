import { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { 
  FiMenu, 
  FiX, 
  FiShoppingCart, 
  FiHeart, 
  FiUser, 
  FiLogOut,
  FiHome,
  FiPackage,
} from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <img
              src="/logo.png"
              alt="MS Enterprise"
              className="logo-img"
            />
            <span className="logo-text">MS Enterprise</span>
          </Link>
        </div>

        <nav className="desktop-nav">
          <NavLink to="/" className="nav-link">
            <FiHome className="nav-icon" />
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link">
            <FiPackage className="nav-icon" />
            Products
          </NavLink>
          <NavLink to="/jaksh" className="nav-link jaksh-link">
            Jaksh
          </NavLink>
        </nav>

        <div className="profile-menu desktop-nav">
          {user ? (
            <>
              <Link to="/wishlist" className="nav-link wishlist-icon-link">
                <FiHeart className="wishlist-icon" />
                <span className="sr-only">Wishlist</span>
              </Link>
              <Link to="/cart" className="nav-link cart-link">
                <FiShoppingCart className="cart-icon" />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
              <Link to="/profile" className="nav-link profile-icon-link">
                <FiUser className="profile-icon" />
                <span className="sr-only">Profile</span>
              </Link>
              <button onClick={logout} className="nav-link logout-button">
                <FiLogOut className="logout-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>

        <div className="mobile-menu-button-container">
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FiX className="menu-icon" />
            ) : (
              <FiMenu className="menu-icon" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
            <FiHome className="mobile-nav-icon" />
            Home
          </NavLink>
          <NavLink to="/products" className="mobile-nav-link" onClick={closeMobileMenu}>
            <FiPackage className="mobile-nav-icon" />
            Products
          </NavLink>
          <NavLink to="/jaksh" className="mobile-nav-link" onClick={closeMobileMenu}>
            Jaksh
          </NavLink>
          
          {user ? (
            <>
              <NavLink to="/wishlist" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FiHeart className="mobile-nav-icon" />
                Wishlist
              </NavLink>
              <NavLink to="/cart" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FiShoppingCart className="mobile-nav-icon" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </NavLink>
              <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FiUser className="mobile-nav-icon" />
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="mobile-nav-link"
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'center' }}
              >
                <FiLogOut className="mobile-nav-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
                Login
              </NavLink>
              <NavLink to="/register" className="mobile-nav-link" onClick={closeMobileMenu}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;