import React, { useState, useEffect } from 'react';
import './Contact.css';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';
import call_icon from '../../assets/call_icon.svg';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('Contact');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id='Contact' className={`Contact ${isVisible ? 'visible' : ''}`}>
            <div className="contact-title animate-fade-down">
                <h1>Get in touch</h1>
            </div>

            <div className="contact-section">
                <div className={`contact-left ${isVisible ? 'slide-in-left' : ''}`}>
                    <h1>Let's talk</h1>
                    <p>What you need, Contact for me anytime, I'm always ready to discuss your project and bring your ideas to life.</p>
                    
                    <div className="contact-details">
                        <div className="contact-detail hover-effect">
                            <div className="icon-container">
                                <img src={mail_icon} alt="Email" />
                            </div>
                            <p>dasunmethmal23@gmail.com</p>
                        </div>
                        <div className="contact-detail hover-effect">
                            <div className="icon-container">
                                <img src={location_icon} alt="Location" />
                            </div>
                            <p>Colombo 03</p>
                        </div>
                        <div className="contact-detail hover-effect">
                            <div className="icon-container">
                                <img src={call_icon} alt="Phone" />
                            </div>
                            <p>0774578912</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className={`contact-right ${isVisible ? 'slide-in-right' : ''}`}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder='Enter Your Name'
                            className="input-animate"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter Your Email'
                            className="input-animate"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Write your message here</label>
                        <textarea 
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="8" 
                            placeholder='Enter Your Message'
                            className="input-animate"
                        ></textarea>
                    </div>

                    <button type='submit' className="contact-submit pulse-effect">
                        Submit now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;