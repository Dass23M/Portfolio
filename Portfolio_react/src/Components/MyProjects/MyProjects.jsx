import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap, Star, ArrowRight } from 'lucide-react';
import videoMp4 from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.mp4';

const MyProjects = () => {
  const videoRef = useRef(null);
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);
  const showMoreRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const mywork_data = [
    { w_no: 2, w_name: "Task Management App", w_img: "../../assets/project_3.svg", w_description: "Collaborative task management app.", technologies: ["Vue.js", "Firebase"], github_url: "#", live_url: "#", featured: false },
    { w_no: 3, w_name: "Portfolio Website", w_img: "../../assets/project_4.svg", w_description: "Modern portfolio website.", technologies: ["React", "GSAP"], github_url: "#", live_url: "#", featured: true },
    { w_no: 4, w_name: "Weather Dashboard", w_img: "../../assets/project_5.svg", w_description: "Interactive weather dashboard.", technologies: ["JavaScript", "D3.js"], github_url: "#", live_url: "#", featured: false },
    { w_no: 5, w_name: "Social Media App", w_img: "../../assets/project_2.svg", w_description: "Modern social media platform.", technologies: ["React Native", "GraphQL"], github_url: "#", live_url: "#", featured: true },
    { w_no: 6, w_name: "Analytics Dashboard", w_img: "../../assets/project_1.svg", w_description: "Comprehensive analytics dashboard.", technologies: ["React", "Chart.js"], github_url: "#", live_url: "#", featured: false }
  ];

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (videoRef.current && videoLoaded) {
        // Smoother parallax effect
        videoRef.current.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.2}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoLoaded]);

  // Mouse move parallax effect for cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      projectCardsRef.current.forEach((project, index) => {
        if (project) {
          const factor = (index + 1) * 0.005; // Reduced for subtlety
          const x = deltaX * factor * 10;
          const y = deltaY * factor * 10;
          project.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleShowMore = () => console.log('Show more projects clicked');

  // Handle video loading
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using fallback background');
    setVideoLoaded(false);
  };

  return (
    <div className="projects-container">
      {/* Background Video with Fallback */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className="background-video"
        >
           <source src={videoMp4} type="video/mp4" />
        </video>
        
        {/* Animated Gradient Fallback */}
        <div className="gradient-fallback" style={{ opacity: videoLoaded ? 0 : 1 }}>
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>
      </div>

      {/* Projects Section */}
      <section id="Projects" ref={projectsRef} className="projects-section">
        <div className="projects-content">
          <h2 className="projects-title">My Projects</h2>
          <div className="projects-grid">
            {mywork_data.map((project, index) => (
              <div
                key={index}
                ref={(el) => (projectCardsRef.current[index] = el)}
                className="project-card"
              >
                {project.featured && (
                  <div className="featured-badge">
                    <Star size={14} />
                    Featured
                  </div>
                )}
                <h3 className="project-title">{project.w_name}</h3>
                <p className="project-description">{project.w_description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="link-live">
                    <ExternalLink size={16} />
                    Live
                  </a>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="link-github">
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="show-more-container">
            <button
              ref={showMoreRef}
              onClick={handleShowMore}
              className="show-more-button"
            >
              <Zap size={20} />
              Show More Projects
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #000;
          z-index: 1;
        }

        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          filter: brightness(0.3) contrast(1.2) saturate(1.1);
          transition: transform 0.1s ease-out;
        }

        .gradient-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          transition: opacity 0.5s ease;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 6s ease-in-out infinite;
        }

        .gradient-orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .gradient-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .gradient-orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%);
          bottom: 20%;
          left: 30%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        .projects-section {
          min-height: 100vh;
          padding: 5rem 2rem;
          position: relative;
          z-index: 2;
        }

        .projects-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .projects-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: #fff;
          text-align: center;
          margin-bottom: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ec4899, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          cursor: pointer;
          padding: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          transform-style: preserve-3d;
        }

        .project-card:hover {
          transform: translateY(-15px) scale(1.02);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(236, 72, 153, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(236, 72, 153, 0.2);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ec4899, #6366f1);
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        }

        .project-title {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .project-description {
          color: #d1d5db;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .project-technologies {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .tech-badge {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.3);
          border-radius: 12px;
          padding: 0.3rem 0.8rem;
          font-size: 0.8rem;
          color: #ec4899;
          font-weight: 500;
        }

        .project-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .link-live, .link-github {
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .link-live {
          background: linear-gradient(135deg, #ec4899, #6366f1);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        }

        .link-live:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.4);
        }

        .link-github {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .link-github:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .show-more-container {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .show-more-button {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(236, 72, 153, 0.3);
          border-radius: 50px;
          padding: 1rem 2rem;
          color: #fff;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .show-more-button:hover {
          background: rgba(236, 72, 153, 0.1);
          border-color: rgba(236, 72, 153, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .projects-section {
            padding: 3rem 1rem;
          }
          
          .project-card {
            padding: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyProjects;