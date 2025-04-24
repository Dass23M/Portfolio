import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MovingBar.css';

const MovingBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    
    // Calculate the full width of the content
    const contentWidth = bar.scrollWidth;
    
    // Set initial position offscreen to the right
    gsap.set(bar, { x: container.offsetWidth });
    
    // Create the animation timeline
    const tl = gsap.timeline({
      repeat: -1, // Infinite repeat
      onRepeat: () => {
        // Change background color on each repeat
        gsap.to(bar, {
          backgroundColor: getRandomPremiumColor(),
          duration: 2,
          ease: "power1.inOut"
        });
      }
    });
    
    // Add the main animation
    tl.to(bar, {
      x: -contentWidth, // Move to left (beyond the container)
      duration: 20,
      ease: "none", // Linear movement
    });
    
    // Function to get a random premium color
    function getRandomPremiumColor() {
      const premiumColors = [
  
        "#F5DEB3"  // Wheat
      ];
      return premiumColors[Math.floor(Math.random() * premiumColors.length)];
    }
    
    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  // Array of skills/technologies to display
  const skills = [
    "React", "JavaScript", "TypeScript", "Node.js", 
    "GSAP", "Vite", "CSS", "HTML5", "Redux", 
    "Tailwind", "Next.js", "Three.js"
  ];
  
  return (
    <div className="moving-bar-container" ref={containerRef}>
      <div ref={barRef} className="moving-bar">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span>{skill}</span>
          </div>
        ))}
        {/* Duplicate for seamless looping */}
        {skills.map((skill, index) => (
          <div key={`dup-${index}`} className="skill-item">
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingBar;