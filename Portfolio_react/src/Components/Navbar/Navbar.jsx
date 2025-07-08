import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

const Navbar = () => {
  const [menu, setMenu] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          setIsScrolled(scrollTop > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  // Detect active section on scroll
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = ['Hero', 'About', 'NewAbout', 'Projects', 'Contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setMenu(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', handleActiveSection);
  }, []);

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
      const offset = 60; // Reduced for mobile
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
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
          padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
          transition: 'all 0.3s ease',
          background: isScrolled
            ? 'rgba(10, 10, 25, 0.95)'
            : 'linear-gradient(180deg, rgba(10, 10, 25, 0.9) 0%, rgba(10, 10, 25, 0.5) 100%)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none',
          willChange: 'transform, background, backdrop-filter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Logo */}
          <div
            className="navbar-logo"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.4s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                fontWeight: '700',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={() => handleMenuItemClick('Hero')}
            >
              <div
                style={{
                  width: isMobile ? '28px' : '32px',
                  height: isMobile ? '28px' : '32px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  boxShadow: '0 0 12px rgba(124, 58, 237, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                M
              </div>
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #d1d5db)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                }}
              >
                Moneesha
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul
            className="navbar-menu"
            style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '1rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.4s ease',
            }}
          >
            {menuItems.map((item, index) => (
              <li
                key={item.key}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
                  transition: `all 0.4s ease ${index * 0.05}s`,
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
                    gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: menu === item.key ? '#ffffff' : '#d1d5db',
                    background: menu === item.key
                      ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#d1d5db';
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  <item.icon size={14} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Action Button */}
          <div
            className="navbar-action"
            style={{
              display: isMobile ? 'none' : 'block',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(20px)',
              transition: 'all 0.4s ease',
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
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
              }}
            >
              <Mail size={14} />
              Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.9)',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onTouchStart={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
            background: 'rgba(10, 10, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '1rem',
            height: '100vh',
            height: '-webkit-fill-available',
            transition: 'opacity 0.3s ease',
            opacity: mobileMenuOpen ? 1 : 0,
            touchAction: 'none',
          }}
          onClick={toggleMenu}
        >
          <div
            className="mobile-menu"
            ref={mobileMenuRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem',
              padding: '1rem',
              width: '80%',
              maxWidth: '280px',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease',
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
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: menu === item.key ? '#ffffff' : '#d1d5db',
                  background: menu === item.key
                    ? 'linear-gradient(135deg, #7c3aed, #db2777)'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: '40px',
                }}
                onTouchStart={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.transform = 'scale(0.98)';
                  }
                }}
                onTouchEnd={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <item.icon size={16} />
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
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                transition: 'all 0.3s ease',
                width: '100%',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                marginTop: '0.5rem',
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '40px',
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(0.98)';
                e.target.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
              }}
            >
              <Mail size={16} />
              Connect with me
            </a>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.4);
          border-radius: 3px;
        }

        /* Accessibility: High contrast */
        @media (prefers-contrast: high) {
          .navbar {
            border-bottom: 1px solid #ffffff !important;
          }
          .navbar-menu a,
          .mobile-menu a {
            border: 1px solid transparent !important;
          }
          .navbar-menu a:focus,
          .mobile-menu a:focus {
            border-color: #ffffff !important;
          }
        }

        /* Accessibility: Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.01ms !important;
            animation: none !important;
          }
          html {
            scroll-behavior: auto !important;
          }
          .mobile-menu {
            transform: none !important;
          }
        }

        /* Focus styles */
        .navbar-menu a:focus-visible,
        .navbar-action a:focus-visible,
        .menu-toggle:focus-visible,
        .mobile-menu a:focus-visible {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
          border-radius: 999px;
        }

        /* iOS Safari fixes */
        @supports (-webkit-touch-callout: none) {
          .mobile-menu-overlay {
            height: 100vh;
            height: -webkit-fill-available;
          }
        }

        /* Prevent text selection */
        .navbar-logo,
        .navbar-menu a,
        .navbar-action a,
        .menu-toggle,
        .mobile-menu a {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .navbar {
            padding: 0.5rem 0.75rem;
          }
          .navbar-logo span {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            padding: 0.4rem 0.5rem;
          }
          .mobile-menu {
            width: 90%;
            max-width: 260px;
          }
          .mobile-menu a {
            font-size: 0.85rem;
            padding: 0.5rem 0.8rem;
            min-height: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;