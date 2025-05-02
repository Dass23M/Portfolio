import React, { useEffect, useRef } from 'react';
import './Hero.css';
import profile from '../../assets/profile.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionRef = useRef(null);
  const particlesRef = useRef(null);
  const backgroundLayersRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    // Create timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Background layers animation
    backgroundLayersRef.current.forEach((layer, index) => {
      gsap.set(layer, {
        x: index % 2 === 0 ? '-100%' : '100%',
        opacity: 0,
      });
      
      tl.to(layer, {
        x: '0%',
        opacity: 0.6,
        duration: 1.8,
        ease: 'power2.inOut',
        delay: index * 0.2,
      }, 0);
    });
    
    // Initial particles setup
    const particles = particlesRef.current.children;
    gsap.set(particles, { opacity: 0, scale: 0 });
    
    // Animate particles
    tl.to(particles, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      stagger: 0.05,
      ease: 'power2.out',
    }, 0.5);
    
    // Content animation sequence
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 50, scale: 0.5 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
      1
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      1.3
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      1.5
    )
    .fromTo(
      descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      1.7
    )
    .fromTo(
      actionRef.current.children,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
      },
      2
    );

    // Animate text typing effect for the subtitle
    if (!isMobile) {
      gsap.to(subtitleRef.current, {
        duration: 2,
        text: {
          value: "A Full-Stack Developer from Sri Lanka",
          delimiter: ""
        },
        ease: "none",
        delay: 2
      });
    }

    // Setup continuous particles animation
    gsap.to(particles, {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(3, 7)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 2,
        grid: "auto",
        from: "center"
      }
    });

    // Create parallax scrolling effect
    if (!isMobile) {
      gsap.to(backgroundLayersRef.current, {
        y: (i) => -50 - (i * 15),
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Image hover effect
    const imageHover = (e) => {
      const image = imageRef.current;
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(image, {
        x: x * 0.03,
        y: y * 0.03,
        rotation: x * 0.01,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const imageReset = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    imageRef.current.addEventListener('mousemove', imageHover);
    imageRef.current.addEventListener('mouseleave', imageReset);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      imageRef.current.removeEventListener('mousemove', imageHover);
      imageRef.current.removeEventListener('mouseleave', imageReset);
    };
  }, []);

  // Generate random particles
  const renderParticles = () => {
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 8 + 2;
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div id="Hero" className="hero" ref={heroRef} aria-label="Hero Section">
      {/* Background elements */}
      <div className="background-container">
        {[1, 2, 3, 4].map((_, index) => (
          <div 
            key={index} 
            className={`background-layer layer-${index}`}
            ref={el => backgroundLayersRef.current[index] = el}
          />
        ))}
        <div className="particles" ref={particlesRef}>
          {renderParticles()}
        </div>
      </div>
      
      <div className="hero-content" ref={contentRef}>
        <div className="image-container">
          <img
            src={profile}
            alt="Dasun Methmal Profile"
            className="hero-image"
            ref={imageRef}
          />
          <div className="image-glow"></div>
        </div>
        
        <div className="title-container">
          <h1 className="hero-title" ref={titleRef}>
            <span>Hello, I'm Dasun Methmal</span>
          </h1>
          <h2 className="hero-subtitle" ref={subtitleRef}>
            {window.innerWidth <= 768 ? "A Full-Stack Developer from Sri Lanka" : ""}
          </h2>
        </div>
        
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
            <span>Connect with me</span>
            <svg className="btn-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="/resume.pdf"
            className="hero-resume"
            role="button"
            aria-label="Download Resume"
            download
          >
            <span>Download Resume</span>
            <svg className="btn-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
              <path d="M12 17V3M12 17l-5-5M12 17l5-5M2 17v4h20v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;