import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Home, User, Briefcase, Mail, Settings, ChevronRight, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [menu, setMenu] = useState('Hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

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

  // Enhanced scroll handler with momentum
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset;
          const scrollDirection = scrollTop > lastScrollY ? 'down' : 'up';
          
          setIsScrolled(scrollTop > 20);
          lastScrollY = scrollTop;
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
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Dynamic background based on scroll and hover
  const getDynamicBackground = () => {
    if (isScrolled) {
      return 'rgba(10, 10, 28, 0.95)';
    }
    return 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(25, 25, 55, 0.8) 50%, rgba(15, 15, 35, 0.7) 100%)';
  };

  return (
    <>
      <nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLoaded ? 'loaded' : ''}`}
        ref={navbarRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
          transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
          background: getDynamicBackground(),
          backdropFilter: isScrolled ? 'blur(25px) saturate(180%)' : 'blur(15px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(25px) saturate(180%)' : 'blur(15px) saturate(150%)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
          transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: isScrolled 
            ? '0 10px 40px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(99, 102, 241, 0.1)' 
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: isScrolled ? '0' : '0 0 20px 20px',
          marginTop: isScrolled ? '0' : '0.5rem',
          marginLeft: isScrolled ? '0' : '1rem',
          marginRight: isScrolled ? '0' : '1rem',
          width: isScrolled ? '100%' : 'calc(100% - 2rem)',
        }}
      >
        {/* Animated background particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          borderRadius: isScrolled ? '0' : '0 0 20px 20px',
          pointerEvents: 'none',
        }}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(99, 102, 241, 0.6)',
                borderRadius: '50%',
                animation: `float ${3 + i}s ease-in-out infinite`,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Enhanced Logo */}
          <div 
            className="navbar-logo"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
              transitionDelay: '0.1s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              textDecoration: 'none',
              cursor: 'pointer',
              userSelect: 'none',
              position: 'relative',
            }}
            onClick={() => handleMenuItemClick('Hero')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              <div style={{
                width: isMobile ? '38px' : '45px',
                height: isMobile ? '38px' : '45px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '1rem' : '1.2rem',
                boxShadow: '0 0 25px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                  transform: 'rotate(-45deg)',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}></div>
                <span style={{ position: 'relative', zIndex: 1 }}>M</span>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: '1.2',
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                }}>
                  Moneesha
                </span>
                {!isMobile && (
                  <span style={{
                    fontSize: '0.6rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '400',
                    letterSpacing: '0.05em',
                    marginTop: '-2px',
                  }}>
                    PORTFOLIO
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Menu */}
          <ul 
            className="navbar-menu"
            style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              listStyle: 'none',
              margin: 0,
              padding: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
              transitionDelay: '0.2s',
            }}
          >
            {menuItems.map((item, index) => (
              <li 
                key={item.key}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                  transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
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
                    padding: '0.7rem 1.2rem',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: menu === item.key ? '#ffffff' : '#d1d5db',
                    background: menu === item.key 
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)' 
                      : 'transparent',
                    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: menu === item.key 
                      ? '0 8px 25px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                      : 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    border: menu === item.key ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(-2px) scale(1.02)';
                      e.target.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (menu !== item.key) {
                      e.target.style.color = '#d1d5db';
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  <item.icon size={14} style={{
                    filter: menu === item.key ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))' : 'none',
                  }} />
                  {item.label}
                  {menu === item.key && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                      animation: 'shimmer 2s ease-in-out infinite',
                      borderRadius: '50px',
                    }} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Enhanced Desktop Action Button */}
          <div 
            className="navbar-action"
            style={{
              display: isMobile ? 'none' : 'block',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
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
                gap: '0.6rem',
                padding: '0.8rem 1.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <Sparkles size={16} style={{
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))',
              }} />
              Let's Connect
              <ChevronRight size={14} style={{
                transition: 'transform 0.3s ease',
              }} />
            </a>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
              transitionDelay: '0.3s',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            }}
            onTouchStart={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(0.95)';
              e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }}
            onTouchEnd={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
          >
            <div style={{
              position: 'relative',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen ? 'rotate(45deg) scale(0.8)' : 'rotate(0deg) scale(1)',
              }}>
                <Menu size={20} />
              </div>
              <div style={{
                position: 'absolute',
                transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(0.8)',
              }}>
                <X size={20} />
              </div>
            </div>
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
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
            background: 'rgba(10, 10, 28, 0.95)',
            backdropFilter: 'blur(25px) saturate(180%)',
            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            touchAction: 'none',
          }}
          onClick={toggleMenu}
        >
          {/* Background particles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'rgba(99, 102, 241, 0.4)',
                borderRadius: '50%',
                animation: `float ${4 + i}s ease-in-out infinite`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
          
          <div 
            className="mobile-menu"
            ref={mobileMenuRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '2.5rem 1.5rem',
              maxWidth: '320px',
              width: '90%',
              animation: 'slideInFromTop 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: '600',
                margin: 0,
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Navigation
              </h3>
              <div style={{
                width: '40px',
                height: '2px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                margin: '0.5rem auto',
                borderRadius: '2px',
              }} />
            </div>

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
                  borderRadius: '16px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: menu === item.key ? '#ffffff' : '#d1d5db',
                  background: menu === item.key 
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)' 
                    : 'rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  width: '100%',
                  justifyContent: 'flex-start',
                  animation: `slideInFromLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.08}s both`,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: '56px',
                  boxShadow: menu === item.key 
                    ? '0 8px 25px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                    : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  border: menu === item.key ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onTouchStart={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = 'scale(0.98)';
                  }
                }}
                onTouchEnd={(e) => {
                  if (menu !== item.key) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                <item.icon size={20} style={{
                  filter: menu === item.key ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' : 'none',
                }} />
                {item.label}
                {menu === item.key && (
                  <ChevronRight size={16} style={{
                    marginLeft: 'auto',
                    filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))',
                  }} />
                )}
                {menu === item.key && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                    animation: 'shimmer 2s ease-in-out infinite',
                    borderRadius: '16px',
                  }} />
                )}
              </a>
            ))}
            
            {/* Enhanced Connect Button */}
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
                padding: '1.2rem 1.5rem',
                borderRadius: '16px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                width: '100%',
                justifyContent: 'center',
                boxShadow: '0 12px 35px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                animation: `slideInFromLeft 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) ${menuItems.length * 0.08}s both`,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '56px',
                marginTop: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(0.98)';
                e.target.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              <Sparkles size={20} style={{
                filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
              }} />
              Let's Connect
              <ChevronRight size={16} style={{
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))',
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                animation: 'shimmer 3s ease-in-out infinite',
                borderRadius: '16px',
              }} />
            </a>
          </div>
        </div>
      )}

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1; 
            backdrop-filter: blur(25px);
          }
        }

        @keyframes slideInFromTop {
          from { 
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
            filter: blur(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateX(-50px) scale(0.95);
            filter: blur(5px);
          }
          to { 
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(300%) rotate(45deg); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.8;
          }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1;
          }
        }

        /* Enhanced scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #8b5cf6, #c084fc);
        }

        /* Smooth scrolling for all browsers */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced high contrast mode support */
        @media (prefers-contrast: high) {
          .navbar {
            border-bottom: 2px solid #ffffff !important;
            background: rgba(0, 0, 0, 0.95) !important;
          }
          
          .navbar-menu a {
            border: 2px solid transparent !important;
          }
          
          .navbar-menu a:focus {
            border-color: #ffffff !important;
            outline: 2px solid #ffffff !important;
          }

          .mobile-menu a {
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
          }
        }

        /* Enhanced reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          html {
            scroll-behavior: auto !important;
          }

          .navbar {
            transform: none !important;
            transition: none !important;
          }
        }

        /* Enhanced focus styles for accessibility */
        .navbar-menu a:focus-visible,
        .navbar-action a:focus-visible,
        .menu-toggle:focus-visible,
        .mobile-menu a:focus-visible {
          outline: 3px solid #6366f1;
          outline-offset: 3px;
          box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.2);
        }

        /* Enhanced iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            height: -webkit-fill-available;
            min-height: -webkit-fill-available;
          }

          .navbar {
            -webkit-backdrop-filter: blur(25px) saturate(180%);
          }
        }

        /* Enhanced button interactions */
        .menu-toggle:active {
          transform: scale(0.92) !important;
        }

        .navbar-menu a:active {
          transform: scale(0.98) !important;
        }

        .mobile-menu a:active {
          transform: scale(0.96) !important;
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
          -webkit-touch-callout: none;
        }

        /* Enhanced hover effects for desktop */
        @media (hover: hover) {
          .navbar-logo:hover {
            transform: scale(1.05) !important;
          }

          .navbar-menu a:hover {
            transform: translateY(-2px) scale(1.02) !important;
          }

          .navbar-action a:hover {
            transform: translateY(-2px) scale(1.05) !important;
          }

          .menu-toggle:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            transform: scale(1.05) !important;
          }
        }

        /* Dark mode enhancements */
        @media (prefers-color-scheme: dark) {
          .navbar {
            background: rgba(5, 5, 15, 0.95) !important;
          }
          
          .mobile-menu-overlay {
            background: rgba(5, 5, 15, 0.98) !important;
          }
        }

        /* Performance optimizations */
        .navbar,
        .mobile-menu-overlay,
        .mobile-menu,
        .navbar-menu,
        .navbar-logo,
        .navbar-action,
        .menu-toggle {
          will-change: transform, opacity, background;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        /* Enhanced responsive breakpoints */
        @media (max-width: 480px) {
          .navbar {
            padding: 0.5rem 0.75rem !important;
          }

          .mobile-menu {
            padding: 2rem 1rem !important;
            gap: 0.75rem !important;
          }

          .mobile-menu a {
            padding: 0.875rem 1.25rem !important;
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 320px) {
          .navbar {
            padding: 0.5rem !important;
          }

          .mobile-menu {
            width: 95% !important;
            padding: 1.5rem 0.75rem !important;
          }
        }

        /* Enhanced landscape mode support */
        @media (orientation: landscape) and (max-height: 500px) {
          .mobile-menu {
            max-height: 90vh;
            overflow-y: auto;
            gap: 0.5rem !important;
          }

          .mobile-menu a {
            padding: 0.75rem 1.25rem !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;