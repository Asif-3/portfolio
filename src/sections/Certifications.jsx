import { motion } from 'framer-motion';
import { FaLaptopCode, FaBriefcase, FaCloud, FaShieldAlt, FaNetworkWired, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Certifications.css';

const Certifications = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const certifications = [
        { icon: <FaLaptopCode />, title: 'Full Stack Developer Bootcamp', provider: 'GeeksforGeeks', color: '#22c55e' },
        { icon: <FaBriefcase />, title: 'Career Edge', provider: 'TCS iON', color: '#8b5cf6' },
        { icon: <FaCloud />, title: 'Cloud Technologies', provider: 'Infosys Springboard', color: '#06b6d4' },
        { icon: <FaShieldAlt />, title: 'Cybersecurity Analyst Job Simulation', provider: 'Forage (TATA)', color: '#ec4899' },
        { icon: <FaNetworkWired />, title: 'Ethical Hacker', provider: 'Cisco Networking Academy', color: '#f97316' },
        { icon: <FaChartLine />, title: 'Data Science & Analytics', provider: 'HP Life', color: '#6366f1' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(6px)' },
        visible: {
            opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="section certifications" id="certifications" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Achievements</span>
                    <h2 className="section-title">Certifications & Training</h2>
                    <p className="section-subtitle">Professional certifications and courses I've completed</p>
                </motion.div>

                <motion.div
                    className="cert-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="cert-card"
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                            }}
                            style={{ '--cert-color': cert.color }}
                        >
                            <div className="cert-icon-wrapper">
                                <div className="cert-icon">{cert.icon}</div>
                                <div className="cert-icon-glow"></div>
                            </div>
                            <div className="cert-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-provider">{cert.provider}</p>
                            </div>
                            <div className="cert-badge">
                                <span className="cert-check">✓</span>
                                <span>Verified</span>
                            </div>
                            <div className="cert-shine"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
