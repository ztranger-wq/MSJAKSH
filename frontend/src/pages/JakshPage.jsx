import { useState } from 'react';
import ProductList from '../components/products/ProductList';
import MovingBanner from '../components/jaksh/MovingBanner';
import JakshSubNav from '../components/jaksh/JakshSubNav';
import './JakshPage.css';

const jakshCategories = [
  'All',
  'Badges & Recognition',
  'Corporate & Promotional Merchandise',
  'Event & Branding Solutions',
  'School & Institutional Solutions',
  'Packaging & Gifting'
];

const JakshPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  return (
    <>
      <MovingBanner />
      <JakshSubNav 
        categories={jakshCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="jaksh-page-container">
          <div className="container">
              <div className="page-controls">
                <div className="search-bar">
                    <input type="text" placeholder="Search for Jaksh products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="sort-selector">
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Top Rated</option>
                    </select>
                </div>
              </div>
              <ProductList brand="Jaksh" category={activeCategory === 'All' ? '' : activeCategory} searchTerm={searchTerm} sortOrder={sortOrder} />
          </div>
      </div>
    </>
  );
};

export default JakshPage;