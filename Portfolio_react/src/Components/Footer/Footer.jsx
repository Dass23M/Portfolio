import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const contactRef = useRef(null);
  const bottomRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          animateFooterElements();
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const footerTop = footerRef.current?.offsetTop || 0;
      const footerHeight = footerRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      
      if (scrolled + windowHeight > footerTop && scrolled < footerTop + footerHeight) {
        const parallaxValue = (scrolled - footerTop) * 0.2;
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${parallaxValue}px)`;
        }
      }
    };

    // Mouse movement parallax
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      if (contentRef.current) {
        const x = deltaX * 0.5;
        const y = deltaY * 0.5;
        contentRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, [isVisible]);

  const animateFooterElements = () => {
    const isMobile = window.innerWidth <= 768;

    // Animate main content container
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.8 : 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Footer sections stagger animation
    gsap.fromTo(
      [aboutRef.current, linksRef.current, socialsRef.current, contactRef.current],
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.8 : 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        delay: 0.4,
      }
    );

    // Social icons individual animation
    gsap.fromTo(
      socialsRef.current.querySelectorAll(".social-icon"),
      { opacity: 0, scale: 0.6, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 0.6 : 0.8,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      }
    );

    // Bottom section animation
    gsap.fromTo(
      bottomRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out",
        delay: 1,
      }
    );

    // Floating particles animation
    gsap.to(".floating-particle", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-360, 360)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });
  };

  return (
    <footer 
      className="footer" 
      ref={footerRef} 
      role="contentinfo" 
      aria-label="Footer"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0',
      }}
    >
      {/* Video Background */}
      <div 
        className="video-background"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          zIndex: 1,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.25) contrast(1.2) hue-rotate(240deg)',
          }}
        >
          <source src={videoMp4} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
          `,
          zIndex: 2,
        }}
      />

      {/* Animated Grid */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 2,
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            position: 'absolute',
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${['#6366f1', '#a855f7', '#10b981', '#f59e0b', '#ef4444'][i % 5]}, transparent)`,
            opacity: 0.15,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className="footer-content"
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        {/* Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* About Section */}
          <div 
            className="footer-section"
            ref={aboutRef}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
            }}
          >
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: '50%',
                display: 'inline-block',
              }}></span>
              About Me
            </h4>
            <p style={{
              fontSize: '1rem',
              color: '#d1d5db',
              lineHeight: '1.7',
              margin: 0,
            }}>
              I'm a dedicated full-stack web developer skilled in building
              responsive and user-friendly applications. Let's collaborate to bring your ideas to life!
            </p>
          </div>

          {/* Quick Links */}
          <div 
            className="footer-section"
            ref={linksRef}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
            }}
          >
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                borderRadius: '50%',
                display: 'inline-block',
              }}></span>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {['Projects', 'Skills', 'Contact', 'Blog'].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#6366f1';
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#d1d5db';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div 
            className="footer-section"
            ref={socialsRef}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
            }}
          >
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
                borderRadius: '50%',
                display: 'inline-block',
              }}></span>
              Follow Me
            </h4>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              {[
                { icon: FaGithub, url: 'https://github.com', color: '#6366f1' },
                { icon: FaLinkedin, url: 'https://linkedin.com', color: '#0077b5' },
                { icon: FaTwitter, url: 'https://twitter.com', color: '#1da1f2' },
                { icon: FaEnvelope, url: 'mailto:youremail@example.com', color: '#ef4444' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = social.color;
                      e.target.style.transform = 'translateY(-5px) scale(1.1)';
                      e.target.style.boxShadow = `0 10px 25px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={20} color="#ffffff" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div 
            className="footer-section"
            ref={contactRef}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
            }}
          >
            <h4 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #10b981, #6366f1)',
                borderRadius: '50%',
                display: 'inline-block',
              }}></span>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaEnvelope size={16} color="#6366f1" />
                <span style={{ color: '#d1d5db', fontSize: '1rem' }}>
                  youremail@example.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaPhone size={16} color="#a855f7" />
                <span style={{ color: '#d1d5db', fontSize: '1rem' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaMapMarkerAlt size={16} color="#ec4899" />
                <span style={{ color: '#d1d5db', fontSize: '1rem' }}>
                  Your City, Country
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div 
          className="footer-bottom"
          ref={bottomRef}
          style={{
            textAlign: 'center',
            padding: '2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p style={{
            fontSize: '1rem',
            color: '#9ca3af',
            margin: 0,
            fontWeight: '400',
          }}>
            © {new Date().getFullYear()} Dasun Methmal. All rights reserved.
            <span style={{
              display: 'block',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}>
              Crafted with ❤️ and cutting-edge technology
            </span>
          </p>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        .footer-section {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .footer-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            padding: 2rem 1rem !important;
          }
          
          .footer-content > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .footer-section {
            padding: 1.5rem !important;
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
    </footer>
  );
};

export default Footer;