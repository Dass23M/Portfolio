import React from 'react';
import './Hero.css';
import profile from '../../assets/profile.jpg';

const Hero = () => {
  return (
    <div id="Hero" className="hero">
      <div className="hero-content">
        <img src={profile} alt="Profile" className="hero-image" />
        <h1 className="hero-title">
          <span>Hello, I'm Dasun Methmal</span> <br /> A Full-Stack Developer from Sri Lanka
        </h1>
        <p className="hero-description">
          Building seamless, scalable, and user-centric digital experiences through innovation and technology.
        </p>
        <div className="hero-action">
          <div className="hero-connect">Connect with me</div>
          <div className="hero-resume">Download Resume</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
