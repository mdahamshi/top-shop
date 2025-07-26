import React from 'react';
import './css/Copyright.css';
export default function Copyright({
  appName,
  year = new Date().getFullYear(),
}) {
  return (
    <div className="sb-copyright">
      <p>
        {appName} © {year}
        <br />
        Built with ❤️ by{' '}
        <a href="https://sarawebs.com" target="_blank" rel="noopener">
          SaraWebs
        </a>
      </p>
    </div>
  );
}
