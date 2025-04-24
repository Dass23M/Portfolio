import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-no-background.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [menu, setMenu] = useState("Hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const actionRef = useRef(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (section) => {
    setMenu(section);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Initial animations on page load
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      menuRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    );

    gsap.fromTo(
      actionRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // ScrollTrigger for navbar background opacity
    gsap.to(navbarRef.current, {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      duration: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
    });
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-logo" ref={logoRef}>
        <img src={logo} alt="Logo" />
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`} ref={menuRef}>
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

      <div className="navbar-action" ref={actionRef}>
        <a href="#Contact" className="action-button">
          Connect with me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;