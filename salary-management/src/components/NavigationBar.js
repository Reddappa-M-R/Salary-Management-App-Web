import React from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/" className="home-link">Home</Link>
        </li>
        <li>
          <Link to="/needs" className="needs-link">Needs</Link>
        </li>
        <li>
          <Link to="/desires" className="desires-link">Desires</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
