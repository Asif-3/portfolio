import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaBrain, FaRocket, FaLaptopCode } from 'react-icons/fa';
import './FloatingElements.css';

const FloatingElements = () => {
    const elements = [
        { icon: <FaCode />, delay: 0, duration: 20, x: '10%', y: '15%' },
        { icon: <FaServer />, delay: 2, duration: 25, x: '80%', y: '20%' },
        { icon: <FaDatabase />, delay: 4, duration: 22, x: '15%', y: '70%' },
        { icon: <FaBrain />, delay: 1, duration: 24, x: '85%', y: '65%' },
        { icon: <FaRocket />, delay: 3, duration: 23, x: '50%', y: '80%' },
        { icon: <FaLaptopCode />, delay: 5, duration: 21, x: '90%', y: '40%' },
    ];

    return (
        <div className="floating-elements">
            {elements.map((element, index) => (
                <motion.div
                    key={index}
                    className="floating-icon"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        y: [-20, 20, -20],
                    }}
                    transition={{
                        duration: element.duration,
                        repeat: Infinity,
                        delay: element.delay,
                        ease: 'easeInOut',
                    }}
                    style={{
                        left: element.x,
                        top: element.y,
                    }}
                >
                    {element.icon}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingElements;
