import React from 'react';
import './css/Footer.css';

export default function Footer({ left, right, children }) {
  return (
    <footer className="sb-footer">
      {left && <div>{left}</div>}
      {children}
      {right && <div>{right}</div>}
    </footer>
  );
}
