import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MyProjects.css';
import mywork_data from '../../assets/mywork_data';
import Show_more from '../../assets/arrow_icon.svg';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const MyProjects = () => {
  // References for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const projectsRef = useRef(null);
  const projectRefs = useRef([]);
  const showMoreRef = useRef(null);
  
  // Duplicate projects data for continuous scrolling
  const projectsData = [...mywork_data, ...mywork_data];
  
  // Set up GSAP animations
  useEffect(() => {
    // Initial setup - hide projects
    gsap.set(projectRefs.current, { 
      opacity: 0,
      y: 100
    });

    // Main timeline for section animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    // Section background animation
    tl.fromTo(sectionRef.current, 
      { backgroundPosition: "0% 100%" },
      { 
        backgroundPosition: "100% 0%", 
        duration: 2.5,
        ease: "power2.out"
      }, 0
    );

    // Title and description animations
    tl.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
      0.3
    );
    
    tl.fromTo(descRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)" },
      0.5
    );

    // Project cards staggered animation
    tl.to(projectRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out"
    }, 0.7);

    // Show more button animation
    tl.fromTo(showMoreRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      1.3
    );

    // Set up auto-scrolling animation
    const setupAutoScroll = () => {
      if (!projectsRef.current) return;
      
      // Get the total width of a single set of projects
      const projectSet = projectsRef.current;
      const totalWidth = projectSet.scrollWidth / 2; // Divide by 2 because we duplicated the projects
      
      // Reset position before setting up the animation
      gsap.set(projectSet, { x: 0 });
      
      // Create the infinite scrolling animation
      const autoScrollTl = gsap.timeline({
        repeat: -1,
        onReverseComplete: () => autoScrollTl.progress(1),
      });
      
      autoScrollTl.to(projectSet, {
        x: -totalWidth,
        duration: 30, // Adjust for faster/slower scrolling
        ease: "none",
      });
      
      // Pause animation when not in viewport
      ScrollTrigger.create({
        trigger: projectSet,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => autoScrollTl.play(),
        onLeave: () => autoScrollTl.pause(),
        onEnterBack: () => autoScrollTl.play(),
        onLeaveBack: () => autoScrollTl.pause()
      });
      
      return autoScrollTl;
    };
    
    const autoScrollTl = setupAutoScroll();

    // Hover animations for project cards
    projectRefs.current.forEach(card => {
      if (!card) return; // Safety check
      
      // Create hover timeline for each card
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
        .fromTo([title, description, button], 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 }, 
          0.1
        );
      
      // Add event listeners for hover with pause/resume of auto-scroll
      card.addEventListener('mouseenter', () => {
        hoverTl.play();
        if (autoScrollTl) autoScrollTl.pause();
      });
      
      card.addEventListener('mouseleave', () => {
        hoverTl.reverse();
        if (autoScrollTl) autoScrollTl.play();
      });
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to get placeholder technologies if not defined in the data
  const getDefaultTech = (index) => {
    const techStacks = [
      ["React", "GSAP", "CSS3"],
      ["HTML5", "JavaScript", "Tailwind"],
      ["Vue.js", "SASS", "Firebase"]
    ];
    return techStacks[index % techStacks.length];
  };

  // Handle click on Show More button
  const handleShowMore = () => {
    // You can implement navigation to a projects page or expand the current view
    console.log("Show more projects clicked");
  };

  return (
    <div id="Projects" className="MyProjects" ref={sectionRef}>
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
              ref={el => (projectRefs.current[index] = el)}
            >
              <div className="image-container">
                <img src={work.w_img} alt={`Project ${work.w_no}`} />
              </div>
              <div className="project-overlay">
                <h2>{work.w_name}</h2>
                <p>{work.w_description || "Modern web application with innovative features"}</p>
                <div className="tech-stack">
                  {(work.technologies || getDefaultTech(index % mywork_data.length)).map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <button className="view-project-btn">View Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="show-more" ref={showMoreRef} onClick={handleShowMore}>
        <p>Show more</p>
        <img src={Show_more} alt="Show more" className="arrow-icon" />
      </div>
    </div>
  );
};

export default MyProjects;