import { useMemo, useEffect, useRef, useState } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 968 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const orbs = useMemo(() => {
        if (isMobile) {
            // Fewer, smaller orbs on mobile
            return [
                { cx: '20%', cy: '30%', size: 200, color: 'rgba(124, 58, 237, 0.06)' },
                { cx: '75%', cy: '60%', size: 180, color: 'rgba(34, 211, 238, 0.04)' },
            ];
        }
        return [
            { cx: '20%', cy: '30%', size: 400, color: 'rgba(124, 58, 237, 0.08)', speed: 0.3 },
            { cx: '75%', cy: '60%', size: 350, color: 'rgba(34, 211, 238, 0.05)', speed: 0.5 },
            { cx: '50%', cy: '80%', size: 300, color: 'rgba(244, 114, 182, 0.04)', speed: 0.4 },
        ];
    }, [isMobile]);

    // Mouse tracking only on desktop
    const orbRefs = useRef([]);

    useEffect(() => {
        if (isMobile) return;

        let rafId;
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Direct DOM manipulation instead of setState for performance
            orbRefs.current.forEach((el, i) => {
                if (el) {
                    const speed = orbs[i]?.speed || 0.3;
                    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isMobile, orbs]);

    return (
        <div className="particle-background" aria-hidden="true">
            <div className="bg-orbs">
                {orbs.map((orb, i) => (
                    <div
                        key={i}
                        ref={(el) => (orbRefs.current[i] = el)}
                        className="bg-orb"
                        style={{
                            left: orb.cx,
                            top: orb.cy,
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
                            animationDelay: `${i * -5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Skip noise overlay on mobile */}
            {!isMobile && <div className="noise-overlay"></div>}
        </div>
    );
};

export default ParticleBackground;
