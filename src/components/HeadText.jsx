import React from 'react';
import './css/HeadText.css';
export default function HeadText({ head, text }) {
  return (
    <div className="sb-headText">
      <h3>{head}</h3>
      <p>{text}</p>
    </div>
  );
}
