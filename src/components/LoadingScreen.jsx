import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [showName, setShowName] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Completes in ~1400ms to match the 1600ms App.jsx timer
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const next = prev + 1.8;
                if (next >= 35 && !showName) setShowName(true);
                if (next >= 90 && !ready) setReady(true);
                return next;
            });
        }, 25);
        return () => clearInterval(interval);
    }, [showName, ready]);

    const name = "Mohamed Asif M";

    // Infinity path — same shape used for both the stroke and the dot animation
    const infinityPath =
        "M150,75 C150,30 100,10 75,30 C50,50 50,100 75,120 C100,140 150,120 150,75 C150,30 200,10 225,30 C250,50 250,100 225,120 C200,140 150,120 150,75 Z";

    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: 'blur(20px)',
            }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Background */}
            <div className="loading-bg">
                <div className="loading-gradient-orb orb-1"></div>
                <div className="loading-gradient-orb orb-2"></div>
                <div className="loading-gradient-orb orb-3"></div>
            </div>

            <div className="loader-container">

                {/* Infinity Loop */}
                <motion.div
                    className="infinity-wrapper"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <svg
                        className="infinity-svg"
                        viewBox="0 0 300 150"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid meet"
                        overflow="visible"
                    >
                        <defs>
                            <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="50%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#f472b6" />
                            </linearGradient>

                            {/* Glow filter with explicit large region so it's never clipped */}
                            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Stronger glow for dots */}
                            <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Background path — visible guide rail */}
                        <path
                            d={infinityPath}
                            fill="none"
                            stroke="rgba(124, 58, 237, 0.25)"
                            strokeWidth="2.5"
                        />

                        {/* Animated trace — dasharray >> path length so full path is covered */}
                        <path
                            className="infinity-trace"
                            d={infinityPath}
                            fill="none"
                            stroke="url(#infinityGrad)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            filter="url(#glow)"
                        />

                        {/* Glowing dot 1 */}
                        <circle r="5.5" fill="#22d3ee" filter="url(#dotGlow)">
                            <animateMotion
                                dur="4s"
                                repeatCount="indefinite"
                                path={infinityPath}
                            />
                        </circle>

                        {/* Glowing dot 2 — offset by half cycle */}
                        <circle r="3.5" fill="#a78bfa" filter="url(#dotGlow)">
                            <animateMotion
                                dur="4s"
                                repeatCount="indefinite"
                                begin="-2s"
                                path={infinityPath}
                            />
                        </circle>
                    </svg>

                    {/* Glow behind infinity */}
                    <div className="infinity-glow"></div>
                </motion.div>

                {/* Name */}
                <motion.h2
                    className="loading-name"
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={showName ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {name.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={showName ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: i * 0.05,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    className="loading-tagline"
                    initial={{ opacity: 0, y: 15 }}
                    animate={showName ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Designing experiences, not just websites...
                </motion.p>

                {/* Progress */}
                <motion.div
                    className="loading-progress"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="progress-track">
                        <motion.div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                        <div className="progress-glow" style={{ left: `${progress}%` }} />
                    </div>
                    <div className="progress-info">
                        <motion.span
                            className="progress-label"
                            animate={ready ? { color: '#34d399' } : {}}
                        >
                            {ready ? 'Ready' : 'Loading experience...'}
                        </motion.span>
                        <span className="progress-percent">{Math.min(Math.round(progress), 100)}%</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
