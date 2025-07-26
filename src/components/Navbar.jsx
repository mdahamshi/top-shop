import './css/Navbar.css';
import { NavLink } from 'react-router-dom';
export default function Navbar({ links = [] }) {
  return (
    <>
      {links.length ? (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <NavLink
                to={`/${link.id === 'home' ? '' : link.id}`}
                className={'clickable'}
              >
                {link.text}{' '}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No links</i>
        </p>
      )}
    </>
  );
}
