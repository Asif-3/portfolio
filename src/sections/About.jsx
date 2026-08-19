import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBolt, FaShieldAlt, FaBrain, FaRocket, FaCode, FaLightbulb } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';
import './About.css';

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [hoveredCard, setHoveredCard] = useState(null);
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const features = [
        {
            icon: <FaBrain />,
            title: 'AI & ML',
            description: 'Building intelligent solutions with machine learning and deep learning technologies',
            gradient: 'linear-gradient(135deg, #7c3aed, #6366f1)'
        },
        {
            icon: <FaCode />,
            title: 'Full Stack',
            description: 'Creating end-to-end web applications with modern frameworks and technologies',
            gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
        },
        {
            icon: <FaShieldAlt />,
            title: 'Cybersecurity',
            description: 'Implementing secure systems with ethical hacking and security best practices',
            gradient: 'linear-gradient(135deg, #f472b6, #ec4899)'
        },
        {
            icon: <FaLightbulb />,
            title: 'Innovation',
            description: 'Constantly learning and experimenting with emerging technologies',
            gradient: 'linear-gradient(135deg, #fbbf24, #f97316)'
        },
    ];

    const highlights = [
        { icon: <FaBolt />, text: 'Quick learner with hands-on coding experience' },
        { icon: <FaShieldAlt />, text: 'Interested in Ethical Hacking & Cybersecurity' },
        { icon: <FaRocket />, text: 'Dedicated to building impactful AI projects' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <section className="section about" id="about" ref={(el) => { ref(el); sectionRef.current = el; }}>
            {/* Background Decoration */}
            <div className="about-bg-decoration">
                <motion.div className="decoration-circle circle-1" style={{ y: parallaxY }}></motion.div>
                <motion.div className="decoration-circle circle-2" style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}></motion.div>
                <div className="about-grid-overlay"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">Building the Future with AI</h2>
                    <p className="section-subtitle">
                        Passionate about creating intelligent solutions that make a difference
                    </p>
                </motion.div>

                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Main About Card */}
                    <motion.div className="about-main" variants={itemVariants}>
                        <div className="about-text-content">
                            <div className="about-intro">
                                <motion.div
                                    className="intro-avatar"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="avatar-glow"></div>
                                    <div className="avatar-ring"></div>
                                    <img
                                        src="https://img.freepik.com/premium-photo/advanced-neural-networks-digital-brain-illustration_916860-7488.jpg"
                                        alt="AI Neural Network"
                                    />
                                </motion.div>
                                <div className="intro-text">
                                    <h3>Hello! I'm Mohamed Asif M</h3>
                                    <p className="intro-tagline">AI & Data Science Student</p>
                                </div>
                            </div>

                            <p className="about-description">
                                I'm pursuing <strong>B.Tech in Artificial Intelligence and Data Science</strong> at
                                AVS Engineering College. I'm passionate about building intelligent, secure, and
                                scalable systems powered by data-driven insights.
                            </p>

                            <p className="about-description">
                                I love experimenting with emerging technologies to create impactful digital solutions
                                that solve real-world problems. My focus areas include machine learning, deep learning,
                                and full-stack development.
                            </p>

                            <div className="about-highlights">
                                {highlights.map((highlight, index) => (
                                    <motion.div
                                        key={index}
                                        className="highlight-item"
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                        whileHover={{ x: 10, backgroundColor: 'rgba(124, 58, 237, 0.08)' }}
                                    >
                                        <div className="highlight-icon">{highlight.icon}</div>
                                        <span>{highlight.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature Cards */}
                    <div className="about-features">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={`feature-card ${hoveredCard === index ? 'hovered' : ''}`}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                whileHover={{
                                    y: -12,
                                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                                }}
                            >
                                <div className="feature-icon-wrapper">
                                    <div className="feature-icon" style={{ background: feature.gradient }}>{feature.icon}</div>
                                    <div className="feature-icon-bg" style={{ background: feature.gradient }}></div>
                                </div>
                                <h4 className="feature-title">{feature.title}</h4>
                                <p className="feature-description">{feature.description}</p>
                                <div className="feature-glow" style={{ background: feature.gradient }}></div>
                                <div className="feature-border-glow"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
