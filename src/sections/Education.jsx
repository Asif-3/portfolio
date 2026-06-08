import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaBook, FaBookOpen } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Education.css';

/* Each card independently observes its own visibility */
const EduCard = ({ item, index }) => {
    const [cardRef, cardInView] = useInView({
        triggerOnce: true,
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    return (
        <motion.div
            ref={cardRef}
            className="edu-card"
            style={{ '--card-color': item.color }}
            initial={{ opacity: 0, y: 50 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {/* Timeline connector */}
            <div className="edu-timeline-connector">
                <motion.div
                    className="edu-timeline-dot"
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                />
                <div className="edu-timeline-line" />
            </div>

            <motion.div
                className="edu-card-inner"
                initial={{ opacity: 0 }}
                animate={cardInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
            >
                {/* Top accent */}
                <div className="edu-card-accent" />

                <div className="edu-card-header">
                    <motion.div
                        className="edu-card-icon"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={cardInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.25 }}
                    >
                        {item.icon}
                    </motion.div>

                    <div className="edu-card-header-text">
                        {item.current && (
                            <motion.span
                                className="edu-current-badge"
                                initial={{ opacity: 0, x: -15 }}
                                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.35 }}
                            >
                                <span className="edu-badge-dot" />
                                Currently Pursuing
                            </motion.span>
                        )}
                        <h3 className="edu-card-degree">{item.degree}</h3>
                    </div>
                </div>

                <div className="edu-card-meta">
                    <span className="edu-meta-item">
                        <FaCalendarAlt />
                        {item.year}
                    </span>
                    <span className="edu-meta-item">
                        <FaMapMarkerAlt />
                        {item.institution}
                    </span>
                </div>

                <p className="edu-card-description">{item.description}</p>
            </motion.div>
        </motion.div>
    );
};

const Education = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    const timeline = [
        {
            degree: 'B.Tech in AI and Data Science',
            year: '2023 - 2027',
            institution: 'AVS Engineering College, Salem',
            description: 'Specializing in Artificial Intelligence, Machine Learning, and Data Science with focus on practical applications and emerging technologies.',
            current: true,
            icon: <FaGraduationCap />,
            color: '#7c3aed',
        },
        {
            degree: 'Higher Secondary Certificate (HSC)',
            year: '2023',
            institution: 'Sri Ramakrishna Saradha Aided Hr. Sec. School',
            description: 'Completed Higher Secondary education with focus on Science stream.',
            current: false,
            icon: <FaBook />,
            color: '#22d3ee',
        },
        {
            degree: 'Secondary School Certificate (SSLC)',
            year: '2021',
            institution: 'Sri Ramakrishna Saradha Aided Hr. Sec. School',
            description: 'Completed Secondary School education with excellent academic performance.',
            current: false,
            icon: <FaBookOpen />,
            color: '#f472b6',
        }
    ];

    return (
        <section className="section education" id="education" ref={ref}>
            <div className="education-bg-decoration">
                <div className="edu-gradient-orb"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Education</span>
                    <h2 className="section-title">Academic Journey</h2>
                    <p className="section-subtitle">
                        My educational background and qualifications
                    </p>
                </motion.div>

                <div className="edu-cards-list">
                    {timeline.map((item, index) => (
                        <EduCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
