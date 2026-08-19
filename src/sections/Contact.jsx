import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const contactInfo = [
        { icon: <FaEnvelope />, title: 'Email', content: 'mohamedasif.1524@gmail.com', link: 'mailto:mohamedasif.1524@gmail.com', color: '#8b5cf6' },
        { icon: <FaPhone />, title: 'Phone', content: '+91 9025670763', link: 'tel:+919025670763', color: '#06b6d4' },
        { icon: <FaMapMarkerAlt />, title: 'Location', content: 'Salem, Tamil Nadu, India', link: null, color: '#f472b6' }
    ];

    const socialLinks = [
        { icon: <FaGithub />, name: 'GitHub', link: 'https://github.com/Asif-3', color: '#c9d1d9' },
        { icon: <FaLinkedin />, name: 'LinkedIn', link: 'https://www.linkedin.com/in/mohamed-asif-m-35963a2a1/', color: '#0077b5' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
        visible: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailtoLink = `mailto:mohamedasif.1524@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
    };

    return (
        <section className="section contact" id="contact" ref={ref}>
            <div className="contact-bg-decoration">
                <div className="contact-gradient-orb orb-1"></div>
                <div className="contact-gradient-orb orb-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">Let's Work Together</h2>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </motion.div>

                <motion.div
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Contact Info Side */}
                    <motion.div className="contact-info-side" variants={itemVariants}>
                        <div className="contact-info-card">
                            <h3 className="info-title">Contact Information</h3>
                            <p className="info-description">
                                Reach out through any of the channels below.
                            </p>

                            <div className="contact-info-list">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        className="contact-info-item"
                                        whileHover={{ x: 8 }}
                                        style={{ '--item-color': info.color }}
                                    >
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-content">
                                            <span className="info-label">{info.title}</span>
                                            {info.link ? (
                                                <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{info.content}</a>
                                            ) : (
                                                <p>{info.content}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="social-connect">
                                <span className="social-label">Connect on social</span>
                                <div className="social-links">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link-btn"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ '--social-color': social.color }}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div className="contact-form-side" variants={itemVariants}>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className={`form-group ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                    <div className="input-border"></div>
                                </div>
                                <div className={`form-group ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                    <div className="input-border"></div>
                                </div>
                            </div>

                            <div className={`form-group ${focusedField === 'subject' || formData.subject ? 'focused' : ''}`}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <div className="input-border"></div>
                            </div>

                            <div className={`form-group ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                ></textarea>
                                <div className="input-border"></div>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn btn-primary submit-btn"
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(124, 58, 237, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaPaperPlane />
                                <span>Send Message</span>
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
