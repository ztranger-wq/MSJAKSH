import { Link } from 'react-router-dom';
import ProductList from '../products/ProductList';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  return (
    <section id="products" className="featured-products-section">
      <div className="container">
        <h2>Our Products</h2>
        <div className="featured-products-list">
            {/* We pass a limit to the ProductList to only show 3 */}
            <ProductList brand="MS" limit={3} />
        </div>
        <div className="view-all-container">
          <Link to="/products" className="button-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;