import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-no-background.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Navbar = () => {
  const [menu, setMenu] = useState("Hero");

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation Menu */}
      <ul className="navbar-menu">
        <li>
          <AnchorLink
            href="#Hero"
            onClick={() => setMenu("Hero")}
            className={menu === "Hero" ? "active-link" : ""}
          >
            Home
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#About"
            onClick={() => setMenu("About")}
            className={menu === "About" ? "active-link" : ""}
          >
            About Me
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#NewAbout"
            onClick={() => setMenu("NewAbout")}
            className={menu === "NewAbout" ? "active-link" : ""}
          >
            Services
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#Projects"
            onClick={() => setMenu("Projects")}
            className={menu === "Projects" ? "active-link" : ""}
          >
            Projects
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            href="#Contact"
            onClick={() => setMenu("Contact")}
            className={menu === "Contact" ? "active-link" : ""}
          >
            Contact
          </AnchorLink>
        </li>
      </ul>

      {/* Contact Button */}
      <div className="navbar-action">
        <a href="#Contact" className="action-button">
          Connect with me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
