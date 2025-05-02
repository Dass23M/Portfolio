import React, { useEffect, useRef } from 'react';
import './Hero.css';
import profile from '../../assets/profile.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const particlesRef = useRef(null);

  // Particle.js configuration
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Create a GSAP timeline for orchestrated animations
    const tl = gsap.timeline();

    // Content container animation
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1.2, ease: 'power4.out' }
    );

    // Profile image animation with rotation and scale
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: isMobile ? 1 : 1.5,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.2,
      },
      '-=0.8'
    );

    // Title animation with letter stagger
    tl.fromTo(
      titleRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4,
      },
      '-=0.6'
    );

    // Description animation
    tl.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1, ease: 'power3.out', delay: 0.6 },
      '-=0.4'
    );

    // Action buttons animation with bounce
    tl.fromTo(
      actionRef.current.children,
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.6 : 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: 0.8,
      },
      '-=0.4'
    );

    // Parallax effect on profile image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Background gradient animation
    gsap.to(heroRef.current, {
      background: 'linear-gradient(135deg, #1e3a8a, #6b21a8)',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Particle interaction with mouse movement
    const handleMouseMove = (e) => {
      gsap.to(particlesRef.current, {
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="Hero" className="hero" ref={heroRef} aria-label="Hero Section">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#60a5fa' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: { enable: true, mode: 'repulse' },
              onclick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        canvasRef={particlesRef}
      />
      <div className="hero-content" ref={contentRef}>
        <img
          src={profile}
          alt="Dasun Methmal Profile"
          className="hero-image"
          ref={imageRef}
        />
        <h1 className="hero-title" ref={titleRef}>
          <span>Hello, I'm Dasun Methmal</span>
          <span>A Full-Stack Developer from Sri Lanka</span>
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