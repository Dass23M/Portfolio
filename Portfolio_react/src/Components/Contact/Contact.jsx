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
        message: ''
    });
    
    // Refs for GSAP animations
    const contactRef = useRef(null);
    const titleRef = useRef(null);
    const leftSectionRef = useRef(null);
    const rightSectionRef = useRef(null);
    const contactDetailsRef = useRef(null);
    const formItemsRef = useRef([]);
    
    useEffect(() => {
        // Main section animation
        gsap.fromTo(contactRef.current, 
            { opacity: 0, y: 100 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: "top 80%",
                }
            }
        );
        
        // Title reveal with masking effect
        gsap.fromTo(titleRef.current,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
            { 
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1.4, 
                ease: "power4.inOut",
                scrollTrigger: {
                    trigger: contactRef.current,
                    start: "top 75%",
                }
            }
        );
        
        // Left section animation with staggered children
        const leftTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: leftSectionRef.current,
                start: "top 70%",
            }
        });
        
        leftTimeline
            .fromTo(leftSectionRef.current.querySelector('h1'),
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
            )
            .fromTo(leftSectionRef.current.querySelector('p'),
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );
        
        // Contact details appearing one by one with icon spin
        const contactDetails = contactDetailsRef.current.children;
        gsap.fromTo(contactDetails, 
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contactDetailsRef.current,
                    start: "top 80%",
                }
            }
        );
        
        // Spin animation for icons
        gsap.fromTo(
            Array.from(contactDetailsRef.current.querySelectorAll('.icon-container')),
            { rotate: -90, scale: 0.5 },
            { 
                rotate: 0, 
                scale: 1, 
                duration: 0.7, 
                stagger: 0.2,
                ease: "back.out(1.7)",
                delay: 0.3,
                scrollTrigger: {
                    trigger: contactDetailsRef.current,
                    start: "top 80%",
                }
            }
        );
        
        // Right section form staggered reveal
        const formItems = formItemsRef.current;
        gsap.fromTo(formItems, 
            { y: 40, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.7, 
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: rightSectionRef.current,
                    start: "top 75%",
                }
            }
        );
        
        // Button special animation
        const buttonTl = gsap.timeline({
            scrollTrigger: {
                trigger: rightSectionRef.current,
                start: "top 60%",
            }
        });
        
        buttonTl
            .fromTo(rightSectionRef.current.querySelector('button'),
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" }
            )
            .fromTo(rightSectionRef.current.querySelector('button'),
                { boxShadow: "0px 0px 0px rgba(30, 144, 255, 0)" },
                { 
                    boxShadow: "0px 0px 20px rgba(30, 144, 255, 0.5)", 
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true
                }
            );
            
        return () => {
            // Clean up ScrollTrigger instances
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Animate form submission
        const formTimeline = gsap.timeline();
        
        formTimeline
            .to(formItemsRef.current, {
                y: -10,
                opacity: 0.5,
                stagger: 0.1,
                duration: 0.3,
                ease: "power2.in"
            })
            .to(rightSectionRef.current.querySelector('button'), {
                scale: 1.2,
                backgroundColor: "#4682B4",
                boxShadow: "0px 0px 30px rgba(30, 144, 255, 0.7)",
                duration: 0.4
            })
            .to(rightSectionRef.current.querySelector('button'), {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
                onComplete: () => {
                    // Reset the form and show animation
                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    });
                    
                    gsap.to(formItemsRef.current, {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
            
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Input focus/blur animations
    const handleInputFocus = (e) => {
        gsap.to(e.target, {
            borderColor: "#1E90FF",
            backgroundColor: "#3A5F8C",
            boxShadow: "0 5px 15px rgba(30, 144, 255, 0.2)",
            y: -5,
            duration: 0.3
        });
    };

    const handleInputBlur = (e) => {
        gsap.to(e.target, {
            borderColor: "transparent",
            backgroundColor: "#2F4F4F",
            boxShadow: "none",
            y: 0,
            duration: 0.3
        });
    };

    // Hover animations for contact details
    const handleDetailMouseEnter = (index) => {
        gsap.to(contactDetailsRef.current.children[index], {
            x: 10,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(contactDetailsRef.current.children[index].querySelector('.icon-container'), {
            scale: 1.2,
            backgroundColor: "#4682B4",
            boxShadow: "0px 0px 10px rgba(30, 144, 255, 0.5)",
            duration: 0.3
        });
    };

    const handleDetailMouseLeave = (index) => {
        gsap.to(contactDetailsRef.current.children[index], {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(contactDetailsRef.current.children[index].querySelector('.icon-container'), {
            scale: 1,
            backgroundColor: "",
            boxShadow: "none",
            duration: 0.3
        });
    };

    return (
        <div id='Contact' className="Contact" ref={contactRef}>
            <div className="contact-title" ref={titleRef}>
                <h1>Get in touch</h1>
            </div>

            <div className="contact-section">
                <div className="contact-left" ref={leftSectionRef}>
                    <h1>Let's talk</h1>
                    <p>What you need, Contact for me anytime, I'm always ready to discuss your project and bring your ideas to life.</p>
                    
                    <div className="contact-details" ref={contactDetailsRef}>
                        <div 
                            className="contact-detail" 
                            onMouseEnter={() => handleDetailMouseEnter(0)}
                            onMouseLeave={() => handleDetailMouseLeave(0)}
                        >
                            <div className="icon-container">
                                <img src={mail_icon} alt="Email" />
                            </div>
                            <p>dasunmethmal23@gmail.com</p>
                        </div>
                        <div 
                            className="contact-detail" 
                            onMouseEnter={() => handleDetailMouseEnter(1)}
                            onMouseLeave={() => handleDetailMouseLeave(1)}
                        >
                            <div className="icon-container">
                                <img src={location_icon} alt="Location" />
                            </div>
                            <p>Colombo 03</p>
                        </div>
                        <div 
                            className="contact-detail" 
                            onMouseEnter={() => handleDetailMouseEnter(2)}
                            onMouseLeave={() => handleDetailMouseLeave(2)}
                        >
                            <div className="icon-container">
                                <img src={call_icon} alt="Phone" />
                            </div>
                            <p>0774578912</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-right" ref={rightSectionRef}>
                    <div className="form-group" ref={(el) => formItemsRef.current[0] = el}>
                        <label htmlFor="name">Your Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder='Enter Your Name'
                            className="input-animate"
                        />
                    </div>

                    <div className="form-group" ref={(el) => formItemsRef.current[1] = el}>
                        <label htmlFor="email">Your Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder='Enter Your Email'
                            className="input-animate"
                        />
                    </div>

                    <div className="form-group" ref={(el) => formItemsRef.current[2] = el}>
                        <label htmlFor="message">Write your message here</label>
                        <textarea 
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            rows="8" 
                            placeholder='Enter Your Message'
                            className="input-animate"
                        ></textarea>
                    </div>

                    <button 
                        type='submit' 
                        className="contact-submit"
                        ref={(el) => formItemsRef.current[3] = el}
                    >
                        Submit now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;