import React, { useEffect, useRef } from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const aboutRef = useRef(null);
  const linksRef = useRef(null);
  const socialsRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Footer section animation
    gsap.fromTo(
      [aboutRef.current, linksRef.current, socialsRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.8 : 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: isMobile ? "top 90%" : "top 80%",
        },
      }
    );

    // Social icons stagger
    gsap.fromTo(
      socialsRef.current.querySelectorAll(".social-icons a"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.6 : 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2,
        scrollTrigger: {
          trigger: socialsRef.current,
          start: isMobile ? "top 90%" : "top 80%",
        },
      }
    );

    // Bottom text animation
    gsap.fromTo(
      bottomRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: isMobile ? "top 95%" : "top 85%",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef} role="contentinfo" aria-label="Footer">
      <div className="footer-container">
        <div className="footer-about" ref={aboutRef}>
          <h4>About Me</h4>
          <p>
            I'm a dedicated full-stack web developer skilled in building
            responsive and user-friendly applications. Let's collaborate to bring your ideas to life!
          </p>
        </div>
        <div className="footer-links" ref={linksRef}>
          <h4>Quick Links</h4>
          <ul aria-label="Footer Navigation">
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-socials" ref={socialsRef}>
          <h4>Follow Me</h4>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
              <FaTwitter />
            </a>
            <a href="mailto:youremail@example.com" target="_blank" rel="noopener noreferrer" aria-label="Email Contact">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom" ref={bottomRef}>
        <p>© {new Date().getFullYear()} Dasun Methmal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;