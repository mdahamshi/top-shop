import React from 'react';
import './css/Footer.css';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { appName } = useApp();
  return (
    <footer className="sb-footer">
      <div>
        <p>
          {appName} © 2025
          <br />
          Built with ❤️ by{' '}
          <a href="https://sarawebs.com" target="_blank" rel="noopener">
            SaraWebs
          </a>
        </p>
      </div>
    </footer>
  );
}
