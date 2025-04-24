import React, { useEffect, useRef } from 'react';
import './Hero.css';
import profile from '../../assets/profile.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Content container animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1.2, ease: 'power3.out' }
    );

    // Individual element animations
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: isMobile ? 1 : 1.5, ease: 'bounce.out', delay: 0.2 }
    );

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1, ease: 'power3.out', delay: 0.4 }
    );

    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1, ease: 'power3.out', delay: 0.6 }
    );

    gsap.fromTo(
      actionRef.current.children,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.6 : 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.8,
      }
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="Hero" className="hero" ref={heroRef} aria-label="Hero Section">
      <div className="hero-content" ref={contentRef}>
        <img
          src={profile}
          alt="Dasun Methmal Profile"
          className="hero-image"
          ref={imageRef}
        />
        <h1 className="hero-title" ref={titleRef}>
          <span>Hello, I'm Dasun Methmal</span>
          <br />
          A Full-Stack Developer from Sri Lanka
        </h1>
        <p className="hero-description" ref={descriptionRef}>
          Building seamless, scalable, and user-centric digital experiences through
          innovation and technology.
        </p>
        <div className="hero-action" ref={actionRef}>
          <a
            href="#Contact"
            className="hero-connect"
            role="button"
            aria-label="Connect with me"
          >
            Connect with me
          </a>
          <a
            href="/resume.pdf"
            className="hero-resume"
            role="button"
            aria-label="Download Resume"
            download
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;