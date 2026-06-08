import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Always-eager: visible immediately ──────────────────────────
import Navbar        from './components/Navbar';
import Hero          from './sections/Hero';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import BackToTop      from './components/BackToTop';
import CustomCursor   from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';

// ── Lazy-loaded: only downloaded when needed ────────────────────
const About          = lazy(() => import('./sections/About'));
const Skills         = lazy(() => import('./sections/Skills'));
const Experience     = lazy(() => import('./sections/Experience'));
const Projects       = lazy(() => import('./sections/Projects'));
const Education      = lazy(() => import('./sections/Education'));
const Certifications = lazy(() => import('./sections/Certifications'));
const Contact        = lazy(() => import('./sections/Contact'));
const Footer         = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

// Lightweight fallback while lazy section downloads
const SectionFallback = () => (
  <div style={{ minHeight: '10rem' }} aria-hidden="true" />
);

function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  // Reduced from 2800ms → 1600ms for faster perceived load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && mainRef.current) {
      // Cinematic scroll-triggered section reveals
      const sections = mainRef.current.querySelectorAll('.section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Parallax effect on background decorations
      const decorations = mainRef.current.querySelectorAll('.parallax-element');
      decorations.forEach((el) => {
        const speed = el.dataset.speed || 0.5;
        gsap.to(el, {
          y: () => -ScrollTrigger.maxScroll(window) * speed * 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <div className="App">
          <ParticleBackground />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main ref={mainRef}>
            {/* Hero is eager — first paint */}
            <Hero />

            {/* All below-fold sections are lazy */}
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Certifications />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default App;
