import React, { useEffect, useRef } from 'react';
import './AboutMy.css';
import { FaCode, FaRocket } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const NewAbout = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const boxesRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Initial animations with IntersectionObserver
    const animateElements = () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: isMobile ? 0.6 : 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: isMobile ? 0.7 : 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: isMobile ? 0.7 : 1, ease: 'power3.out', delay: 0.4 }
      );

      boxesRef.current.forEach((box, index) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 0.8,
            ease: 'power2.out',
            delay: 0.6 + index * 0.15,
          }
        );
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateElements();
          observer.unobserve(sectionRef.current); // Trigger once
        }
      },
      { threshold: isMobile ? 0.3 : 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Mouse parallax effect (desktop only)
    if (!isMobile) {
      const handleMouseMove = (e) => {
        const circles = document.querySelectorAll('.circle-element');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        circles.forEach((circle, index) => {
          const factor = (index + 1) * 0.03;
          const x = (mouseX - centerX) * factor;
          const y = (mouseY - centerY) * factor;
          gsap.to(circle, {
            x,
            y,
            duration: 0.8,
            ease: 'power2.out',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Key up/down event listeners (desktop only)
      const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp') {
          gsap.to(titleRef.current, {
            y: -15,
            scale: 0.95,
            opacity: 0.8,
            duration: 0.5,
            ease: 'power2.in',
            yoyo: true,
            repeat: 1,
          });

          gsap.to(paraRef.current, {
            y: -10,
            opacity: 0.85,
            duration: 0.5,
            ease: 'power2.in',
            yoyo: true,
            repeat: 1,
            delay: 0.1,
          });

          boxesRef.current.forEach((box, index) => {
            gsap.to(box, {
              y: -8,
              scale: 0.98,
              opacity: 0.9,
              duration: 0.5,
              ease: 'power2.in',
              yoyo: true,
              repeat: 1,
              delay: 0.2 + index * 0.1,
            });
          });
        } else if (e.key === 'ArrowDown') {
          gsap.to(titleRef.current, {
            y: 15,
            scale: 1.05,
            opacity: 1,
            duration: 0.6,
            ease: 'bounce.out',
          });

          gsap.to(paraRef.current, {
            y: 10,
            opacity: 1,
            duration: 0.6,
            ease: 'bounce.out',
            delay: 0.1,
          });

          boxesRef.current.forEach((box, index) => {
            gsap.to(box, {
              y: 8,
              scale: 1.02,
              opacity: 1,
              duration: 0.6,
              ease: 'bounce.out',
              delay: 0.2 + index * 0.1,
            });
          });
        }
      };

      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }

    // Cleanup for all cases
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      gsap.killTweensOf([titleRef.current, paraRef.current, ...boxesRef.current]);
    };
  }, []);

  return (
    <div id="NewAbout" className="new-about-container" ref={sectionRef} aria-label="About Me Section">
      <div className="background-elements">
        <div className="circle-element circle-1"></div>
        <div className="circle-element circle-2"></div>
        <div className="circle-element circle-3"></div>
        <div className="grid-element"></div>
      </div>

      <div className="content-container" ref={contentRef}>
        <div className="title-container" ref={titleRef}>
          <h1 className="section-title">
            <span className="title-line">About</span>
            <span className="title-line">Me</span>
          </h1>
        </div>

        <div className="about-para" ref={paraRef}>
          <p>
            I'm a <span className="highlight">dedicated Full-Stack Web Developer</span> passionate about crafting intuitive, scalable, and visually appealing digital solutions. With expertise in modern technologies, I focus on delivering seamless user experiences.
          </p>
        </div>

        <div className="skills-grid">
          {[
            {
              icon: <FaCode className="icon" aria-label="Code Icon" />,
              title: 'About Me',
              description: 'Expertise in building responsive, user-focused applications with a strong focus on clean code and scalable architectures. Proficient in front-end and back-end technologies.',
            },
            {
              icon: <FaRocket className="icon" aria-label="Rocket Icon" />,
              title: 'Vision & Goals',
              description: 'My goal is to create seamless digital experiences that make a real difference. I strive to deliver high-quality, impactful solutions while embracing innovation and collaboration.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="section-box"
              ref={(el) => (boxesRef.current[index] = el)}
              role="article"
              aria-label={item.title}
            >
              <div className="icon-container">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="hover-indicator"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewAbout;