import React, { useEffect, useRef } from 'react';
import './AboutMy.css';
import { FaCode, FaRocket } from 'react-icons/fa';

const NewAbout = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Setup animations
    const animateElements = () => {
      const title = document.querySelector('.title-container');
      const para = document.querySelector('.about-para');
      const boxes = document.querySelectorAll('.section-box');

      if (title) title.classList.add('animate');
      if (para) {
        setTimeout(() => {
          para.classList.add('animate');
        }, 300);
      }

      if (boxes) {
        boxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add('animate');
          }, 600 + index * 200);
        });
      }
    };

    // Intersection observer for section entry animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateElements();
          observer.unobserve(sectionRef.current); // Trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Mouse parallax effect for background elements
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
        circle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="NewAbout" className="new-about-container" ref={sectionRef}>
      <div className="background-elements">
        <div className="circle-element circle-1"></div>
        <div className="circle-element circle-2"></div>
        <div className="circle-element circle-3"></div>
        <div className="grid-element"></div>
      </div>

      <div className="content-container">
        <div className="title-container">
          <h1 className="section-title">
            <span className="title-line">About</span>
            <span className="title-line">Me</span>
          </h1>
        </div>

        <div className="about-para">
          <p>
            I'm a <span className="highlight">dedicated Full-Stack Web Developer</span> passionate about crafting intuitive, scalable, and visually appealing digital solutions. With expertise in modern technologies, I focus on delivering seamless user experiences.
          </p>
        </div>

        <div className="skills-grid">
          <div className="section-box">
            <div className="icon-container">
              <FaCode className="icon" />
            </div>
            <h3>About Me</h3>
            <p>
              Expertise in building responsive, user-focused applications with a strong focus on clean code and scalable architectures. Proficient in front-end and back-end technologies.
            </p>
            <div className="hover-indicator"></div>
          </div>

          <div className="section-box">
            <div className="icon-container">
              <FaRocket className="icon" />
            </div>
            <h3>Vision & Goals</h3>
            <p>
              My goal is to create seamless digital experiences that make a real difference. I strive to deliver high-quality, impactful solutions while embracing innovation and collaboration.
            </p>
            <div className="hover-indicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAbout;