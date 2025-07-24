import React from 'react';
import './css/Grid.css';
import Griditem from './Griditem';
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
      {children.map((child, index) => (
        <div key={child.id ? child.id : index} className="grid-item">
          <Griditem
            title={child.title}
            description={child.description}
            image={child.image}
            price={child.price}
            count={child.rating.count}
            rate={child.rating.rate}
          />
        </div>
      ))}
    </div>
  );
}
