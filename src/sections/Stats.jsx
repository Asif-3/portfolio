import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Stats.css';

const CountUp = ({ target, suffix = '', trigger }) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!trigger || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [trigger, target]);

    return <span className="stat-number">{count}{suffix}</span>;
};

const Stats = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const stats = [
        { target: 10, suffix: '+', label: 'Projects', icon: '🚀' },
        { target: 25, suffix: '+', label: 'Technologies', icon: '⚡' },
        { target: 3, suffix: '+', label: 'Years Learning', icon: '📚' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section className="stats-section" ref={ref} id="stats">
            <div className="container">
                <motion.div
                    className="stats-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                borderColor: 'rgba(124, 58, 237, 0.3)',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(124, 58, 237, 0.1)'
                            }}
                        >
                            <div className="stat-icon-wrapper">
                                <span className="stat-emoji">{stat.icon}</span>
                            </div>
                            <div className="stat-info">
                                <CountUp target={stat.target} suffix={stat.suffix} trigger={inView} />
                                <span className="stat-label">{stat.label}</span>
                            </div>
                            <div className="stat-card-glow"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="stats-divider"></div>
        </section>
    );
};

export default Stats;
