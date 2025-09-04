import './Hero.css';

const msImages = Array.from({ length: 16 }, (_, i) => `/ms-images/ms-image-${i + 1}.svg`);
const jakshImages = Array.from({ length: 16 }, (_, i) => `/jaksh-images/jaksh-image-${i + 1}.svg`);

const ImageColumn = ({ images, className, reverse }) => (
  <div className={`image-column ${className} ${reverse ? 'reverse' : ''}`}>
    {images.map((src, index) => (
      <img key={index} src={src} alt="" className="grid-image" />
    ))}
    {images.map((src, index) => (
      <img key={index + images.length} src={src} alt="" className="grid-image" />
    ))}
  </div>
);

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-split left">
          <div className="image-grid">
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <ImageColumn key={colIndex} images={msImages} className={`col-${colIndex}`} />
            ))}
          </div>
          <div className="overlay">
            <div className="cloud"></div>
            <h1 className="hero-title-overlay">MS Labels</h1>
          </div>
        </div>
        <div className="hero-split right">
          <div className="image-grid">
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <ImageColumn key={colIndex} images={jakshImages} className={`col-${colIndex}`} reverse />
            ))}
          </div>
          <div className="overlay">
            <div className="cloud"></div>
            <h1 className="hero-title-overlay">Jaksh Collection</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;