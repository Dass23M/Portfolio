import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MyProjects.css';
import mywork_data from '../../assets/mywork_data';
import Show_more from '../../assets/arrow_icon.svg';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const MyProjects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectsRef = useRef(null);
  const projectRefs = useRef([]);
  const showMoreRef = useRef(null);

  // Duplicate projects data for continuous scrolling
  const projectsData = [...mywork_data, ...mywork_data];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Initial setup - hide projects
    gsap.set(projectRefs.current, { opacity: 0, y: 80 });

    // Main timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? 'top 80%' : 'top 70%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    });

    // Section background animation
    tl.fromTo(
      sectionRef.current,
      { backgroundPosition: '0% 100%' },
      { backgroundPosition: '100% 0%', duration: isMobile ? 2 : 2.5, ease: 'power2.out' },
      0
    );

    // Title and description animations
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1, ease: 'back.out(1.7)' },
      0.3
    );

    tl.fromTo(
      descRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: isMobile ? 0.8 : 1, ease: 'back.out(1.5)' },
      0.5
    );

    // Project cards staggered animation
    tl.to(projectRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: isMobile ? 0.7 : 0.8,
      ease: 'power3.out',
    }, 0.7);

    // Show more button animation
    tl.fromTo(
      showMoreRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: isMobile ? 0.6 : 0.8, ease: 'elastic.out(1, 0.5)' },
      1.3
    );

    // Set up auto-scrolling animation
    const setupAutoScroll = () => {
      if (!projectsRef.current) return;

      const projectSet = projectsRef.current;
      const totalWidth = projectSet.scrollWidth / 2; // Divide by 2 because we duplicated the projects

      gsap.set(projectSet, { x: 0 });

      const autoScrollTl = gsap.timeline({
        repeat: -1,
        onReverseComplete: () => autoScrollTl.progress(1),
      });

      autoScrollTl.to(projectSet, {
        x: -totalWidth,
        duration: isMobile ? 20 : 30,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: projectSet,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => autoScrollTl.play(),
        onLeave: () => autoScrollTl.pause(),
        onEnterBack: () => autoScrollTl.play(),
        onLeaveBack: () => autoScrollTl.pause(),
      });

      return autoScrollTl;
    };

    const autoScrollTl = setupAutoScroll();

    // Touch interaction for mobile
    const handleTouchStart = () => {
      if (autoScrollTl) autoScrollTl.pause();
    };

    const handleTouchEnd = () => {
      if (autoScrollTl) autoScrollTl.play();
    };

    // Hover/touch animations for project cards
    const hoverTimelines = projectRefs.current.map((card) => {
      if (!card) return null;

      const hoverTl = gsap.timeline({ paused: true });
      const overlay = card.querySelector('.project-overlay');
      const image = card.querySelector('.image-container img');
      const title = overlay.querySelector('h2');
      const description = overlay.querySelector('p');
      const button = overlay.querySelector('button');

      hoverTl
        .to(overlay, { opacity: 1, duration: 0.3 })
        .to(image, { scale: 1.1, duration: 0.5 }, 0)
        .to(card, { boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', scale: 1.05, duration: 0.3 }, 0)
        .fromTo(
          [title, description, button],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
          0.1
        );

      if (!isMobile) {
        card.addEventListener('mouseenter', () => {
          hoverTl.play();
          if (autoScrollTl) autoScrollTl.pause();
        });
        card.addEventListener('mouseleave', () => {
          hoverTl.reverse();
          if (autoScrollTl) autoScrollTl.play();
        });
      } else {
        card.addEventListener('touchstart', handleTouchStart);
        card.addEventListener('touchend', () => {
          hoverTl.play();
          handleTouchEnd();
        });
      }

      return hoverTl;
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      hoverTimelines.forEach((tl) => tl && tl.kill());
      if (autoScrollTl) autoScrollTl.kill();
      projectRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
        card.removeEventListener('touchstart', handleTouchStart);
        card.removeEventListener('touchend', handleTouchEnd);
      });
    };
  }, []);

  const getDefaultTech = (index) => {
    const techStacks = [
      ['React', 'GSAP', 'CSS3'],
      ['HTML5', 'JavaScript', 'Tailwind'],
      ['Vue.js', 'SASS', 'Firebase'],
    ];
    return techStacks[index % techStacks.length];
  };

  const handleShowMore = () => {
    console.log('Show more projects clicked');
  };

  return (
    <div id="Projects" className="MyProjects" ref={sectionRef} aria-label="Projects Section">
      <div className="ProjTitles">
        <h1 ref={titleRef}>
          <span className="gradient-text">My Latest Work</span>
        </h1>
        <p ref={descRef}>Explore the projects I've worked on, showcasing my expertise in modern web development technologies.</p>
      </div>

      <div className="projects-wrapper">
        <div className="mywork-container" ref={projectsRef}>
          {projectsData.map((work, index) => (
            <div
              className="project-card"
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              role="listitem"
              aria-label={`Project ${work.w_name}`}
            >
              <div className="image-container">
                <img src={work.w_img} alt={`Project ${work.w_no}`} />
              </div>
              <div className="project-overlay">
                <h2>{work.w_name}</h2>
                <p>{work.w_description || 'Modern web application with innovative features'}</p>
                <div className="tech-stack">
                  {(work.technologies || getDefaultTech(index % mywork_data.length)).map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <button className="view-project-btn" aria-label={`View ${work.w_name} Project`}>View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="show-more" ref={showMoreRef} onClick={handleShowMore} role="button" aria-label="Show More Projects">
        <p>Show more</p>
        <img src={Show_more} alt="Arrow icon" className="arrow-icon" />
      </div>
    </div>
  );
};

export default MyProjects;