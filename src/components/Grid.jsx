import React from 'react';
import './css/Grid.css';

export default function Grid({
  children,
  colsDesktop = 4,
  colsTablet = 2,
  colsMobile = 1,
}) {
  return (
    <div
      className="compassion-grid"
      style={{
        '--cols-desktop': colsDesktop,
        '--cols-tablet': colsTablet,
        '--cols-mobile': colsMobile,
      }}
    >
      {children}
    </div>
  );
}
