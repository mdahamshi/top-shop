import './css/Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

export default function Header({
  title,
  subtitle,
  left = null,
  right = null,
  className = '',
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickAnywhere = () => {
      setMenuOpen(false);
    };

    document.addEventListener('click', handleClickAnywhere);

    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, [menuOpen]);
  return (
    <header className={`header ${className}`}>
      <div className="header-content">
        {left && (
          <Link className="clickable header-side header-left">{left}</Link>
        )}

        <div className="header-main">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
        {right && (
          <div className="header-side header-right">
            <button
              className="clickable menu-toggle"
              onClick={(e) => {
                e.stopPropagation(); // prevent the toggle button from instantly closing the menu
                setMenuOpen((current) => !current);
              }}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
            <nav className={`navbar ${menuOpen ? 'open' : ''} sb-nav`}>
              {right}
            </nav>
            <button className="cart-btn primary clickable">
              <ShoppingCart />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
