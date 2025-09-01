import './JakshSubNav.css';

const JakshSubNav = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <nav className="jaksh-sub-nav">
      <div className="container">
        {categories.map(category => (
          <button
            key={category}
            className={`sub-nav-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default JakshSubNav;