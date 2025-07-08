import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap, Star, ArrowRight, Code, Globe, Layers } from 'lucide-react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

const MyProjects = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const projectsGridRef = useRef(null);
  const projectCardsRef = useRef([]);
  const showMoreRef = useRef(null);
  const floatingElementsRef = useRef([]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const mywork_data = [
    { 
      w_no: 1, 
      w_name: "E-Commerce Platform", 
      w_img: "../../assets/project_1.svg", 
      w_description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"], 
      github_url: "#", 
      live_url: "#", 
      featured: true,
      category: "Full-Stack"
    },
    { 
      w_no: 2, 
      w_name: "Task Management App", 
      w_img: "../../assets/project_2.svg", 
      w_description: "Collaborative task management application with real-time updates, team collaboration, and progress tracking.",
      technologies: ["Vue.js", "Firebase", "Vuex", "WebSocket"], 
      github_url: "#", 
      live_url: "#", 
      featured: false,
      category: "Web App"
    },
    { 
      w_no: 3, 
      w_name: "Portfolio Website", 
      w_img: "../../assets/project_3.svg", 
      w_description: "Modern, responsive portfolio website with smooth animations, dark mode, and optimized performance.",
      technologies: ["React", "GSAP", "Tailwind", "Framer Motion"], 
      github_url: "#", 
      live_url: "#", 
      featured: true,
      category: "Portfolio"
    },
    { 
      w_no: 4, 
      w_name: "Weather Dashboard", 
      w_img: "../../assets/project_4.svg", 
      w_description: "Interactive weather dashboard with data visualization, forecasts, and location-based weather tracking.",
      technologies: ["JavaScript", "D3.js", "OpenWeather API", "Chart.js"], 
      github_url: "#", 
      live_url: "#", 
      featured: false,
      category: "Data Viz"
    },
    { 
      w_no: 5, 
      w_name: "Social Media App", 
      w_img: "../../assets/project_5.svg", 
      w_description: "Modern social media platform with real-time messaging, content sharing, and user engagement features.",
      technologies: ["React Native", "GraphQL", "Apollo", "AWS"], 
      github_url: "#", 
      live_url: "#", 
      featured: true,
      category: "Mobile App"
    },
    { 
      w_no: 6, 
      w_name: "Analytics Dashboard", 
      w_img: "../../assets/project_6.svg", 
      w_description: "Comprehensive analytics dashboard with real-time data processing, custom reports, and interactive charts.",
      technologies: ["React", "Chart.js", "Python", "PostgreSQL"], 
      github_url: "#", 
      live_url: "#", 
      featured: false,
      category: "Dashboard"
    }
  ];

  // Initialize on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          animateElements();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [isVisible]);

  // GSAP-like animations using CSS transitions
  const animateElements = () => {
    // Animate title
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
    }, 200);

    // Animate projects grid
    setTimeout(() => {
      if (projectsGridRef.current) {
        projectsGridRef.current.style.opacity = '1';
        projectsGridRef.current.style.transform = 'translateY(0)';
      }
    }, 400);

    // Animate project cards with stagger
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 600 + index * 100);
      }
    });

    // Animate show more button
    setTimeout(() => {
      if (showMoreRef.current) {
        showMoreRef.current.style.opacity = '1';
        showMoreRef.current.style.transform = 'translateY(0)';
      }
    }, 1000);
  };

  // Enhanced parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const sectionTop = sectionRef.current?.offsetTop || 0;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      
      if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const parallaxValue = (scrolled - sectionTop) * 0.3;
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${parallaxValue}px)`;
        }

        // Parallax for floating elements
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${parallaxValue * speed}px)`;
          }
        });
      }
    };

    // Touch-friendly mouse movement for desktop only
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const handleMouseMove = (e) => {
      if (isTouchDevice) return; // Skip mouse move effects on touch devices
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      projectCardsRef.current.forEach((card, index) => {
        if (card) {
          const factor = (index + 1) * 0.01;
          const x = deltaX * factor * 15;
          const y = deltaY * factor * 15;
          const rotateX = deltaY * factor * 2;
          const rotateY = deltaX * factor * 2;
          
          card.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleShowMore = () => {
    console.log('Show more projects clicked');
  };

  return (
    <div 
      id="Projects" 
      className="projects-section"
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
        padding: '3rem 0',
      }}
    >
      {/* Video Background */}
      <div 
        className="video-background"
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
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
            filter: 'brightness(0.8) contrast(1.2) hue-rotate(200deg)',
          }}
        >
          <source src={videoWebM} type="video/webm" />
        </video>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div 
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 30% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 20% 60%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
          `,
          zIndex: 2,
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
          backgroundSize: '40px 40px',
          zIndex: 2,
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Floating Elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (floatingElementsRef.current[i] = el)}
          style={{
            position: 'absolute',
            width: `${10 + i * 6}px`,
            height: `${10 + i * 6}px`,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${['#ec4899', '#6366f1', '#a855f7', '#10b981'][i]}, transparent)`,
            opacity: 0.1,
            top: `${10 + i * 20}%`,
            left: `${15 + i * 20}%`,
            animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Main Content */}
      <div 
        className="projects-content"
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1400px',
          width: '100%',
          padding: '0 1rem',
        }}
      >
        {/* Title Section */}
        <div 
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '0.8rem',
          }}>
            <Layers size={28} color="#ec4899" />
            <h2 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 0 30px rgba(236, 72, 153, 0.3)',
            }}>
              My{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ec4899, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Projects
              </span>
            </h2>
          </div>
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#d1d5db',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.5',
          }}>
            Showcasing innovative solutions and creative implementations across various technologies
          </p>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(135deg, #ec4899, #6366f1)',
            margin: '1.5rem auto 0',
            borderRadius: '2px',
            boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)',
          }} />
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {mywork_data.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectCardsRef.current[index] = el)}
              className="project-card"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(15px)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                opacity: 0,
                transform: 'translateY(40px) scale(0.95)',
                position: 'relative',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                touchAction: 'auto',
              }}
              onMouseEnter={(e) => {
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(236, 72, 153, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)';
              }}
              onMouseLeave={(e) => {
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                e.currentTarget.style.transform = 'translateY(0) scale(0.95)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(0.95)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div style={{
                  position: 'absolute',
                  top: '0.8rem',
                  right: '0.8rem',
                  background: 'linear-gradient(135deg, #ec4899, #6366f1)',
                  borderRadius: '16px',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 3px 10px rgba(236, 72, 153, 0.3)',
                  zIndex: 10,
                }}>
                  <Star size={10} />
                  Featured
                </div>
              )}

              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '0.8rem',
                left: '0.8rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.7rem',
                fontWeight: '500',
                color: '#d1d5db',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}>
                {project.category}
              </div>

              {/* Project Number */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #ec4899, #6366f1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: '700',
                color: '#fff',
                boxShadow: '0 3px 15px rgba(236, 72, 153, 0.4)',
              }}>
                {String(project.w_no).padStart(2, '0')}
              </div>

              {/* Content */}
              <div style={{ marginTop: '1.8rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.8rem',
                  textAlign: 'center',
                }}>
                  {project.w_name}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: '#d1d5db',
                  lineHeight: '1.5',
                  marginBottom: '1.2rem',
                  textAlign: 'center',
                }}>
                  {project.w_description}
                </p>

                {/* Technologies */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  marginBottom: '1.5rem',
                  justifyContent: 'center',
                }}>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.3)',
                        borderRadius: '10px',
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.75rem',
                        color: '#ec4899',
                        fontWeight: '500',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.8rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.6rem 1.2rem',
                      background: 'linear-gradient(135deg, #ec4899, #6366f1)',
                      borderRadius: '12px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 3px 10px rgba(236, 72, 153, 0.3)',
                      fontSize: '0.9rem',
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={(e) => {
                      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(236, 72, 153, 0.3)';
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.4)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(236, 72, 153, 0.3)';
                    }}
                  >
                    <Globe size={14} />
                    Live Demo
                  </a>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.6rem 1.2rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem',
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={(e) => {
                      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className="hover-line" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(135deg, #ec4899, #6366f1)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease',
              }} />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
        }}>
          <button
            ref={showMoreRef}
            onClick={handleShowMore}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(236, 72, 153, 0.3)',
              borderRadius: '40px',
              padding: '1rem 2rem',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              fontWeight: '600',
              opacity: 0,
              transform: 'translateY(20px)',
              backdropFilter: 'blur(8px)',
              touchAction: 'manipulation',
            }}
            onMouseEnter={(e) => {
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
              e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.3)';
            }}
            onMouseLeave={(e) => {
              if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = 'rgba(236, 72, 153, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Zap size={18} />
            Explore More Projects
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .projects-section .project-card:hover .hover-line,
        .projects-section .project-card:active .hover-line {
          transform: scaleX(1);
        }
        
        @media (max-width: 1024px) {
          .projects-content {
            padding: 0 1rem;
          }
          
          .projects-section {
            padding: 2.5rem 0;
          }
          
          .projects-content > div:first-child {
            margin-bottom: 2.5rem;
          }
          
          .projects-content > div:nth-child(2) {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .projects-content {
            padding: 0 0.8rem;
          }
          
          .projects-section {
            padding: 2rem 0;
          }
          
          .projects-content > div:first-child {
            margin-bottom: 2rem;
          }
          
          .projects-content > div:nth-child(2) {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .projects-content > div:nth-child(2) > div {
            padding: 1.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .projects-content > div:nth-child(2) {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
          
          .projects-content > div:nth-child(2) > div {
            padding: 1rem;
          }
          
          .projects-section {
            padding: 1.5rem 0;
          }
          
          .projects-content > div:first-child h2 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
          }
          
          .projects-content > div:first-child p {
            font-size: clamp(0.8rem, 1.8vw, 0.9rem);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .project-card {
            transform: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .video-background {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
          
          video {
            object-fit: cover;
          }
          
          .projects-content > div:nth-child(2) > div {
            transform: scale(1) !important;
          }
        }
        
        /* Prevent text selection on touch devices */
        .project-card, .projects-section button {
          user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
        }
        
        /* Optimize tap highlight */
        .project-card, .projects-section button, .projects-section a {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default MyProjects;