// React Component to list down a nav-bar directing to different pages of the app
import React from 'react';
import { Link } from 'react-router-dom'; // wrapper around the HTML <a> tag (to use <a> tag in react-router)

// const array to contain link paths
const LINKS = [
  { to: '/', linkName: 'Home' },
  { to: '/starred', linkName: 'Starred' },
];

const Navs = () => {
  return (
    <div>
      <ul>
        {LINKS.map(item => (
          <li key={item.to}>
            <Link to={item.to}>{item.linkName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
