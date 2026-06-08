import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: <FaGithub />, href: 'https://github.com/Asif-3', label: 'GitHub' },
        { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/mohamed-asif-m-35963a2a1/', label: 'LinkedIn' },
        { icon: <FaEnvelope />, href: 'mailto:mohamedasif1437@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="footer">
            <div className="footer-top-line"></div>

            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-text">Mohamed Asif M</span>
                        </div>
                        <p className="footer-description">
                            AI & Data Science student passionate about building intelligent solutions. Let's create something amazing together.
                        </p>

                        <div className="footer-socials">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                    whileHover={{ y: -4, scale: 1.1, boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-links">
                            {quickLinks.map((link, index) => (
                                <a key={index} href={link.href} className="footer-link">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact-section">
                        <h4 className="footer-heading">Contact</h4>
                        <div className="footer-contact-info">
                            <a href="mailto:mohamedasif1437@gmail.com" className="footer-contact-item">
                                <FaEnvelope />
                                <span>mohamedasif1437@gmail.com</span>
                            </a>
                            <p className="footer-contact-item">
                                <span>Salem, Tamil Nadu, India</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Mohamed Asif M. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
