import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBrain, FaMicrochip, FaLaptopCode } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import './Experience.css';

const Experience = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

    const experiences = [
        {
            icon: <FaLaptopCode />,
            title: 'Full-Stack Development Internship',
            company: 'Codomax Digital Solutions',
            duration: '20 Jul 2026 - 02 Aug 2026',
            description: 'Completed a two-week virtual internship focused on full-stack development and real-world application development. Successfully completed assigned development tasks while demonstrating technical aptitude, problem-solving skills, and adaptability.',
            color: '#22c55e',
            skills: ['Full Stack', 'Web Development', 'Problem Solving']
        },
        {
            icon: <FaMicrochip />,
            title: 'CUDA Python Internship',
            company: 'ADVI Group of Companies',
            duration: '25 Jun 2025 - 29 Jul 2025',
            description: 'Worked with CUDA Python deployment on NVIDIA boards, focusing on GPU acceleration, parallel processing, and performance optimization techniques.',
            color: '#06b6d4',
            skills: ['CUDA', 'GPU', 'Python', 'Nvidia']
        },
        {
            icon: <FaBrain />,
            title: 'Artificial Intelligence Internship',
            company: 'Odugaatech Pvt. Ltd.',
            duration: '29 Jan 2025 - 14 Feb 2025',
            description: 'Gained practical experience in Artificial Intelligence concepts, Python automation, AI workflows, and model development.',
            color: '#8b5cf6',
            skills: ['Python', 'AI', 'Automation']
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="section experience" id="experience" ref={(el) => { ref(el); sectionRef.current = el; }}>
            <div className="experience-bg">
                <div className="exp-orb exp-orb-1"></div>
                <div className="exp-orb exp-orb-2"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Work</span>
                    <h2 className="section-title">Professional Experience</h2>
                    <p className="section-subtitle">
                        Real-world experience that shaped my skills
                    </p>
                </motion.div>

                <div className="experience-timeline-wrapper">
                    {/* Animated Timeline Line */}
                    <div className="timeline-track">
                        <motion.div className="timeline-progress" style={{ height: lineHeight }} />
                    </div>

                    <motion.div
                        className="experience-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="experience-card"
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                                }}
                                style={{ '--exp-color': exp.color }}
                            >
                                {/* Timeline Dot */}
                                <div className="timeline-dot">
                                    <div className="dot-inner"></div>
                                    <div className="dot-ring"></div>
                                </div>

                                <div className="exp-card-inner">
                                    <div className="exp-icon-wrapper">
                                        <div className="exp-icon">{exp.icon}</div>
                                        <div className="exp-icon-glow"></div>
                                    </div>

                                    <div className="exp-content">
                                        <h3 className="exp-title">{exp.title}</h3>
                                        <p className="exp-company">{exp.company}</p>

                                        <div className="exp-duration">
                                            <span>{exp.duration}</span>
                                        </div>

                                        <p className="exp-description">{exp.description}</p>

                                        <div className="exp-skills">
                                            {exp.skills.map((skill, i) => (
                                                <span key={i} className="exp-skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="exp-glow"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
