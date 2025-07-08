import React, { useEffect, useRef } from 'react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

// Utility function for random premium colors
const getRandomPremiumColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const MovingBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const videoRef = useRef(null);

  // Simple GSAP-like animation implementation
  const gsap = {
    set: (element, props) => {
      if (element && props.x !== undefined) {
        element.style.transform = `translateX(${props.x}px)`;
        element.style.willChange = 'transform'; // Optimize for animation
      }
    },
    to: (element, options) => {
      if (!element) return;

      const startX = parseFloat(element.style.transform.replace('translateX(', '').replace('px)', '') || 0);
      const targetX = options.x || 0;
      const duration = (options.duration || 1) * 1000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Linear easing for continuous movement
        const currentX = startX + (targetX - startX) * progress;
        element.style.transform = `translateX(${currentX}px)`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (options.onComplete) {
          options.onComplete();
        }
      };

      requestAnimationFrame(animate);
    },
    killTweensOf: (element) => {
      if (element) {
        element.style.transform = '';
        element.style.willChange = 'auto';
      }
    },
  };

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    const isMobile = window.innerWidth <= 768;
    const contentWidth = bar.scrollWidth;

    // Start the bar from visible position
    gsap.set(bar, { x: 0 });

    // Create continuous animation
    const animateBar = () => {
      gsap.to(bar, {
        x: -contentWidth / 2,
        duration: isMobile ? 12 : 20, // Faster on mobile for better UX
        onComplete: () => {
          gsap.set(bar, { x: 0 });
          // Change colors on repeat
          bar.style.background = `linear-gradient(90deg, ${getRandomPremiumColor()}, ${getRandomPremiumColor()})`;
          animateBar(); // Restart animation
        },
      });
    };

    animateBar();

    // Handle window resize for responsiveness
    const handleResize = () => {
      gsap.killTweensOf(bar);
      gsap.set(bar, { x: 0 });
      animateBar();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      gsap.killTweensOf(bar);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js',
    'GSAP', 'Vite', 'CSS', 'HTML5',
    'Redux', 'Tailwind', 'Next.js', 'Three.js',
  ];

  return (
    <div className="moving-bar-section" style={styles.movingBarSection}>
      {/* Video Background */}
      <div className="video-background" style={styles.videoBackground}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={styles.video}
          preload="auto"
        >
          <source src={videoWebM} type="video/webm" />
          {/* Fallback for unsupported formats */}
          <source src={videoWebM.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      </div>

      {/* Overlay for video readability */}
      <div className="video-overlay" style={styles.videoOverlay} />

      {/* Moving Bar */}
      <div
        className="moving-bar-container"
        ref={containerRef}
        aria-label="Skills Ticker"
        style={styles.movingBarContainer}
      >
        <div ref={barRef} className="moving-bar" style={styles.movingBar}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item"
              role="listitem"
              style={styles.skillItem}
              tabIndex={0} // Make focusable
              onKeyDown={(e) => e.key === 'Enter' && alert(`${skill} selected`)} // Example interaction
            >
              <span>{skill}</span>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div
              key={`dup-${index}`}
              className="skill-item"
              role="listitem"
              style={styles.skillItem}
              tabIndex={0}
            >
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  movingBarSection: {
    position: 'relative',
    width: '100%',
    minHeight: '50px',
    overflow: 'hidden',
    background: '#000', // Fallback background
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.4) contrast(1.2) hue-rotate(180deg)',
    transform: 'translate3d(0, 0, 0)', // Hardware acceleration
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  movingBarContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: '1rem 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  movingBar: {
    display: 'flex',
    alignItems: 'center',
    gap: window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
    willChange: 'transform',
    background: `linear-gradient(90deg, ${getRandomPremiumColor()}, ${getRandomPremiumColor()})`,
  },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: window.innerWidth <= 768 ? '0.5rem 1rem' : '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
    },
  },
};

// Add CSS for better responsiveness and smoothness
const css = `
  .moving-bar-section {
    transform: translate3d(0, 0, 0); /* Hardware acceleration */
  }

  .moving-bar-container {
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  }

  .skill-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .moving-bar-container {
      padding: 0.5rem 0;
    }
    .skill-item {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }
    .moving-bar {
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .skill-item {
      padding: 0.3rem 0.6rem;
      font-size: 0.75rem;
    }
    .moving-bar {
      gap: 1rem;
    }
  }
`;

// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default MovingBar;