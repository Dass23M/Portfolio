import React, { useEffect, useRef, useState, useCallback } from 'react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile with debounced resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    let timeout;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 100);
    };
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Optimized loading effect
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Simplified animation sequence using CSS
  useEffect(() => {
    if (!isLoaded) return;
    [contentRef, titleRef, descriptionRef, actionRef].forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.transitionDelay = `${index * 0.2}s`;
        ref.current.classList.add('animate-in');
      }
    });
  }, [isLoaded]);

  // Simplified parallax effect
  const handleScroll = useCallback(() => {
    if (isMobile || !videoRef.current) return;
    videoRef.current.style.transform = `translate(-50%, -50%) translateY(${window.pageYOffset * 0.2}px)`;
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  return (
    <div
      id="Hero"
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: isMobile ? '100vh' : '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Video Background - Optimized for both desktop and mobile */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          loading="lazy"
          style={{
            width: isMobile ? '100%' : '120%',
            height: isMobile ? '100%' : '120%',
            objectFit: 'cover',
            filter: `brightness(${isMobile ? 0.4 : 0.3}) contrast(1.1)`,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: isMobile ? 'auto' : 'transform',
          }}
          aria-hidden="true"
        >
          <source src={videoWebM} type="video/webm" />
          <track kind="captions" srcLang="en" label="Background video" />
        </video>
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Animated Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(99, 102, 241, ${isMobile ? 0.03 : 0.08}) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, ${isMobile ? 0.03 : 0.08}) 1px, transparent 1px)`,
          backgroundSize: isMobile ? '30px 30px' : '40px 40px',
          zIndex: 2,
          animation: isMobile ? 'none' : 'gridMove 20s linear infinite',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: isMobile ? '2rem 1rem' : '0 2rem',
          maxWidth: '1000px',
          width: '100%',
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: isMobile ? '0.5rem' : '1.2rem',
            opacity: 0,
            transform: 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            lineHeight: 1.2,
          }}
          role="heading"
          aria-level="1"
        >
          <span style={{ display: 'block', marginBottom: isMobile ? '0.3rem' : '0.8rem' }}>
            Hello, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
            >
              Moneesha Aravindi
            </span>
          </span>
          <span
            style={{
              fontSize: isMobile ? 'clamp(0.9rem, 4vw, 1.4rem)' : 'clamp(1.3rem, 3vw, 2rem)',
              fontWeight: 400,
              color: '#e5e7eb',
              display: 'block',
            }}
          >
            Full-Stack Developer from Sri Lanka
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          style={{
            fontSize: isMobile ? 'clamp(0.85rem, 3.5vw, 1rem)' : 'clamp(1rem, 1.8vw, 1.15rem)',
            color: '#d1d5db',
            maxWidth: isMobile ? '95%' : '550px',
            lineHeight: 1.5,
            marginBottom: isMobile ? '1.8rem' : '2rem',
            opacity: 0,
            transform: 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Building seamless, scalable, and user-centric digital experiences through innovation and cutting-edge technology.
        </p>

        {/* Action Buttons */}
        <div
          ref={actionRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.7rem' : '1.2rem',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '250px' : 'none',
            opacity: 0,
            transform: 'translateY(15px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href="#Contact"
            style={{
              padding: isMobile ? '0.6rem 1.2rem' : '0.9rem 1.8rem',
              fontSize: isMobile ? '0.85rem' : '1rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              borderRadius: '9999px',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : '160px',
              textAlign: 'center',
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 25px rgba(99, 102, 241, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.2)';
              }
            }}
            aria-label="Connect with Moneesha Aravindi"
          >
            Connect with me
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              padding: isMobile ? '0.6rem 1.2rem' : '0.9rem 1.8rem',
              fontSize: isMobile ? '0.85rem' : '1rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : '160px',
              textAlign: 'center',
              display: 'inline-block',
              transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            aria-label="Download Moneesha Aravindi's resume"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            color: '#ffffff',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <div
            style={{
              width: '2px',
              height: '25px',
              background: 'linear-gradient(to bottom, #6366f1, transparent)',
              borderRadius: '2px',
            }}
          />
        </div>
      )}

      {/* Optimized CSS */}
      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(40px, 40px); }
          }
          
          .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          /* Mobile optimizations */
          @media (max-width: 768px) {
            a { 
              min-height: 40px !important;
              font-size: 0.85rem !important;
              padding: 0.6rem 1.2rem !important;
            }
          }
          
          @media (max-width: 480px) {
            a { 
              font-size: 0.8rem !important;
              padding: 0.55rem 1rem !important;
              min-height: 38px !important;
            }
          }
          
          @media (max-width: 360px) {
            a { 
              font-size: 0.75rem !important;
              padding: 0.5rem 0.8rem !important;
              min-height: 36px !important;
            }
          }
          
          /* Accessibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          @media (prefers-contrast: high) {
            h1 { 
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important; 
            }
            a { 
              border-width: 3px !important; 
              font-weight: 700 !important;
            }
          }
          
          /* Focus styles */
          a:focus-visible {
            outline: 2px solid #6366f1 !important;
            outline-offset: 2px !important;
          }
          
          /* Touch targets */
          @media (pointer: coarse) {
            a {
              min-height: 44px !important;
              min-width: 44px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;