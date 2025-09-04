import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
    const { wishlist = [] } = useContext(AuthContext);

    return (
        <div className="wishlist-page container">
            <div className="wishlist-header">
                <h1 className="wishlist-title">My Wishlist</h1>
                {wishlist.length > 0 && (
                    <p className="wishlist-count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
                )}
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <h2 className="empty-wishlist-title">Your Wishlist is a Blank Canvas</h2>
                    <p className="empty-wishlist-message">
                        Add items you love to your wishlist by clicking the heart icon on any product.
                    </p>
                    <Link to="/products" className="button-primary">
                        Discover Products
                    </Link>
                </div>
            ) : (
                <div className="wishlist-content">
                    {Object.entries(
                        wishlist.reduce((acc, product) => {
                            const brand = product.brand || 'MS';
                            if (!acc[brand]) {
                                acc[brand] = [];
                            }
                            acc[brand].push(product);
                            return acc;
                        }, {})
                    ).map(([brand, products]) => (
                        products.length > 0 && (
                            <section key={brand} className="wishlist-brand-section">
                                <h2 className="brand-title">{brand === 'Jaksh' ? 'Jaksh Products' : 'MS Enterprises Products'}</h2>
                                <div className="product-list-grid">
                                    {products.map((product, index) => (
                                        <ProductCard key={product._id || index} product={product} index={index} />
                                    ))}
                                </div>
                            </section>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
