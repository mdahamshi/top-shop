import React from 'react';
import './css/Hero.css';
import heroImage from '../../public/hero.webp';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
export default function Hero() {
  const { appName } = useApp();
  return (
    <section className="hero">
      <div className="hero-wrap">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to {appName}</h1>
          <p className="hero-subtitle">
            Discover handpicked products with great deals. Simple, secure, and
            fast shopping.
          </p>
          <Link to="/shop" className="hero-button primary link-btn">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="hero image" />
        </div>
      </div>
    </section>
  );
}
