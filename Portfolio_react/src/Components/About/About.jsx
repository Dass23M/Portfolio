import React, { useEffect } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from "react-icons/fa";
import { SiJavascript, SiHtml5, SiCss3, SiMongodb, SiExpress } from "react-icons/si";
import "./about.css";

const About = () => {
  useEffect(() => {
    const container = document.querySelector(".background-dots");
    const totalDots = 20;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.style.left = `${Math.random() * 100}vw`;
      dot.style.top = `${Math.random() * 100}vh`;
      dot.style.animationDuration = `${Math.random() * 30 + 10}s`;
      dot.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(dot);
    }
  }, []);

  return (
    <section id="About" className="about-section">
      <div className="background-dots"></div>
      <div className="about-icons-container">
        <h1 className="about-title">Full-Stack Developer</h1>
        <p className="about-description">
          Building seamless, dynamic, and scalable applications with modern web technologies.
        </p>
        <div className="tech-icons">
          <div className="tech-item">
            <FaReact title="React" />
            <span>React</span>
          </div>
          <div className="tech-item">
            <FaNodeJs title="Node.js" />
            <span>Node.js</span>
          </div>
          <div className="tech-item">
            <SiJavascript title="JavaScript" />
            <span>JavaScript</span>
          </div>
          <div className="tech-item">
            <SiHtml5 title="HTML5" />
            <span>HTML5</span>
          </div>
          <div className="tech-item">
            <SiCss3 title="CSS3" />
            <span>CSS3</span>
          </div>
          <div className="tech-item">
            <SiMongodb title="MongoDB" />
            <span>MongoDB</span>
          </div>
          <div className="tech-item">
            <SiExpress title="Express.js" />
            <span>Express.js</span>
          </div>
          <div className="tech-item">
            <FaDatabase title="Database" />
            <span>Database</span>
          </div>
          <div className="tech-item">
            <FaGitAlt title="Git" />
            <span>Git</span>
          </div>
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