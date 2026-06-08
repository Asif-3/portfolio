import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, useEffect } from 'react';
import {
    FaPython, FaJsSquare, FaHtml5, FaCss3Alt, FaReact,
    FaGitAlt, FaGithub, FaLinux, FaJava, FaShieldAlt, FaBrain, FaEye
} from 'react-icons/fa';
import {
    SiDjango, SiFlask, SiFastapi, SiTensorflow, SiPytorch, SiScikitlearn,
    SiOpencv, SiNumpy, SiPandas, SiMysql, SiMongodb, SiKeras,
    SiFirebase, SiVercel, SiJupyter, SiStreamlit, SiTailwindcss,
    SiKalilinux, SiHuggingface, SiPlotly
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import SplashCursor from '../components/SplashCursor';
import './Skills.css';

const Skills = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

    const categories = [
        {
            title: 'AI / ML / DL',
            skills: [
                { name: 'TensorFlow', icon: <SiTensorflow />, color: '#ff6f00' },
                { name: 'PyTorch', icon: <SiPytorch />, color: '#ee4c2c' },
                { name: 'Keras', icon: <SiKeras />, color: '#d00000' },
                { name: 'Scikit-learn', icon: <SiScikitlearn />, color: '#f7931e' },
                { name: 'OpenCV', icon: <SiOpencv />, color: '#5c3ee8' },
                { name: 'Hugging Face', icon: <SiHuggingface />, color: '#ffd21e' },
                { name: 'YOLO', icon: <FaEye />, color: '#00d084' },
                { name: 'NumPy', icon: <SiNumpy />, color: '#4dabcf' },
                { name: 'Pandas', icon: <SiPandas />, color: '#e70488' },
                { name: 'Matplotlib', icon: <SiPlotly />, color: '#11a9ba' },
                { name: 'NLTK', icon: <FaBrain />, color: '#4caf50' },
            ]
        },
        {
            title: 'Languages',
            skills: [
                { name: 'Python', icon: <FaPython />, color: '#3776ab' },
                { name: 'Java', icon: <FaJava />, color: '#f89820' },
                { name: 'JavaScript', icon: <FaJsSquare />, color: '#f7df1e' },
            ]
        },
        {
            title: 'Frontend',
            skills: [
                { name: 'React', icon: <FaReact />, color: '#61dafb' },
                { name: 'HTML5', icon: <FaHtml5 />, color: '#e34f26' },
                { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572b6' },
                { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4' },
            ]
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Django', icon: <SiDjango />, color: '#0c4b33' },
                { name: 'Flask', icon: <SiFlask />, color: '#61dafb' },
                { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
            ]
        },
        {
            title: 'Databases',
            skills: [
                { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
                { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
                { name: 'Firebase', icon: <SiFirebase />, color: '#ffca28' },
            ]
        },
        {
            title: 'Cybersecurity',
            skills: [
                { name: 'Kali Linux', icon: <SiKalilinux />, color: '#557c94' },
                { name: 'SET', icon: <FaShieldAlt />, color: '#ff4444' },
                { name: 'Nmap', icon: <FaShieldAlt />, color: '#4682b4' },
            ]
        },
        {
            title: 'Tools',
            skills: [
                { name: 'Git', icon: <FaGitAlt />, color: '#f05032' },
                { name: 'GitHub', icon: <FaGithub />, color: '#c9d1d9' },
                { name: 'VS Code', icon: <VscVscode />, color: '#007acc' },
                { name: 'Jupyter', icon: <SiJupyter />, color: '#f37626' },
                { name: 'Linux', icon: <FaLinux />, color: '#fcc624' },
                { name: 'Streamlit', icon: <SiStreamlit />, color: '#ff4b4b' },
                { name: 'Vercel', icon: <SiVercel />, color: '#c9d1d9' },
            ]
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };

    const categoryVariants = {
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

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.6, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 18
            }
        }
    };

    return (
        <section className="section skills" id="skills" ref={(el) => { ref(el); sectionRef.current = el; }}>
            {/* Background */}
            <div className="skills-bg">
                <div className="skills-gradient"></div>
                <div className="skills-grid-pattern"></div>
                <motion.div className="skills-floating-orb orb-1" style={{ y: orbY }} />
                <motion.div
                    className="skills-floating-orb orb-2"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 60]) }}
                />
                {/* SplashCursor fluid effect — disabled on mobile for performance */}
                {!isMobile && (
                    <SplashCursor
                        SIM_RESOLUTION={window.innerWidth <= 1024 ? 64 : 128}
                        DYE_RESOLUTION={window.innerWidth <= 1024 ? 512 : 1440}
                        DENSITY_DISSIPATION={3.5}
                        VELOCITY_DISSIPATION={2}
                        PRESSURE={0.1}
                        CURL={3}
                        SPLAT_RADIUS={0.2}
                        SPLAT_FORCE={6000}
                        COLOR_UPDATE_SPEED={10}
                    />
                )}
            </div>

            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-label">Skills</span>
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </motion.div>

                <motion.div
                    className="skills-categories"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="skill-category"
                            variants={categoryVariants}
                        >
                            <h3 className="category-title">{category.title}</h3>
                            <div className="category-skills">
                                {category.skills.map((tech, index) => (
                                    <motion.div
                                        key={index}
                                        className="tech-item"
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.12,
                                            y: -6,
                                            transition: { duration: 0.25 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.div
                                            className="tech-icon-wrapper"
                                            whileHover={{
                                                boxShadow: `0 0 30px ${tech.color}40, 0 0 60px ${tech.color}20`
                                            }}
                                        >
                                            <motion.div
                                                className="tech-icon"
                                                style={{ color: tech.color }}
                                                whileHover={{
                                                    rotate: 360,
                                                    transition: { duration: 0.6 }
                                                }}
                                            >
                                                {tech.icon}
                                            </motion.div>
                                            <div
                                                className="tech-icon-bg"
                                                style={{ background: `${tech.color}12` }}
                                            ></div>
                                        </motion.div>
                                        <span className="tech-name">{tech.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
