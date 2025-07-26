import React from 'react';
import './css/GridLinkCard.css';
import { Link } from 'react-router-dom';
export default function GridLinkCard({ children, link }) {
  return (
    <Link to={link} className="grid-card-link grid-card">
      {children}
    </Link>
  );
}
