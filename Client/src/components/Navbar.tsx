// css styles import
import "./css/navbar.css";

// libraries import 
import React from 'react';
import { Link } from 'react-router-dom';
import { MapFilter } from "./MapFilter";

export interface navbarPropsInterface {

}

function NavBar(props: navbarPropsInterface) {
  return (
    <nav className="navbar-container">
      <ul>
        Navbar
        <li><Link to="/">Map</Link></li>
        <li><Link to="/data">Data</Link></li>
        <li><Link to="/take-action">Take Action</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
