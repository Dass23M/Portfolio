import React, { useEffect, useRef } from 'react';
import './NewAbout.css';
import { FaCode, FaDatabase, FaServer, FaCogs } from 'react-icons/fa';

const NewAbout = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Setup GSAP-like animations with vanilla JS
    const animateElements = () => {
      const title = document.querySelector('.title-container1');
      const para = document.querySelector('.about-para1');
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

    // Setup intersection observer for section entry animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateElements();
          observer.unobserve(sectionRef.current); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Setup mouse parallax effect for background elements
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
        <div className="title-container1">
          <h1 className="section-title">
            <span className="title-line">What</span>
            <span className="title-line">I Do</span>
          </h1>
        </div>

        <div className="about-para1">
          <p>
            I'm a passionate <span className="highlight">Full-Stack Developer</span> specializing in
            building modern, scalable, and user-centric web applications. With
            expertise in technologies like <span className="highlight">React</span>,{' '}
            <span className="highlight">Node.js</span>, <span className="highlight">Express</span>, and{' '}
            <span className="highlight">MongoDB</span>, I bring seamless front-to-back solutions.
            Let's collaborate to craft functional, visually stunning, and
            innovative digital experiences!
          </p>
        </div>

        <div className="skills-grid">
          <div className="section-box">
            <div className="icon-container">
              <FaCode className="icon" />
            </div>
            <h3>Frontend Development</h3>
            <p>
              Crafting dynamic and responsive user interfaces with React, HTML,
              CSS, and JavaScript. Focused on performance and design consistency.
            </p>
            <div className="hover-indicator"></div>
          </div>

          <div className="section-box">
            <div className="icon-container">
              <FaServer className="icon" />
            </div>
            <h3>Backend Development</h3>
            <p>
              Building robust, secure, and scalable server-side applications using
              Node.js, Express, and integrating RESTful APIs for seamless data
              flow.
            </p>
            <div className="hover-indicator"></div>
          </div>

          <div className="section-box">
            <div className="icon-container">
              <FaDatabase className="icon" />
            </div>
            <h3>Database Management</h3>
            <p>
              Designing and managing databases with MySQL, PostgreSQL, and
              MongoDB to ensure secure and efficient data storage solutions.
            </p>
            <div className="hover-indicator"></div>
          </div>

          <div className="section-box">
            <div className="icon-container">
              <FaCogs className="icon" />
            </div>
            <h3>DevOps</h3>
            <p>
              Streamlining deployment and CI/CD workflows with Docker, Kubernetes,
              and AWS for scalable and efficient application hosting.
            </p>
            <div className="hover-indicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAbout;