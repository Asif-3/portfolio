import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only enable on desktop
        const isMobile = window.matchMedia('(max-width: 968px)').matches || 'ontouchstart' in window;
        if (isMobile) return;

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        const updateFollower = () => {
            followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
            followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;
            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
            }
            requestAnimationFrame(updateFollower);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.matches('a, button, input, textarea, .project-card, .feature-card, .cert-card, .tech-item')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (target.matches('a, button, input, textarea, .project-card, .feature-card, .cert-card, .tech-item')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        const animFrame = requestAnimationFrame(updateFollower);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    // Don't render on mobile
    if (typeof window !== 'undefined' && (window.matchMedia('(max-width: 968px)').matches || 'ontouchstart' in window)) {
        return null;
    }

    return (
        <>
            <div ref={cursorRef} className={`custom-cursor ${isHovering ? 'hovering' : ''}`} />
            <div ref={followerRef} className={`cursor-follower ${isHovering ? 'hovering' : ''}`} />
        </>
    );
};

export default CustomCursor;
