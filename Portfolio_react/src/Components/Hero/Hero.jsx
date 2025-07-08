import React, { useEffect, useRef, useState, useCallback } from 'react';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';


const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Smooth animation sequence
  useEffect(() => {
    if (!isLoaded) return;

    const elements = [
      { ref: contentRef, delay: 0.1 },
      { ref: titleRef, delay: 0.3 },
      { ref: descriptionRef, delay: 0.5 },
      { ref: actionRef, delay: 0.7 }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.classList.add('animate-in');
        }, delay * 1000);
      }
    });
  }, [isLoaded]);

  // Optimized parallax effect (disabled on mobile for performance)
  const handleScroll = useCallback(() => {
    if (isMobile) return;
    
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    
    if (videoRef.current) {
      videoRef.current.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`;
    }
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
      className="hero-container" 
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
      }}
    >
      {/* Video Background - Only load on desktop for performance */}
      {!isMobile && (
        <div 
          className="video-background"
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
            style={{
              width: '120%',
              height: '120%',
              objectFit: 'cover',
              filter: 'brightness(0.3) contrast(1.1)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
          >
            <source src={videoMp4} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Mobile Background - Static gradient for better performance */}
      {isMobile && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)
            `,
            zIndex: 0,
          }}
        />
      )}

      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Animated Grid - Simplified for mobile */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, ${isMobile ? '0.05' : '0.1'}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, ${isMobile ? '0.05' : '0.1'}) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '40px 40px' : '50px 50px',
          zIndex: 2,
          animation: isMobile ? 'none' : 'gridMove 30s linear infinite',
        }}
      />

      {/* Main Content */}
      <div 
        className="hero-content"
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: isMobile ? '0 1rem' : '0 2rem',
          maxWidth: '1200px',
          width: '100%',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Title */}
        <h1 
          className="hero-title"
          ref={titleRef}
          style={{
            fontSize: isMobile 
              ? 'clamp(2rem, 8vw, 3rem)' 
              : 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
            lineHeight: '1.2',
          }}
        >
          <span style={{ 
            display: 'block', 
            marginBottom: isMobile ? '0.5rem' : '1rem',
          }}>
            Hello, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Dasun Methmal
            </span>
          </span>
          <span style={{ 
            fontSize: isMobile 
              ? 'clamp(1.2rem, 6vw, 1.8rem)' 
              : 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '400',
            color: '#e5e7eb',
            display: 'block',
          }}>
            Full-Stack Developer from Sri Lanka
          </span>
        </h1>

        {/* Description */}
        <p 
          className="hero-description"
          ref={descriptionRef}
          style={{
            fontSize: isMobile 
              ? 'clamp(1rem, 4vw, 1.1rem)' 
              : 'clamp(1.1rem, 2vw, 1.25rem)',
            color: '#d1d5db',
            maxWidth: isMobile ? '100%' : '600px',
            lineHeight: '1.6',
            marginBottom: isMobile ? '2rem' : '3rem',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            textAlign: 'center',
          }}
        >
          Building seamless, scalable, and user-centric digital experiences through
          innovation and cutting-edge technology.
        </p>

        {/* Action Buttons */}
        <div 
          className="hero-actions"
          ref={actionRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1rem' : '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '100%' : 'auto',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a
            href="#Contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              borderRadius: '50px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '280px' : 'none',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
                e.target.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
              }
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Connect with me</span>
          </a>
          
          <a
            href="/resume.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              backdropFilter: 'blur(10px)',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '280px' : 'none',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      {!isMobile && (
        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            color: '#ffffff',
            fontSize: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0.7,
            animation: 'bounce 2s infinite',
          }}
        >
          <span>Scroll to explore</span>
          <div style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, #6366f1, transparent)',
            borderRadius: '2px',
          }} />
        </div>
      )}

      {/* Global Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Improved mobile touch targets */
        @media (max-width: 768px) {
          .hero-actions a {
            min-height: 48px;
            font-size: 1rem;
          }
          
          .hero-title {
            line-height: 1.3 !important;
          }
          
          .hero-description {
            padding: 0 0.5rem;
          }
        }
        
        /* Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .hero-title {
            text-shadow: none !important;
          }
          
          .hero-actions a {
            border-width: 3px !important;
          }
        }
        
        /* Better focus states for accessibility */
        .hero-actions a:focus-visible {
          outline: 2px solid #6366f1;
          outline-offset: 2px;
        }
        
        /* Optimize for older browsers */
        .hero-content {
          -webkit-transform: translateY(30px);
          -moz-transform: translateY(30px);
          -ms-transform: translateY(30px);
          transform: translateY(30px);
        }
        
        .animate-in {
          -webkit-transform: translateY(0) !important;
          -moz-transform: translateY(0) !important;
          -ms-transform: translateY(0) !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Hero;