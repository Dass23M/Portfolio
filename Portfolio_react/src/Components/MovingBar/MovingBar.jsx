import React, { useEffect, useRef } from 'react';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';
import { gsap } from 'gsap';

const MovingBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);

  // Simple GSAP-like animation implementation
  const gsap = {
    set: (element, props) => {
      if (element && props.x !== undefined) {
        element.style.transform = `translateX(${props.x}px)`;
      }
    },
    to: (element, options) => {
      if (!element) return;
      
      const startX = element.getBoundingClientRect().left;
      const targetX = options.x || 0;
      const duration = (options.duration || 1) * 1000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear easing for continuous movement
        const currentX = startX + (targetX - startX) * progress;
        element.style.transform = `translateX(${targetX * progress}px)`;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (options.onComplete) {
          options.onComplete();
        }
      };
      
      requestAnimationFrame(animate);
    },
    timeline: (options = {}) => {
      let animations = [];
      let currentIndex = 0;
      let isPlaying = false;
      
      const play = () => {
        isPlaying = true;
        runAnimations();
      };
      
      const runAnimations = () => {
        if (currentIndex >= animations.length) {
          if (options.repeat === -1) {
            currentIndex = 0;
            if (options.onRepeat) options.onRepeat();
            runAnimations();
          }
          return;
        }
        
        const anim = animations[currentIndex];
        gsap.to(anim.element, {
          ...anim.options,
          onComplete: () => {
            currentIndex++;
            runAnimations();
          }
        });
      };
      
      return {
        to: (element, options) => {
          animations.push({ element, options });
          if (!options.paused && !isPlaying) play();
          return this;
        },
        kill: () => {
          animations = [];
          isPlaying = false;
        }
      };
    },
    killTweensOf: (element) => {
      // Simple cleanup
      if (element) {
        element.style.transform = '';
      }
    }
  };



  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    const isMobile = window.innerWidth <= 768;
    const contentWidth = bar.scrollWidth;

    // Start the bar from visible position (no delay)
    gsap.set(bar, { x: 0 });

    // Create continuous animation
    const animateBar = () => {
      gsap.to(bar, {
        x: -contentWidth / 2,
        duration: isMobile ? 15 : 25,
        onComplete: () => {
          gsap.set(bar, { x: 0 });
          // Change colors on repeat
          bar.style.background = `linear-gradient(90deg, ${getRandomPremiumColor()}, ${getRandomPremiumColor()})`;
          animateBar(); // Restart animation
        }
      });
    };

    animateBar();

    return () => {
      gsap.killTweensOf(bar);
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
      <div 
        className="video-background"
        style={styles.videoBackground}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={styles.video}
        >
         <source src={videoMp4} type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay for video readability */}
      <div className="video-overlay" style={styles.videoOverlay} />

      {/* Moving Bar */}
      <div className="moving-bar-container" ref={containerRef} aria-label="Skills Ticker" style={styles.movingBarContainer}>
        <div ref={barRef} className="moving-bar" style={styles.movingBar}>
          {skills.map((skill, index) => (
            <div key={index} className="skill-item" role="listitem" style={styles.skillItem}>
              <span>{skill}</span>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div key={`dup-${index}`} className="skill-item" role="listitem" style={styles.skillItem}>
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
  },
  videoBackground: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: '120%',
    height: '120%',
    zIndex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.3) contrast(1.1) hue-rotate(180deg)',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  movingBarContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: '2rem 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  movingBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: window.innerWidth <= 768 ? '0.5rem 1rem' : '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export default MovingBar;