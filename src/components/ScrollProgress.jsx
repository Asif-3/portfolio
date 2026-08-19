import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div className="scroll-progress-bar" style={{ scaleX }}>
            <div className="scroll-progress-glow"></div>
        </motion.div>
    );
};

export default ScrollProgress;
