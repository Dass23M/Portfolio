import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Navbar.css';
import logo from '../../assets/logo-no-background.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [menu, setMenu] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const actionRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback((section) => {
    setMenu(section);
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Initial animations
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        menuRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        actionRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

    // ScrollTrigger for navbar background
    gsap.to(navbarRef.current, {
      backgroundColor: 'rgba(30, 41, 59, 0.95)',
      backdropFilter: 'blur(8px)',
      duration: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
    });

    // Mobile menu animation
    if (mobileMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.5, ease: 'power3.inOut' }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar" ref={navbarRef} aria-label="Main navigation">
      <div className="navbar-logo" ref={logoRef}>
        <img src={logo} alt="Methmal Logo" />
      </div>

      <div
        className="menu-icon"
        onClick={toggleMenu}
        role="button"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      <ul
        className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}
        ref={menuRef}
        role="menubar"
      >
        {['Hero', 'About', 'NewAbout', 'Projects', 'Contact'].map((section) => (
          <li key={section} role="none">
            <AnchorLink
              href={`#${section}`}
              onClick={() => handleLinkClick(section)}
              className={menu === section ? 'active-link' : ''}
              role="menuitem"
            >
              {section === 'Hero'
                ? 'Home'
                : section === 'NewAbout'
                ? 'Services'
                : section}
            </AnchorLink>
          </li>
        ))}
        {mobileMenuOpen && (
          <li className="navbar-action-mobile" role="none">
            <AnchorLink
              href="#Contact"
              className="action-button"
              onClick={() => handleLinkClick('Contact')}
              role="menuitem"
            >
              Connect with me
            </AnchorLink>
          </li>
        )}
      </ul>

      <div className="navbar-action" ref={actionRef}>
        <AnchorLink href="#Contact" className="action-button">
          Connect with me
        </AnchorLink>
      </div>
    </nav>
  );
};

export default Navbar;