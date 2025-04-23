import React, { useState, useEffect } from 'react';
import './MyProjects.css';
import mywork_data from '../../assets/mywork_data';
import Show_more from '../../assets/arrow_icon.svg';

const MyProjects = () => {
  const [scrollDirection, setScrollDirection] = useState(null);

  const handleScroll = (event) => {
    const isScrollDown = event.deltaY > 0;
    setScrollDirection(isScrollDown ? 'down' : 'up');
  };

  // Adding scroll event listener
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div id="Projects" className={`MyProjects ${scrollDirection}`}>
      <div className="ProjTitles">
        <h1>
          <span>My Latest Work</span>
        </h1>
        <p>Explore the projects I've worked on, showcasing my expertise in modern web development technologies.</p>
      </div>
      <div className="mywork-container">
        {mywork_data.map((work, index) => (
          <div className="project-card" key={index}>
            <div className="image-container">
              <img src={work.w_img} alt={`Project ${index}`} />
            </div>
            <div className="project-overlay">
              <h2>{work.w_name}</h2>
              <p>Short description about the project</p>
              <button>View Project</button>
            </div>
          </div>
        ))}
      </div>

      <div className="show-more">
        <p>Show more</p>
        <img src={Show_more} alt="Show more" />
      </div>
    </div>
  );
};

export default MyProjects;
