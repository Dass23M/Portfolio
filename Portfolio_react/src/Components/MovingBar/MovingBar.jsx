import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MovingBar.css';

const MovingBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    const isMobile = window.innerWidth <= 768;

    // Calculate the full width of the content
    const contentWidth = bar.scrollWidth;

    // Set initial position offscreen to the right
    gsap.set(bar, { x: container.offsetWidth });

    // Create the animation timeline
    timelineRef.current = gsap.timeline({
      repeat: -1, // Infinite repeat
      paused: true, // Start paused for IntersectionObserver
      onRepeat: () => {
        // Change background color on each repeat
        gsap.to(bar, {
          background: `linear-gradient(90deg, ${getRandomPremiumColor()}, ${getRandomPremiumColor()})`,
          duration: isMobile ? 1.5 : 2,
          ease: 'power1.inOut',
        });
      },
    });

    // Add the main animation
    timelineRef.current.to(bar, {
      x: -contentWidth, // Move to left (beyond the container)
      duration: isMobile ? 15 : 20,
      ease: 'none', // Linear movement
    });

    // IntersectionObserver to play/pause animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timelineRef.current.play();
        } else {
          timelineRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    // Function to get a random premium color
    function getRandomPremiumColor() {
      const premiumColors = [
        '#FFD700', // Gold
        '#FF6F61', // Coral
        '#6B7280', // Cool Gray
        '#34D399', // Emerald
        '#60A5FA', // Blue
        '#F472B6', // Pink
      ];
      return premiumColors[Math.floor(Math.random() * premiumColors.length)];
    }

    // Clean up
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (container) observer.unobserve(container);
      gsap.killTweensOf(bar);
    };
  }, []);

  // Array of skills/technologies to display
  const skills = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'GSAP',
    'Vite',
    'CSS',
    'HTML5',
    'Redux',
    'Tailwind',
    'Next.js',
    'Three.js',
  ];

  return (
    <div className="moving-bar-container" ref={containerRef} aria-label="Skills Ticker">
      <div ref={barRef} className="moving-bar">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item" role="listitem">
            <span>{skill}</span>
          </div>
        ))}
        {/* Duplicate for seamless looping */}
        {skills.map((skill, index) => (
          <div key={`dup-${index}`} className="skill-item" role="listitem">
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingBar;