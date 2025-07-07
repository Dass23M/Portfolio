import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MovingBar.css';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';

const MovingBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    const isMobile = window.innerWidth <= 768;
    const contentWidth = bar.scrollWidth;

    // Start the bar from visible position (no delay)
    gsap.set(bar, { x: 0 });

    timelineRef.current = gsap.timeline({
      repeat: -1,
      paused: false, // Start immediately
      onRepeat: () => {
        gsap.to(bar, {
          background: `linear-gradient(90deg, ${getRandomPremiumColor()}, ${getRandomPremiumColor()})`,
          duration: 2,
          ease: 'power1.inOut',
        });
      },
    });

    timelineRef.current.to(bar, {
      x: -contentWidth / 2, // Only half width needed because we duplicate the items
      duration: isMobile ? 15 : 25, // Faster for mobile
      ease: 'linear',
    });



    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      gsap.killTweensOf(bar);
    };
  }, []);

  const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js',
    'GSAP', 'Vite', 'CSS', 'HTML5',
    'Redux', 'Tailwind', 'Next.js', 'Three.js',
  ];

  return (
    <div className="moving-bar-section">
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
            filter: 'brightness(0.3) contrast(1.1) hue-rotate(180deg)',
          }}
        >
          <source src={videoMp4} type="video/mp4" />
        </video>
      </div>
      {/* Overlay for video readability */}
      <div className="video-overlay" />

      {/* Moving Bar */}
      <div className="moving-bar-container" ref={containerRef} aria-label="Skills Ticker">
        <div ref={barRef} className="moving-bar">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item" role="listitem">
              <span>{skill}</span>
            </div>
          ))}
          {skills.map((skill, index) => (
            <div key={`dup-${index}`} className="skill-item" role="listitem">
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovingBar;
