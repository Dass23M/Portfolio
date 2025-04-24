import React, { useEffect, useRef } from 'react';
import './MovingBar.css';

const MovingBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    let animationFrameId;

    const animate = () => {
      bar.style.transform = `translateX(-${bar.scrollWidth / 2}px)`;
      
      const reset = () => {
        bar.style.transition = 'none';
        bar.style.transform = 'translateX(0)';
        void bar.offsetWidth;
        bar.style.transition = 'transform 20s linear';
        bar.style.transform = `translateX(-${bar.scrollWidth / 2}px)`;
      };

      bar.addEventListener('transitionend', reset);
      animationFrameId = requestAnimationFrame(animate);

      return () => {
        bar.removeEventListener('transitionend', reset);
        cancelAnimationFrame(animationFrameId);
      };
    };

    bar.style.transition = 'transform 20s linear';
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="moving-bar-container">
      <div
        ref={barRef}
        className="moving-bar"
        style={{ width: '200%' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="moving-bar-content">
            <span>React</span>
            <span>JavaScript</span>
            <span>CSS</span>
            <span>Vite</span>
            <span>Node.js</span>
            <span>TypeScript</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingBar;