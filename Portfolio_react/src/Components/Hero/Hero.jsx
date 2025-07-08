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
        ref.current.style.transitionDelay = `${index * 0.15}s`;
        ref.current.classList.add('animate-in');
      }
    });
  }, [isLoaded]);

  // Simplified parallax effect
  const handleScroll = useCallback(() => {
    if (isMobile || !videoRef.current) return;
    videoRef.current.style.transform = `translate(-50%, -50%) translateY(${window.pageYOffset * 0.15}px)`;
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
        background: 'linear-gradient(135deg, #0a0a1b 0%, #15152a 100%)',
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Video Background */}
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
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `brightness(${isMobile ? 0.35 : 0.3}) contrast(1.2)`,
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
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%)',
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
          backgroundImage: `linear-gradient(rgba(124, 58, 237, ${isMobile ? 0.02 : 0.05}) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, ${isMobile ? 0.02 : 0.05}) 1px, transparent 1px)`,
          backgroundSize: isMobile ? '25px 25px' : '35px 35px',
          zIndex: 2,
          animation: isMobile ? 'none' : 'gridMove 25s linear infinite',
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
          padding: isMobile ? '1.5rem 1rem' : '0 2rem',
          maxWidth: '900px',
          width: '100%',
          opacity: 0,
          transform: 'translateY(15px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: isMobile ? 'clamp(1.4rem, 5vw, 2rem)' : 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: isMobile ? '0.5rem' : '1rem',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            lineHeight: 1.3,
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          }}
          role="heading"
          aria-level="1"
        >
          <span style={{ display: 'block', marginBottom: isMobile ? '0.2rem' : '0.5rem' }}>
            Hello, I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
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
              fontSize: isMobile ? 'clamp(0.85rem, 3.5vw, 1.1rem)' : 'clamp(1.1rem, 2vw, 1.5rem)',
              fontWeight: 400,
              color: '#d1d5db',
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
            fontSize: isMobile ? 'clamp(0.8rem, 3vw, 0.95rem)' : 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: '#d1d5db',
            maxWidth: isMobile ? '90%' : '500px',
            lineHeight: 1.6,
            marginBottom: isMobile ? '1.5rem' : '1.8rem',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          }}
        >
          Crafting seamless, scalable, and user-centric digital experiences with innovative technology.
        </p>

        {/* Action Buttons */}
        <div
          ref={actionRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.5rem' : '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '250px' : 'none',
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <a
            href="#Contact"
            style={{
              padding: isMobile ? '0.6rem 1.2rem' : '0.7rem 1.5rem',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              borderRadius: '999px',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : '140px',
              textAlign: 'center',
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
              }
            }}
            onTouchStart={(e) => {
              e.target.style.transform = 'scale(0.98)';
              e.target.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
            }}
            aria-label="Connect with Moneesha Aravindi"
          >
            Connect with me
          </a>
          <a
            href="/resume.pdf"
            download
            style={{
              padding: isMobile ? '0.6rem 1.2rem' : '0.7rem 1.5rem',
              fontSize: isMobile ? '0.85rem' : '0.9rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              width: isMobile ? '100%' : 'auto',
              minWidth: isMobile ? 'auto' : '140px',
              textAlign: 'center',
              display: 'inline-block',
              transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onTouchStart={(e) => {
              e.target.style.transform = 'scale(0.98)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
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
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            color: '#d1d5db',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <div
            style={{
              width: '2px',
              height: '20px',
              background: 'linear-gradient(to bottom, #7c3aed, transparent)',
              borderRadius: '2px',
            }}
          />
        </div>
      )}

      {/* Inline Critical CSS */}
      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(35px, 35px); }
          }
          .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          @media (max-width: 768px) {
            a {
              min-height: 40px;
              font-size: 0.85rem !important;
              padding: 0.6rem 1.2rem !important;
            }
          }
          @media (max-width: 480px) {
            a {
              font-size: 0.8rem !important;
              padding: 0.5rem 1rem !important;
            }
            h1 {
              font-size: clamp(1.2rem, 4vw, 1.8rem) !important;
            }
            p {
              font-size: clamp(0.75rem, 2.5vw, 0.9rem) !important;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
            }
          }
          @media (prefers-contrast: high) {
            h1 {
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) !important;
            }
            a {
              border-width: 2px !important;
            }
          }
          a:focus-visible {
            outline: 2px solid #7c3aed;
            outline-offset: 2px;
            border-radius: 999px;
          }
          video {
            transform: translate3d(-50%, -50%, 0);
          }
        `}
      </style>
    </div>
  );
};

export default Hero;