import React from "react";
import {
  NavLink
} from "react-router-dom";
import { FaUser } from 'react-icons/fa';

import './navbar.scss';

function Navbar(props:any) {
  return (
  <nav>
    <input type="checkbox" id="check" />
    <label htmlFor="check" className="checkbtn">
      <FaUser/>
    </label>
    <label className="logo">Logo</label>
    <ul>
      <li>
        <NavLink 
        to="/"
        >
          home
        </NavLink>
      </li>
      <li>
        <NavLink
        to="/houses"
        >
          Houses
        </NavLink>
      </li>
      <li>
        <NavLink
        to="/contact"
        >
          Contact
        </NavLink>
      </li>
    </ul>
  </nav>
  );
}

export default Navbar;
