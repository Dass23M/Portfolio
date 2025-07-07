import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

const Navbar = () => {
  const [menu, setMenu] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const actionRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback((section) => {
    setMenu(section);
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const menuItems = [
    { key: 'Hero', label: 'Home', icon: Home },
    { key: 'About', label: 'About', icon: User },
    { key: 'NewAbout', label: 'Services', icon: Settings },
    { key: 'Projects', label: 'Projects', icon: Briefcase },
    { key: 'Contact', label: 'Contact', icon: Mail },
  ];

  const handleMenuItemClick = (section) => {
    handleLinkClick(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLoaded ? 'loaded' : ''}`}
        ref={navbarRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1rem 2rem',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo */}
          <div 
            className="navbar-logo"
            ref={logoRef}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.2s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleMenuItemClick('Hero')}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
              }}>
                M
              </div>
              <span style={{
                background: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Methmal
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul 
            className="navbar-menu"
            ref={menuRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.4s',
            }}
          >
            {menuItems.map((item, index) => (
              <li 
                key={item.key}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${0.4 + index * 0.1}s`,
                }}
              >
                <a
                  href={`#${item.key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuItemClick(item.key);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: menu === item.key ? '#ffffff' : '#d1d5db',
                    background: menu === item.key 
                      ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
                      : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: menu === item.key 
                      ? '0 8px 25px rgba(99, 102, 241, 0.3)' 
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#d1d5db';
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <item.icon size={16} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Action Button */}
          <div 
            className="navbar-action"
            ref={actionRef}
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.8s',
            }}
          >
            <a
              href="#Contact"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('Contact');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
              }}
            >
              <Mail size={16} />
              Connect with me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              backdropFilter: 'blur(10px)',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transitionDelay: '0.6s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
          }}
          onClick={toggleMenu}
        >
          <div 
            className="mobile-menu"
            ref={mobileMenuRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              padding: '2rem',
              animation: 'slideInFromTop 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item, index) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(item.key);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  color: menu === item.key ? '#ffffff' : '#d1d5db',
                  background: menu === item.key 
                    ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  minWidth: '200px',
                  justifyContent: 'center',
                  animation: `slideInFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
                }}
              >
                <item.icon size={20} />
                {item.label}
              </a>
            ))}
            
            <a
              href="#Contact"
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick('Contact');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                minWidth: '200px',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                animation: `slideInFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${menuItems.length * 0.1}s both`,
              }}
            >
              <Mail size={20} />
              Connect with me
            </a>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .navbar-menu {
            display: none !important;
          }
          .navbar-action {
            display: none !important;
          }
          .menu-toggle {
            display: flex !important;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromTop {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;