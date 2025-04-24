import React, { useEffect, useRef } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiHtml5, SiCss3, SiMongodb, SiExpress } from "react-icons/si";
import { gsap } from "gsap";
import "./about.css";

const About = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const totalDots = window.innerWidth <= 768 ? 10 : 20; // Fewer dots on mobile

    // Create dots
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      container.appendChild(dot);

      // GSAP animation for dots
      gsap.to(dot, {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        opacity: () => Math.random() * 0.5 + 0.2,
        duration: () => Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      });
    }

    // Animate tech icons
    gsap.fromTo(
      iconsRef.current.children,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5,
      }
    );

    // Cleanup
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <section id="About" className="about-section" aria-label="About Section">
      <div className="background-dots" ref={containerRef}></div>
      <div className="about-icons-container">
        <h1 className="about-title">Full-Stack Developer</h1>
        <p className="about-description">
          Building seamless, dynamic, and scalable applications with modern web technologies.
        </p>
        <div className="tech-icons" ref={iconsRef}>
          {[
            { Icon: FaReact, name: "React" },
            { Icon: FaNodeJs, name: "Node.js" },
            { Icon: SiJavascript, name: "JavaScript" },
            { Icon: SiHtml5, name: "HTML5" },
            { Icon: SiCss3, name: "CSS3" },
            { Icon: SiMongodb, name: "MongoDB" },
            { Icon: SiExpress, name: "Express.js" },
            { Icon: FaDatabase, name: "Database" },
            { Icon: FaGitAlt, name: "Git" },
          ].map(({ Icon, name }) => (
            <div className="tech-item" key={name}>
              <Icon title={name} role="img" aria-label={name} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="mouse-scroll"></div>
      </div>
    </section>
  );
};

export default About;