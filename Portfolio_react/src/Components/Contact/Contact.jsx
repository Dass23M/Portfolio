import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Mail, MapPin, Phone, Send, User, MessageSquare } from 'lucide-react';
import videoWebM from '../../assets/video/Rainbow_Nebula_4K_Motion_Background.webm';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for animations
  const contactRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const formItemsRef = useRef([]);
  const particlesRef = useRef([]);
  const overlayRef = useRef(null);

  // Contact details data
  const contactDetails = [
    {
      icon: Mail,
      text: 'dasunmethmal23@gmail.com',
      label: 'Email Contact',
      color: '#6366f1',
      href: 'mailto:dasunmethmal23@gmail.com'
    },
    {
      icon: MapPin,
      text: 'Colombo 03, Sri Lanka',
      label: 'Location',
      color: '#a855f7',
      href: 'https://maps.google.com/?q=Colombo+03'
    },
    {
      icon: Phone,
      text: '+94 77 457 8912',
      label: 'Phone Contact',
      color: '#ec4899',
      href: 'tel:+94774578912'
    }
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Initialize ScrollTrigger
    ScrollTrigger.create({
      trigger: contactRef.current,
      start: 'top 80%',
      onEnter: () => {
        initializeAnimations();
      }
    });

    // Parallax effect for video
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const sectionTop = contactRef.current?.offsetTop || 0;
      const sectionHeight = contactRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;
      
      if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
        const parallaxValue = (scrolled - sectionTop) * 0.2;
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${parallaxValue}px)`;
        }
      }
    };

    // Mouse movement parallax for particles
    const handleMouseMove = (e) => {
      if (!isMobile) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        particlesRef.current.forEach((particle, index) => {
          if (particle) {
            const factor = (index + 1) * 0.02;
            const x = deltaX * factor * 15;
            const y = deltaY * factor * 15;
            
            gsap.to(particle, {
              x: x,
              y: y,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initializeAnimations = () => {
    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline();

    // Main container animation
    tl.fromTo(contactRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    // Title animation with text reveal
    tl.fromTo(titleRef.current,
      { 
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        y: 50
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        y: 0,
        duration: 1.2,
        ease: 'power4.inOut'
      },
      '-=0.8'
    );

    // Left section animations
    tl.fromTo(leftSectionRef.current.querySelector('h1'),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    )
    .fromTo(leftSectionRef.current.querySelector('p'),
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Contact details animation
    const contactItems = Array.from(contactDetailsRef.current.children);
    contactItems.forEach((item, index) => {
      tl.fromTo(item,
        { 
          y: 40,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)'
        },
        `-=${0.4 - index * 0.1}`
      );
    });

    // Form items animation
    formItemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(item,
          { 
            y: 50,
            opacity: 0,
            rotateX: -15
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            ease: 'back.out(1.2)'
          },
          `-=${0.5 - index * 0.1}`
        );
      }
    });

    // Setup hover animations for contact details
    setupContactDetailAnimations();
    setupFormInteractions();
  };

  const setupContactDetailAnimations = () => {
    const contactItems = Array.from(contactDetailsRef.current.children);
    
    contactItems.forEach((item, index) => {
      const hoverTl = gsap.timeline({ paused: true });
      const icon = item.querySelector('.contact-icon');
      const text = item.querySelector('.contact-text');

      hoverTl
        .to(item, {
          x: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          duration: 0.3,
          ease: 'power2.out'
        })
        .to(icon, {
          scale: 1.2,
          rotate: 360,
          boxShadow: `0 0 20px ${contactDetails[index].color}60`,
          duration: 0.3
        }, 0)
        .to(text, {
          color: '#ffffff',
          duration: 0.3
        }, 0);

      item.addEventListener('mouseenter', () => hoverTl.play());
      item.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  };

  const setupFormInteractions = () => {
    formItemsRef.current.forEach(item => {
      if (item) {
        const input = item.querySelector('input, textarea');
        const label = item.querySelector('label');
        
        if (input && label) {
          const focusTl = gsap.timeline({ paused: true });
          
          focusTl
            .to(input, {
              borderColor: '#6366f1',
              boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              y: -2,
              duration: 0.3,
              ease: 'power2.out'
            })
            .to(label, {
              color: '#6366f1',
              scale: 0.9,
              y: -2,
              duration: 0.3
            }, 0);

          input.addEventListener('focus', () => focusTl.play());
          input.addEventListener('blur', () => focusTl.reverse());
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitButton = rightSectionRef.current.querySelector('.submit-button');
    const buttonTl = gsap.timeline();

    // Button animation during submit
    buttonTl
      .to(submitButton, {
        scale: 0.95,
        backgroundColor: '#4f46e5',
        duration: 0.1
      })
      .to(submitButton, {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)'
      })
      .to(submitButton, {
        scale: 1,
        duration: 0.2
      });

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Success animation
      gsap.to(submitButton, {
        backgroundColor: '#10b981',
        duration: 0.5,
        ease: 'power2.out'
      });

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitSuccess(false);
        gsap.to(submitButton, {
          backgroundColor: '#6366f1',
          duration: 0.5
        });
      }, 2000);
    }, 1500);

    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="Contact" className="contact-container" ref={contactRef}>
      {/* Video Background */}
      <div className="video-background">
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
            filter: 'brightness(0.7) contrast(1.1) hue-rotate(180deg) saturate(1.2)',
          }}
        >
          <source src={videoWebM} type="video/webm" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="gradient-overlay" ref={overlayRef} />

      {/* Animated Grid */}
      <div className="animated-grid" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-particle"
          ref={el => particlesRef.current[i] = el}
          style={{
            '--delay': `${i * 0.5}s`,
            '--duration': `${3 + i * 0.5}s`,
            '--size': `${8 + i * 4}px`,
            '--color': ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'][i],
            '--opacity': 0.1 + (i * 0.05),
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="contact-content">
        {/* Title Section */}
        <div className="contact-title" ref={titleRef}>
          <h2>Get in Touch</h2>
          <div className="title-underline" />
        </div>

        <div className="contact-section">
          {/* Left Section */}
          <div className="contact-left" ref={leftSectionRef}>
            <h1>Let's Create Something Amazing Together</h1>
            <p>
              Ready to bring your vision to life? I'm here to help you build exceptional 
              digital experiences that make a real impact. Let's discuss your project and 
              explore the possibilities.
            </p>

            <div className="contact-details" ref={contactDetailsRef}>
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={index}
                    href={detail.href}
                    className="contact-detail"
                    target={detail.href.startsWith('http') ? '_blank' : '_self'}
                    rel={detail.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <div className="contact-icon" style={{ '--color': detail.color }}>
                      <Icon size={20} />
                    </div>
                    <span className="contact-text">{detail.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="contact-right" ref={rightSectionRef}>
            <div className="contact-form">
              <div className="form-group" ref={el => formItemsRef.current[0] = el}>
                <label htmlFor="name">
                  <User size={16} />
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group" ref={el => formItemsRef.current[1] = el}>
                <label htmlFor="email">
                  <Mail size={16} />
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group" ref={el => formItemsRef.current[2] = el}>
                <label htmlFor="message">
                  <MessageSquare size={16} />
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                className="submit-button"
                disabled={isSubmitting}
                ref={el => formItemsRef.current[3] = el}
              >
                {isSubmitting ? (
                  <div className="loading-spinner" />
                ) : submitSuccess ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 0;
        }

        .video-background {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          z-index: 1;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%);
          z-index: 2;
        }

        .animated-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 2;
          animation: gridMove 20s linear infinite;
        }

        .floating-particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: radial-gradient(circle, var(--color), transparent);
          opacity: var(--opacity);
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          z-index: 2;
        }

        .contact-content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          width: 90%;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .contact-title {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-title h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
        }

        .title-underline {
          width: 100px;
          height: 4px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          margin: 0 auto;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .contact-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
          max-width: 100%;
        }

        .contact-left h1 {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .contact-left p {
          font-size: clamp(1rem, 2vw, 1.1rem);
          color: #d1d5db;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 90%;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 80%;
        }

        .contact-detail {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .contact-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.3s ease;
        }

        .contact-text {
          color: #d1d5db;
          font-size: 1rem;
          font-weight: 500;
        }

        .contact-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.75rem;
          width: 100%;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #d1d5db;
          font-weight: 500;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
          resize: vertical;
          box-sizing: border-box;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #9ca3af;
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .contact-container {
            padding: 3rem 0;
          }

          .contact-content {
            padding: 0 1rem;
            width: 95%;
          }

          .contact-title {
            margin-bottom: 2.5rem;
          }

          .contact-section {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .contact-left {
            text-align: center;
          }

          .contact-left h1 {
            font-size: clamp(1.6rem, 3vw, 2.2rem);
          }

          .contact-left p {
            max-width: 100%;
            margin-bottom: 2rem;
          }

          .contact-details {
            max-width: 100%;
            align-items: center;
          }

          .contact-right {
            padding: 0 1rem;
          }

          .contact-form {
            padding: 1.75rem;
            max-width: 100%;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .floating-particle {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .contact-form {
            padding: 1.25rem;
          }

          .contact-detail {
            padding: 0.75rem;
          }

          .contact-icon {
            width: 40px;
            height: 40px;
          }

          .submit-button {
            padding: 0.9rem;
            font-size: 1rem;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;