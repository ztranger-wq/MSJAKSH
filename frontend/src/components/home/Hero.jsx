import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;

    let particlesArray;

    const mouse = {
      x: null,
      y: null,
      radius: (canvas.height / 120) * (canvas.width / 120)
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(229, 0, 0, 0.5)';
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
    }

    init();
    animate();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = canvas.offsetHeight;
        init();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
      cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <section className="hero-section">
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      <div className="container hero-content">
        <h1 className="hero-title">Ultimate Solution for Narrow Fabric Excellence</h1>
        <p className="hero-subtitle">From Concept to Creation, we deliver high-quality custom labels, tags, and more.</p>
        <Link to="/products" className="button-primary">
          Explore Our Products
        </Link>
      </div>
    </section>
  );
};

export default Hero;