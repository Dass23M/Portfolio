import React, { useEffect, useRef } from 'react';
import { FaCode, FaDatabase, FaServer, FaCogs, FaRocket, FaAward } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutMy = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const boxesRef = useRef([]);
  const floatingElementsRef = useRef([]);

  // Skills data with enhanced content
  const skillsData = [
    {
      icon: <FaCode className="skill-icon" />,
      title: 'Frontend Development',
      description: 'Crafting dynamic and responsive user interfaces with React, Vue.js, HTML5, CSS3, and modern JavaScript. Focused on performance optimization and pixel-perfect design.',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)'
    },
    {
      icon: <FaServer className="skill-icon" />,
      title: 'Backend Development',
      description: 'Building robust, secure, and scalable server-side applications using Node.js, Express, Python, and integrating RESTful APIs for seamless data flow.',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7, #9333ea)'
    },
    {
      icon: <FaDatabase className="skill-icon" />,
      title: 'Database Management',
      description: 'Designing and managing databases with MySQL, PostgreSQL, MongoDB, and Redis to ensure secure, efficient, and optimized data storage solutions.',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    },
    {
      icon: <FaCogs className="skill-icon" />,
      title: 'DevOps & Cloud',
      description: 'Streamlining deployment and CI/CD workflows with Docker, Kubernetes, AWS, and Azure for scalable and efficient application hosting.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      icon: <FaRocket className="skill-icon" />,
      title: 'Innovation & Growth',
      description: 'Passionate about emerging technologies and continuous learning. Always exploring new frameworks, tools, and development methodologies.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: <FaAward className="skill-icon" />,
      title: 'Quality Standards',
      description: 'Committed to excellence in every project. Following best practices for performance, security, accessibility, and user experience optimization.',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    // Initialize GSAP timeline
    const tl = gsap.timeline({ paused: true });

    // Video background animation
    if (videoRef.current) {
      gsap.set(videoRef.current, {
        scale: 1.1,
        filter: 'brightness(0.3) contrast(1.2) saturate(1.1)',
      });
    }

    // Floating elements animation
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.to(element, {
          y: -30,
          rotation: 360,
          duration: 4 + index * 0.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      }
    });

    // Main content animations
    tl.fromTo(
      contentRef.current,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: isMobile ? 0.8 : 1.2, 
        ease: 'power3.out' 
      }
    )
    .fromTo(
      titleRef.current,
      { 
        opacity: 0, 
        y: 50,
        rotationX: 30
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: isMobile ? 0.8 : 1.2, 
        ease: 'power3.out' 
      }, 
      '-=0.6'
    )
    .fromTo(
      paraRef.current,
      { 
        opacity: 0, 
        y: 40,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: isMobile ? 0.8 : 1.2, 
        ease: 'power3.out' 
      }, 
      '-=0.8'
    );

    // Skill boxes stagger animation
    boxesRef.current.forEach((box, index) => {
      if (box) {
        tl.fromTo(
          box,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.8,
            rotationY: 30
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: isMobile ? 0.6 : 0.9,
            ease: 'power2.out',
          },
          `-=${0.7 - index * 0.1}`
        );
      }
    });

    // ScrollTrigger for section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? 'top 80%' : 'top 70%',
      onEnter: () => {
        tl.play();
      },
      once: true
    });

    // Parallax effects
    if (!isMobile) {
      // Mouse parallax for skill boxes
      const handleMouseMove = (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        boxesRef.current.forEach((box, index) => {
          if (box) {
            const factor = (index + 1) * 0.02;
            const x = (mouseX - centerX) * factor;
            const y = (mouseY - centerY) * factor;
            
            gsap.to(box, {
              x,
              y,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        });

        // Parallax for floating elements
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            const factor = (index + 1) * 0.01;
            const x = (mouseX - centerX) * factor;
            const y = (mouseY - centerY) * factor;
            
            gsap.to(element, {
              x,
              y,
              duration: 1,
              ease: 'power2.out',
            });
          }
        });
      };

      // Video parallax on scroll
      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            y: rate,
            duration: 0.5,
            ease: 'power2.out'
          });
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
      id="AboutMy" 
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 0',
      }}
    >
      {/* Video Background */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
        zIndex: 1,
      }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="https://cdn.pixabay.com/vimeo/561522012/smoke-118726.mp4?width=1920&hash=c7d1c43d8c52b8f1c9a7b4d3e2f1a0b3c4d5e6f7" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.85) 100%)
          `,
          zIndex: 2,
        }}
      />

      {/* Animated Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 2,
        animation: 'gridMove 30s linear infinite',
      }} />

      {/* Floating Elements */}
      {skillsData.map((skill, index) => (
        <div
          key={`floating-${index}`}
          ref={(el) => (floatingElementsRef.current[index] = el)}
          style={{
            position: 'absolute',
            width: `${30 + index * 8}px`,
            height: `${30 + index * 8}px`,
            borderRadius: '50%',
            background: skill.gradient,
            opacity: 0.1,
            top: `${15 + index * 12}%`,
            left: `${8 + index * 15}%`,
            zIndex: 2,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1400px',
          width: '100%',
          padding: '0 2rem',
          opacity: 0,
        }}
      >
        {/* Title Section */}
        <div 
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff, #d1d5db)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(99, 102, 241, 0.3)',
            letterSpacing: '-0.02em',
          }}>
            About{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Me
            </span>
          </h1>
          <div style={{
            width: '120px',
            height: '6px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
            margin: '0 auto',
            borderRadius: '3px',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
          }} />
        </div>

        {/* Description */}
        <div 
          ref={paraRef}
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
            opacity: 0,
          }}
        >
          <p style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            color: '#e5e7eb',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: '400',
          }}>
            I'm a passionate{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
            }}>
              Full-Stack Developer
            </span>{' '}
            specializing in building modern, scalable, and user-centric web applications. 
            With expertise in cutting-edge technologies like{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600',
            }}>
              React, Node.js, Express, and MongoDB
            </span>, I bring seamless front-to-back solutions that make a real impact.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {skillsData.map((skill, index) => (
            <div
              key={index}
              ref={(el) => (boxesRef.current[index] = el)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                padding: '2.5rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                opacity: 0,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -15,
                  scale: 1.05,
                  background: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: `0 25px 50px rgba(99, 102, 241, 0.3)`,
                  border: `1px solid ${skill.color}40`,
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
            >
              {/* Background Gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: skill.gradient,
                opacity: 0.03,
                borderRadius: '24px',
              }} />

              {/* Icon */}
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: skill.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                boxShadow: `0 0 40px ${skill.color}40`,
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: '#ffffff',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                }}>
                  {skill.icon}
                </div>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
              }}>
                {skill.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '1.1rem',
                color: '#d1d5db',
                lineHeight: '1.7',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}>
                {skill.description}
              </p>

              {/* Hover Effect Line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: skill.gradient,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s ease',
                borderRadius: '0 0 24px 24px',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        .skill-icon {
          font-size: 2rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        /* Hover effect for skill boxes */
        div:hover div:last-child {
          transform: scaleX(1);
        }
        
        @media (max-width: 1024px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr;
            gap: 1.5rem;
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

export default AboutMy;