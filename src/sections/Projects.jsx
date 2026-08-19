import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import './Projects.css';

const Projects = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [hoveredProject, setHoveredProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'ShadowTrap AI — Cyber Deception & Threat Intelligence Engine',
            description: 'An AI-powered cybersecurity monitoring platform using the Cowrie honeypot to capture and analyze simulated SSH attacks. Features attacker behavior analysis, IP intelligence, attack visualization, detailed security reporting, and automated Telegram alerts for real-time attack notifications.',
            image: '/shadowtrapai.png',
            github: 'https://github.com/Asif-3/ShadowTrap-AI',
            tags: ['Python', 'AI', 'Cybersecurity', 'Honeypot'],
            featured: true,
            color: '#8b5cf6'
        },
        {
            id: 2,
            title: 'Phishing Link Blocker Extension',
            description: 'A lightweight browser extension for real-time URL validation and phishing threat detection. Designed to identify suspicious links and block potentially malicious websites while maintaining browser performance.',
            image: '/phishing-link-extension.png',
            github: 'https://github.com/Asif-3/Phishing-Link-Blocker-Extension',
            tags: ['JavaScript', 'Cybersecurity', 'Browser Extension', 'Phishing Detection'],
            featured: true,
            color: '#ef4444'
        },
        {
            id: 3,
            title: 'Movie Recommendation System',
            description: 'Interactive web app recommending movies using TF-IDF and cosine similarity algorithms. Features integrated posters, caching, and error handling for smooth user experience.',
            image: 'https://repository-images.githubusercontent.com/828102528/68a7bbfc-8022-4e70-913c-9d94c6ea31f5',
            github: 'https://github.com/Asif-3/movie_recommendation_system',
            tags: ['Python', 'Machine Learning', 'Streamlit', 'API'],
            featured: true,
            color: '#06b6d4'
        }
    ];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="section projects" id="projects" ref={ref}>
            <div className="projects-bg-decoration">
                <div className="decoration-gradient"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        A collection of projects that showcase my skills and passion for building
                    </p>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {projects.map((project) => (
                        <motion.article
                            key={project.id}
                            className={`project-card ${hoveredProject === project.id ? 'hovered' : ''}`}
                            variants={itemVariants}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            style={{ '--project-color': project.color }}
                        >
                            {/* Project Image */}
                            <div className="project-image-wrapper">
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                    <div className="project-image-overlay"></div>
                                </div>

                                {/* Quick Actions */}
                                <div className="project-actions">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-action-btn"
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaGithub />
                                    </motion.a>
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-action-btn primary"
                                        whileHover={{ scale: 1.15, rotate: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaExternalLinkAlt />
                                    </motion.a>
                                </div>

                                {project.featured && (
                                    <span className="project-badge">Featured</span>
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                {/* Tags */}
                                <div className="project-tags">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="project-tag">{tag}</span>
                                    ))}
                                </div>

                                {/* Link */}
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                    whileHover={{ x: 8 }}
                                >
                                    <span>View Project</span>
                                    <FaArrowRight className="link-icon" />
                                </motion.a>
                            </div>

                            {/* Decorative Elements */}
                            <div className="project-glow"></div>
                            <div className="project-border-glow"></div>
                        </motion.article>
                    ))}
                </motion.div>

                {/* View More Button */}
                <motion.div
                    className="projects-cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.a
                        href="https://github.com/Asif-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <FaGithub />
                        <span>View All Projects on GitHub</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
