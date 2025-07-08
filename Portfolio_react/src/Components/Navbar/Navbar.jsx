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
      const offset = 80; // Account for navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
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
          padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled 
            ? 'rgba(15, 15, 35, 0.95)' 
            : 'linear-gradient(180deg, rgba(15, 15, 35, 0.9) 0%, rgba(15, 15, 35, 0.6) 70%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
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
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.1s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => handleMenuItemClick('Hero')}
            >
              <div style={{
                width: isMobile ? '35px' : '40px',
                height: isMobile ? '35px' : '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1rem' : '1.2rem',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease',
              }}>
                M
              </div>
              <span style={{
                background: 'linear-gradient(135deg, #ffffff, #e5e7eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                Methmal
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <ul 
            className="navbar-menu"
            style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.2s',
            }}
          >
            {menuItems.map((item, index) => (
              <li 
                key={item.key}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${0.2 + index * 0.05}s`,
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
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
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
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(-1px)';
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
              transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.4s',
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
                padding: '0.6rem 1.2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px) scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
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
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transitionDelay: '0.3s',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onTouchStart={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            background: 'rgba(15, 15, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
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
              alignItems: 'center',
              gap: '1.5rem',
              padding: '2rem 1rem',
              maxWidth: '300px',
              width: '90%',
              animation: 'slideInFromTop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
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
                  padding: '1rem 1.5rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: menu === item.key ? '#ffffff' : '#d1d5db',
                  background: menu === item.key 
                    ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: '100%',
                  justifyContent: 'center',
                  animation: `slideInFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s both`,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: '48px',
                  boxShadow: menu === item.key 
                    ? '0 8px 25px rgba(99, 102, 241, 0.3)' 
                    : 'none',
                }}
                onTouchStart={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(0.98)';
                  }
                }}
                onTouchEnd={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <item.icon size={18} />
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
                padding: '1rem 1.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                animation: `slideInFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${menuItems.length * 0.05}s both`,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '48px',
                marginTop: '0.5rem',
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(0.98)';
                e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
              }}
            >
              <Mail size={18} />
              Connect with me
            </a>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromTop {
          from { 
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
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

        /* Better scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 4px;
        }

        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .navbar {
            border-bottom: 2px solid #ffffff !important;
          }
          
          .navbar-menu a {
            border: 1px solid transparent !important;
          }
          
          .navbar-menu a:focus {
            border-color: #ffffff !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          html {
            scroll-behavior: auto !important;
          }
        }

        /* Focus styles for accessibility */
        .navbar-menu a:focus-visible,
        .navbar-action a:focus-visible,
        .menu-toggle:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }

        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            height: -webkit-fill-available;
          }
        }

        /* Better button interactions */
        .menu-toggle:active {
          transform: scale(0.95) !important;
        }

        /* Prevent text selection on interactive elements */
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
      `}</style>
    </>
  );
};

export default Navbar;