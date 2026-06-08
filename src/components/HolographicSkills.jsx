import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import './HolographicSkills.css';

gsap.registerPlugin(ScrollTrigger);

const HolographicSkills = () => {
    const containerRef = useRef(null);
    const skillsRef = useRef([]);

    const skillsData = [
        { name: 'Python', level: 90, category: 'Programming', color: '#00d4ff' },
        { name: 'React', level: 85, category: 'Frontend', color: '#61dafb' },
        { name: 'Machine Learning', level: 85, category: 'AI', color: '#a855f7' },
        { name: 'Node.js', level: 80, category: 'Backend', color: '#68a063' },
        { name: 'MongoDB', level: 75, category: 'Database', color: '#4db33d' },
        { name: 'Deep Learning', level: 75, category: 'AI', color: '#ec4899' },
    ];

    useEffect(() => {
        skillsRef.current.forEach((skill, index) => {
            gsap.fromTo(
                skill,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: skill,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate progress ring
            const progressRing = skill.querySelector('.progress-ring-circle');
            const radius = progressRing.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const level = parseInt(skill.dataset.level);
            const offset = circumference - (level / 100) * circumference;

            gsap.fromTo(
                progressRing,
                {
                    strokeDashoffset: circumference,
                },
                {
                    strokeDashoffset: offset,
                    duration: 1.5,
                    delay: index * 0.1 + 0.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: skill,
                        start: 'top 70%',
                    },
                }
            );
        });
    }, []);

    return (
        <div className="holographic-skills" ref={containerRef}>
            <div className="skills-grid-3d">
                {skillsData.map((skill, index) => {
                    const radius = 70;
                    const circumference = radius * 2 * Math.PI;
                    const offset = circumference - (skill.level / 100) * circumference;

                    return (
                        <Tilt
                            key={index}
                            className="skill-card-3d"
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            perspective={1000}
                            scale={1.05}
                            transitionSpeed={2000}
                        >
                            <div
                                ref={(el) => (skillsRef.current[index] = el)}
                                data-level={skill.level}
                                className="skill-content"
                            >
                                <div className="skill-ring-container">
                                    <svg className="progress-ring" width="160" height="160">
                                        <defs>
                                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor={skill.color} stopOpacity="1" />
                                                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                                            </linearGradient>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Background circle */}
                                        <circle
                                            className="progress-ring-bg"
                                            stroke="rgba(0, 212, 255, 0.1)"
                                            strokeWidth="8"
                                            fill="transparent"
                                            r={radius}
                                            cx="80"
                                            cy="80"
                                        />

                                        {/* Progress circle */}
                                        <circle
                                            className="progress-ring-circle"
                                            stroke={`url(#gradient-${index})`}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            fill="transparent"
                                            r={radius}
                                            cx="80"
                                            cy="80"
                                            style={{
                                                strokeDasharray: circumference,
                                                strokeDashoffset: circumference,
                                                transform: 'rotate(-90deg)',
                                                transformOrigin: '50% 50%',
                                            }}
                                            filter="url(#glow)"
                                        />
                                    </svg>

                                    <div className="skill-percentage">
                                        <span className="percentage-value">{skill.level}</span>
                                        <span className="percentage-symbol">%</span>
                                    </div>
                                </div>

                                <div className="skill-info">
                                    <h3 className="skill-name">{skill.name}</h3>
                                    <span className="skill-category">{skill.category}</span>
                                </div>

                                <div className="hologram-effect"></div>
                            </div>
                        </Tilt>
                    );
                })}
            </div>
        </div>
    );
};

export default HolographicSkills;
