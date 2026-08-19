import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const ticking = useRef(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ];

    // Throttled scroll handler for performance
    useEffect(() => {
        const sectionIds = navLinks.map(link => link.href.replace('#', ''));

        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 50);

                    for (let i = sectionIds.length - 1; i >= 0; i--) {
                        const section = document.getElementById(sectionIds[i]);
                        if (section) {
                            const rect = section.getBoundingClientRect();
                            if (rect.top <= 150) {
                                setActiveSection(sectionIds[i]);
                                break;
                            }
                        }
                    }
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const handleNavClick = useCallback((href) => {
        setMobileOpen(false);
        // Small delay to allow menu close animation to start
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }, []);

    // Mobile menu rendered via portal to avoid stacking context issues
    const mobileMenu = createPortal(
        <AnimatePresence>
            {mobileOpen && (
                <motion.div
                    className="mobile-menu-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="mobile-close-btn"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaTimes />
                        </motion.button>

                        <div className="mobile-menu-inner">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={`mobile-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 40 }}
                                    transition={{ delay: index * 0.05 + 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="mobile-link-num">0{index + 1}</span>
                                    <span>{link.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
                <div className="navbar-container">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="nav-logo"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="logo-mark">
                            <img src="/logo.jpg" alt="Logo" className="logo-img" />
                        </div>
                        <span className="logo-text">Mohamed Asif M</span>
                    </motion.a>

                    {/* Desktop Links */}
                    <div className="nav-links-desktop">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                            >
                                {link.name}
                                {activeSection === link.href.replace('#', '') && (
                                    <motion.div
                                        className="nav-link-indicator"
                                        layoutId="activeIndicator"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="nav-right">
                        <motion.a
                            href="#contact"
                            className="nav-cta"
                            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaPaperPlane />
                            <span>Hire Me</span>
                        </motion.a>

                        <button
                            className="mobile-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {mobileMenu}
        </>
    );
};

export default Navbar;
