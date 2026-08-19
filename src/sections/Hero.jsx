import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaDownload, FaEnvelope, FaArrowRight, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import './Hero.css';

// Count-up animation component
const Hero = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    // Remove statsRef and statsInView as stats are moved to separate component
    const [typedText, setTypedText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const isMobile = useRef(typeof window !== 'undefined' && (window.innerWidth <= 968 || 'ontouchstart' in window));

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.8], [0, isMobile.current ? 40 : 100]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, isMobile.current ? 60 : 200]);

    const phrases = [
        'AI & Data Science Student',
        'Machine Learning Enthusiast',
        'Full Stack Developer',
        'Cybersecurity Enthusiast'
    ];

    // Mouse tracking — disabled on mobile for performance
    useEffect(() => {
        if (isMobile.current) return;
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30,
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        const typingSpeed = isDeleting ? 25 : 70;
        const pauseTime = 2500;

        const timer = setTimeout(() => {
            if (!isDeleting && typedText === currentPhrase) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && typedText === '') {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            } else {
                setTypedText(
                    isDeleting
                        ? currentPhrase.substring(0, typedText.length - 1)
                        : currentPhrase.substring(0, typedText.length + 1)
                );
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, phraseIndex]);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/Mohamed_Asif_Resume.pdf';
        link.download = 'Mohamed_Asif_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 80, rotateX: -90, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: i * 0.04 + 0.2,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    const name = "Mohamed Asif M";
    const greeting = "Hello, I'm";

    return (
        <section className="hero" id="home" ref={(el) => { ref(el); heroRef.current = el; }}>
            {/* Cinematic Background */}
            <motion.div className="hero-bg-elements" style={{ y: bgY }}>
                <motion.div
                    className="hero-gradient-orb orb-1"
                    animate={{
                        x: mousePosition.x * 2,
                        y: mousePosition.y * 2,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 30 }}
                />
                <motion.div
                    className="hero-gradient-orb orb-2"
                    animate={{
                        x: -mousePosition.x * 1.5,
                        y: -mousePosition.y * 1.5,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 30 }}
                />
                <motion.div
                    className="hero-gradient-orb orb-3"
                    animate={{
                        x: mousePosition.x,
                        y: -mousePosition.y,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 30 }}
                />

                {/* Grid Pattern */}
                <div className="hero-grid-pattern"></div>

                {/* Floating Geometric Shapes */}
                <div className="floating-shapes">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`floating-shape shape-${i + 1}`}
                            animate={{
                                y: [0, -40, 0],
                                rotate: [0, 180, 360],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                {/* Horizontal lines */}
                <div className="hero-lines">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="hero-line"
                            style={{ top: `${20 + i * 15}%` }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.05 }}
                            transition={{ delay: 1 + i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            >
                {/* Greeting Badge */}
                <motion.div className="hero-badge" variants={itemVariants}>
                    <span className="badge-dot"></span>
                    <span>Code it. Hack it. Automate it.</span>
                </motion.div>

                {/* Greeting Text */}
                <motion.p className="hero-greeting" variants={itemVariants}>
                    {greeting}
                </motion.p>

                {/* Animated Name */}
                <motion.h1 className="hero-name">
                    {name.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            custom={index}
                            variants={letterVariants}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className="letter"
                            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Typing Animation */}
                <motion.div variants={itemVariants} className="hero-typing">
                    <span className="typing-prefix">I'm a</span>
                    <span className="typing-text">{typedText}</span>
                    <motion.span
                        className="typing-cursor"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >|</motion.span>
                </motion.div>

                {/* Description */}
                <motion.p className="hero-description" variants={itemVariants}>
                    Passionate about transforming data into intelligent solutions.
                    Building AI-powered applications and crafting secure digital experiences
                    that make a difference.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="hero-cta">
                    <motion.button
                        className="btn btn-primary hero-btn"
                        onClick={handleDownloadResume}
                        whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(124, 58, 237, 0.5)' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FaDownload className="btn-icon" />
                        <span>Download Resume</span>
                        <div className="btn-shine"></div>
                    </motion.button>
                    <motion.a
                        href="#projects"
                        className="btn btn-secondary hero-btn"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>View Projects</span>
                        <FaArrowRight className="btn-icon" />
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="hero-socials">
                    <span className="socials-label">Connect with me</span>
                    <div className="socials-divider"></div>
                    <div className="socials-links">
                        <motion.a
                            href="https://www.linkedin.com/in/mohamed-asif-m-35963a2a1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ y: -6, scale: 1.15, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaLinkedin />
                        </motion.a>
                        <motion.a
                            href="https://github.com/Asif-3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            whileHover={{ y: -6, scale: 1.15, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGithub />
                        </motion.a>
                        <motion.a
                            href="mailto:mohamedasif.1524@gmail.com"
                            className="social-link"
                            whileHover={{ y: -6, scale: 1.15, boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaEnvelope />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};


export default Hero;
