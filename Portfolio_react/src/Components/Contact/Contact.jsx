import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './Contact.css';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const formItemsRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Main section animation
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 1 : 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
        },
      }
    );

    // Title reveal
    gsap.fromTo(
      titleRef.current,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: isMobile ? 1.2 : 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: contactRef.current,
          start: isMobile ? 'top 80%' : 'top 75%',
        },
      }
    );

    // Left section animation
    const leftTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: leftSectionRef.current,
        start: isMobile ? 'top 80%' : 'top 70%',
      },
    });

    leftTimeline
      .fromTo(
        leftSectionRef.current.querySelector('h1'),
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: isMobile ? 0.7 : 0.8, ease: 'back.out(1.2)' }
      )
      .fromTo(
        leftSectionRef.current.querySelector('p'),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: isMobile ? 0.5 : 0.6, ease: 'power2.out' },
        '-=0.4'
      );

    // Contact details animation
    const contactDetails = contactDetailsRef.current.children;
    gsap.fromTo(
      contactDetails,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.5 : 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactDetailsRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
        },
      }
    );

    // Icon spin animation
    gsap.fromTo(
      Array.from(contactDetailsRef.current.querySelectorAll('.icon-container')),
      { rotate: -90, scale: 0.5 },
      {
        rotate: 0,
        scale: 1,
        duration: isMobile ? 0.6 : 0.7,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        delay: 0.2,
        scrollTrigger: {
          trigger: contactDetailsRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
        },
      }
    );

    // Form items animation
    const formItems = formItemsRef.current;
    gsap.fromTo(
      formItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.6 : 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightSectionRef.current,
          start: isMobile ? 'top 80%' : 'top 75%',
        },
      }
    );

    // Button animation
    const buttonTl = gsap.timeline({
      scrollTrigger: {
        trigger: rightSectionRef.current,
        start: isMobile ? 'top 70%' : 'top 60%',
      },
    });

    buttonTl.fromTo(
      rightSectionRef.current.querySelector('button'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: isMobile ? 0.7 : 0.8, ease: 'elastic.out(1, 0.3)' }
    );

    if (!isMobile) {
      buttonTl.fromTo(
        rightSectionRef.current.querySelector('button'),
        { boxShadow: '0px 0px 0px rgba(30, 144, 255, 0)' },
        {
          boxShadow: '0px 0px 15px rgba(30, 144, 255, 0.4)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
        }
      );
    }

    // Touch interaction for contact details
    const detailTimelines = Array.from(contactDetailsRef.current.children).map(() => gsap.timeline({ paused: true }));
    const handleDetailTouchStart = (index) => {
      detailTimelines[index].play();
    };

    const handleDetailTouchEnd = (index) => {
      detailTimelines[index].reverse();
    };

    // Contact details hover/touch animations
    Array.from(contactDetailsRef.current.children).forEach((detail, index) => {
      detailTimelines[index]
        .to(detail, { x: 8, duration: 0.3, ease: 'power2.out' })
        .to(
          detail.querySelector('.icon-container'),
          {
            scale: 1.15,
            backgroundColor: 'rgba(70, 130, 180, 0.3)',
            boxShadow: '0px 0px 8px rgba(30, 144, 255, 0.4)',
            duration: 0.3,
          },
          0
        );

      if (!isMobile) {
        detail.addEventListener('mouseenter', () => detailTimelines[index].play());
        detail.addEventListener('mouseleave', () => detailTimelines[index].reverse());
      } else {
        detail.addEventListener('touchstart', () => handleDetailTouchStart(index));
        detail.addEventListener('touchend', () => handleDetailTouchEnd(index));
      }
    });

    // Input focus/blur animations
    const inputTimelines = formItemsRef.current.map(() => gsap.timeline({ paused: true }));
    formItemsRef.current.forEach((item, index) => {
      const input = item.querySelector('input, textarea');
      if (input) {
        inputTimelines[index].to(input, {
          borderColor: '#1E90FF',
          backgroundColor: '#34495E',
          boxShadow: '0 4px 12px rgba(30, 144, 255, 0.2)',
          y: -4,
          duration: 0.3,
        });

        input.addEventListener('focus', () => inputTimelines[index].play());
        input.addEventListener('blur', () => inputTimelines[index].reverse());
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      detailTimelines.forEach((tl) => tl.kill());
      inputTimelines.forEach((tl) => tl.kill());
      Array.from(contactDetailsRef.current.children).forEach((detail) => {
        detail.removeEventListener('mouseenter', () => {});
        detail.removeEventListener('mouseleave', () => {});
        detail.removeEventListener('touchstart', () => {});
        detail.removeEventListener('touchend', () => {});
      });
      formItemsRef.current.forEach((item) => {
        const input = item.querySelector('input, textarea');
        if (input) {
          input.removeEventListener('focus', () => {});
          input.removeEventListener('blur', () => {});
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isMobile = window.innerWidth <= 768;
    const formTimeline = gsap.timeline({
      onComplete: () => {
        setFormData({ name: '', email: '', message: '' });
        gsap.to(formItemsRef.current, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: isMobile ? 0.4 : 0.5,
          ease: 'power2.out',
        });
      },
    });

    formTimeline
      .to(formItemsRef.current, {
        y: -8,
        opacity: 0.5,
        stagger: 0.1,
        duration: isMobile ? 0.2 : 0.3,
        ease: 'power2.in',
      })
      .to(rightSectionRef.current.querySelector('button'), {
        scale: 1.15,
        backgroundColor: '#4682B4',
        boxShadow: '0px 0px 25px rgba(30, 144, 255, 0.6)',
        duration: isMobile ? 0.3 : 0.4,
      })
      .to(rightSectionRef.current.querySelector('button'), {
        scale: 1,
        duration: isMobile ? 0.4 : 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="Contact" className="Contact" ref={contactRef} aria-label="Contact Section">
      <div className="contact-title" ref={titleRef}>
        <h1>Get in touch</h1>
      </div>

      <div className="contact-section">
        <div className="contact-left" ref={leftSectionRef}>
          <h1>Let's talk</h1>
          <p>What you need, Contact me anytime. I'm always ready to discuss your project and bring your ideas to life.</p>

          <div className="contact-details" ref={contactDetailsRef}>
            {[
              { icon: mail_icon, text: 'dasunmethmal23@gmail.com', label: 'Email Contact' },
              { icon: location_icon, text: 'Colombo 03', label: 'Location' },
              { icon: call_icon, text: '0774578912', label: 'Phone Contact' },
            ].map((detail, index) => (
              <div
                key={index}
                className="contact-detail"
                role="button"
                aria-label={detail.label}
              >
                <div className="icon-container">
                  <img src={detail.icon} alt="" />
                </div>
                <p>{detail.text}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-right" ref={rightSectionRef} role="form" aria-label="Contact Form">
          <div className="form-group" ref={(el) => (formItemsRef.current[0] = el)}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              className="input-animate"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group" ref={(el) => (formItemsRef.current[1] = el)}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              className="input-animate"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group" ref={(el) => (formItemsRef.current[2] = el)}>
            <label htmlFor="message">Write your message here</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              placeholder="Enter Your Message"
              className="input-animate"
              required
              aria-required="true"
            ></textarea>
          </div>

          <button type="submit" className="contact-submit" ref={(el) => (formItemsRef.current[3] = el)} aria-label="Submit Contact Form">
            Submit now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;