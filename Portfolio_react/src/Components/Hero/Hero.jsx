import React, { useEffect, useRef, useState } from 'react';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const elements = [
      { ref: contentRef, delay: 0.2 },
      { ref: imageRef, delay: 0.4 },
      { ref: titleRef, delay: 0.6 },
      { ref: descriptionRef, delay: 0.8 },
      { ref: actionRef, delay: 1.0 }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.classList.add('animate-in');
        }, delay * 1000);
      }
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  return (
    <div 
      id="Hero" 
      className="hero-container" 
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
      }}
    >
      {/* Video Background */}
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.4) contrast(1.2)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
            radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)
          `,
          zIndex: 1,
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
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 2,
          animation: 'gridMove 20s linear infinite',
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
          padding: '0 2rem',
          maxWidth: '1200px',
          width: '100%',
          opacity: 0,
          transform: 'translateY(60px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
    
        {/* Title */}
        <h1 
          className="hero-title"
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
          }}
        >
          <span style={{ display: 'block', marginBottom: '0.5rem' }}>
            Hello, I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Dasun Methmal
            </span>
          </span>
          <span style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '400',
            color: '#e5e7eb',
          }}>
            A Full-Stack Developer from Sri Lanka
          </span>
        </h1>

        {/* Description */}
        <p 
          className="hero-description"
          ref={descriptionRef}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: '#d1d5db',
            maxWidth: '600px',
            lineHeight: '1.6',
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
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
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <a
            href="#Contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              borderRadius: '50px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
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
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
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

      {/* Global Styles */}
      <style jsx>{`
        @keyframes profileGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 50px rgba(168, 85, 247, 0.7); }
        }
        
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
          transform: translateY(0) scale(1) rotateY(0deg) !important;
        }
        
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          
          .hero-actions a {
            width: 100%;
            max-width: 300px;
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
    </div>
  );
};

export default Hero;