import React, { useEffect, useRef } from 'react';
import './NewAbout.css';
import { FaCode, FaDatabase, FaServer, FaCogs } from 'react-icons/fa';
import { gsap } from 'gsap';

const NewAbout = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const boxesRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // GSAP animations
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

    // IntersectionObserver for animation trigger
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

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    // Cleanup
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      gsap.killTweensOf([titleRef.current, paraRef.current, ...boxesRef.current]);
    };
  }, []);

  return (
    <div id="NewAbout" className="new-about-container" ref={sectionRef} aria-label="What I Do Section">
      <div className="background-elements">
        <div className="circle-element circle-1"></div>
        <div className="circle-element circle-2"></div>
        <div className="circle-element circle-3"></div>
        <div className="grid-element"></div>
      </div>

      <div className="content-container" ref={contentRef}>
        <div className="title-container1" ref={titleRef}>
          <h1 className="section-title">
            <span className="title-line">What</span>
            <span className="title-line">I Do</span>
          </h1>
        </div>

        <div className="about-para1" ref={paraRef}>
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
          {[
            {
              icon: <FaCode className="icon" aria-label="Frontend Development Icon" />,
              title: 'Frontend Development',
              description: 'Crafting dynamic and responsive user interfaces with React, HTML, CSS, and JavaScript. Focused on performance and design consistency.',
            },
            {
              icon: <FaServer className="icon" aria-label="Backend Development Icon" />,
              title: 'Backend Development',
              description: 'Building robust, secure, and scalable server-side applications using Node.js, Express, and integrating RESTful APIs for seamless data flow.',
            },
            {
              icon: <FaDatabase className="icon" aria-label="Database Management Icon" />,
              title: 'Database Management',
              description: 'Designing and managing databases with MySQL, PostgreSQL, and MongoDB to ensure secure and efficient data storage solutions.',
            },
            {
              icon: <FaCogs className="icon" aria-label="DevOps Icon" />,
              title: 'DevOps',
              description: 'Streamlining deployment and CI/CD workflows with Docker, Kubernetes, and AWS for scalable and efficient application hosting.',
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