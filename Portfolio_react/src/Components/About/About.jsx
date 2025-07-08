import React, { useEffect, useRef, useState } from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiHtml5, SiCss3, SiMongodb, SiExpress, SiPython, SiTypescript, SiTailwindcss } from 'react-icons/si';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

const About = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const iconsRef = useRef(null);
  const skillsGridRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const techStack = [
    { Icon: FaReact, name: "React", color: "#61DAFB", description: "Frontend Framework" },
    { Icon: FaNodeJs, name: "Node.js", color: "#339933", description: "Backend Runtime" },
    { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", description: "Programming Language" },
    { Icon: SiTypescript, name: "TypeScript", color: "#3178C6", description: "Typed JavaScript" },
    { Icon: SiPython, name: "Python", color: "#3776AB", description: "Programming Language" },
    { Icon: SiHtml5, name: "HTML5", color: "#E34F26", description: "Markup Language" },
    { Icon: SiCss3, name: "CSS3", color: "#1572B6", description: "Styling Language" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4", description: "CSS Framework" },
    { Icon: SiMongodb, name: "MongoDB", color: "#47A248", description: "NoSQL Database" },
    { Icon: SiExpress, name: "Express.js", color: "#000000", description: "Web Framework" },
    { Icon: FaDatabase, name: "SQL", color: "#336791", description: "Database" },
    { Icon: FaGitAlt, name: "Git", color: "#F05032", description: "Version Control" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !isLoaded) return;

    const elements = [
      { ref: titleRef, delay: 0.2 },
      { ref: descriptionRef, delay: 0.4 },
      { ref: iconsRef, delay: 0.6 },
      { ref: skillsGridRef, delay: 0.8 }
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          ref.current.classList.add('animate-in');
        }, delay * 1000);
      }
    });

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isLoaded]);



  return (
    <div 
      id="About" 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        padding: '4rem 0',
      }}
    >
      {/* Video Background */}
      <div 
        className="video-background"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          zIndex: 1,
        }}
      >
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
            filter: 'brightness(0.5) contrast(2.9) hue-rotate(160deg)',
          }}
        >
          <source src={videoWebM} type="video/webm" />
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
            radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Animated Grid */}
      <div 
        style={{
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
          animation: 'gridMove 25s linear infinite',
        }}
      />

      {/* Main Content */}
      <div 
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Title */}
        <h2 
          ref={titleRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem',
            opacity: 0,
            transform: 'translateY(60px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            textShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Full-Stack Developer
          </span>
        </h2>

        {/* Description */}
        <p 
          ref={descriptionRef}
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#d1d5db',
            maxWidth: '700px',
            lineHeight: '1.7',
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Passionate about creating seamless, dynamic, and scalable applications with modern web technologies. 
          I combine technical expertise with creative problem-solving to deliver exceptional digital experiences.
        </p>

        {/* Skills Grid */}
        <div 
          ref={skillsGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            width: '100%',
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Frontend Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <h3 style={{
              color: '#6366f1',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '600',
            }}>Frontend</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}>
              {techStack.filter(tech => ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'].includes(tech.name)).map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    minWidth: '80px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.background = `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <tech.Icon size={24} color={tech.color} />
                  <span style={{
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    fontWeight: '500',
                  }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <h3 style={{
              color: '#a855f7',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '600',
            }}>Backend & Tools</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
            }}>
              {techStack.filter(tech => ['Node.js', 'Python', 'MongoDB', 'Express.js', 'SQL', 'Git'].includes(tech.name)).map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    minWidth: '80px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.background = `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <tech.Icon size={24} color={tech.color} />
                  <span style={{
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem',
                    fontWeight: '500',
                  }}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div 
          ref={iconsRef}
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {techStack.slice(0, 6).map((tech, index) => (
            <div
              key={tech.name}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2) rotate(10deg)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${tech.color}40`;
                e.currentTarget.style.borderColor = tech.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <tech.Icon size={32} color={tech.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes particle-move {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-100px) rotate(120deg); }
          66% { transform: translateY(-200px) rotate(240deg); }
          100% { transform: translateY(-300px) rotate(360deg); }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
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

export default About;