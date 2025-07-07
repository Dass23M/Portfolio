import React, { useEffect, useRef } from 'react';
import './NewAbout.css';
import { FaCode, FaDatabase, FaServer, FaCogs } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const NewAbout = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const boxesRef = useRef([]);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    // Initialize main timeline
    const mainTimeline = gsap.timeline({ paused: true });

    // Video background setup
    if (videoRef.current) {
      gsap.set(videoRef.current, {
        scale: 1.1,
        filter: 'brightness(0.3) contrast(1.1) hue-rotate(180deg)',
      });
    }

    // Floating elements animation
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.to(element, {
          y: -20,
          x: 10,
          rotation: 360,
          duration: 3 + index * 0.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.4
        });
      }
    });

    // Main content animations with professional timing
    mainTimeline
      .fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95,
          rotationX: 10
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: isMobile ? 0.8 : 1.2, 
          ease: 'power3.out' 
        }
      )
      .fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: 40,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: isMobile ? 0.7 : 1, 
          ease: 'power3.out' 
        }, 
        '-=0.8'
      )
      .fromTo(
        paraRef.current,
        { 
          opacity: 0, 
          y: 30,
          x: -20
        },
        { 
          opacity: 1, 
          y: 0,
          x: 0,
          duration: isMobile ? 0.7 : 1, 
          ease: 'power3.out' 
        }, 
        '-=0.6'
      );

    // Skill boxes staggered animation
    boxesRef.current.forEach((box, index) => {
      if (box) {
        mainTimeline.fromTo(
          box,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.8,
            rotationY: 20
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: isMobile ? 0.6 : 0.8,
            ease: 'power2.out',
          },
          `-=${0.6 - index * 0.15}`
        );
      }
    });

    // ScrollTrigger for main animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? 'top 80%' : 'top 70%',
      onEnter: () => {
        mainTimeline.play();
      },
      once: true
    });

    // Advanced interactions for desktop
    if (!isMobile) {
      // Mouse parallax effect
      const handleMouseMove = (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Parallax for skill boxes
        boxesRef.current.forEach((box, index) => {
          if (box) {
            const factor = (index + 1) * 0.02;
            const x = (mouseX - centerX) * factor;
            const y = (mouseY - centerY) * factor;
            
            gsap.to(box, {
              x,
              y,
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        });

        // Parallax for floating elements
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            const factor = (index + 1) * 0.015;
            const x = (mouseX - centerX) * factor;
            const y = (mouseY - centerY) * factor;
            
            gsap.to(element, {
              x,
              y,
              duration: 1.2,
              ease: 'power2.out',
            });
          }
        });
      };

      // Video parallax on scroll
      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const sectionTop = sectionRef.current?.offsetTop || 0;
        const sectionHeight = sectionRef.current?.offsetHeight || 0;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
          const parallaxValue = (scrolled - sectionTop) * 0.3;
          
          if (videoRef.current) {
            gsap.to(videoRef.current, {
              y: parallaxValue,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([
        videoRef.current,
        contentRef.current,
        titleRef.current,
        paraRef.current,
        ...boxesRef.current,
        ...floatingElementsRef.current
      ]);
    };
  }, []);

  return (
    <div 
      id="NewAbout" 
      className="new-about-container" 
      ref={sectionRef} 
      aria-label="What I Do Section"
    >
      {/* Video Background */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source src={videoMp4} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="gradient-overlay" ref={overlayRef}></div>

      {/* Animated Grid */}
      <div className="animated-grid"></div>

      {/* Background Elements */}
      <div className="background-elements">
        <div 
          className="circle-element circle-1" 
          ref={(el) => (floatingElementsRef.current[0] = el)}
        ></div>
        <div 
          className="circle-element circle-2" 
          ref={(el) => (floatingElementsRef.current[1] = el)}
        ></div>
        <div 
          className="circle-element circle-3" 
          ref={(el) => (floatingElementsRef.current[2] = el)}
        ></div>
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

      <style jsx>{`
        .new-about-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
        }

        .video-background {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          z-index: 1;
        }

        .background-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.3) contrast(1.1) hue-rotate(180deg);
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.8) 100%);
          z-index: 2;
        }

        .animated-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 2;
          animation: gridMove 25s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .circle-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
          filter: blur(1px);
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          top: 20%;
          left: 10%;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), transparent);
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          top: 60%;
          right: 15%;
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.1), transparent);
        }

        .circle-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), transparent);
        }

        .grid-element {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.05), transparent);
          border: 1px solid rgba(99, 102, 241, 0.1);
          transform: rotate(45deg);
        }

        .content-container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          width: 100%;
          padding: 0 2rem;
          opacity: 0;
        }

        .title-container1 {
          text-align: center;
          margin-bottom: 3rem;
          opacity: 0;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
          line-height: 1.1;
        }

        .title-line {
          display: block;
          background: linear-gradient(135deg, #ffffff, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-para1 {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
        }

        .about-para1 p {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: #d1d5db;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .highlight {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .section-box {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        .section-box:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .icon-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
        }

        .icon {
          font-size: 2rem;
          color: #ffffff;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .section-box h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .section-box p {
          font-size: 1rem;
          color: #d1d5db;
          line-height: 1.6;
          margin: 0;
        }

        .hover-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .section-box:hover .hover-indicator {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .section-box {
            padding: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NewAbout;