import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-no-background.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menu, setMenu] = useState("Hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (section) => {
    setMenu(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {['Hero', 'About', 'NewAbout', 'Projects', 'Contact'].map((section) => (
          <li key={section}>
            <AnchorLink
              href={`#${section}`}
              onClick={() => handleLinkClick(section)}
              className={menu === section ? 'active-link' : ''}
            >
              {section === 'Hero'
                ? 'Home'
                : section === 'NewAbout'
                ? 'Services'
                : section}
            </AnchorLink>
          </li>
        ))}
      </ul>

      <div className="navbar-action">
        <a href="#Contact" className="action-button">
          Connect with me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
