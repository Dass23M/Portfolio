import React, { useEffect, useRef } from 'react';
import './Hero.css';
import profile from '../../assets/profile.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    // Initial animations on page load
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'bounce.out' }
    );

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      actionRef.current.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.7 }
    );

    // ScrollTrigger for background gradient shift
    gsap.to(heroRef.current, {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="Hero" className="hero" ref={heroRef}>
      <div className="hero-content">
        <img src={profile} alt="Profile" className="hero-image" ref={imageRef} />
        <h1 className="hero-title" ref={titleRef}>
          <span>Hello, I'm Dasun Methmal</span> <br /> A Full-Stack Developer from Sri Lanka
        </h1>
        <p className="hero-description" ref={descriptionRef}>
          Building seamless, scalable, and user-centric digital experiences through innovation and technology.
-
        </p>
        <div className="hero-action" ref={actionRef}>
          <div className="hero-connect">Connect with me</div>
          <div className="hero-resume">Download Resume</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;