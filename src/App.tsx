import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRightCircle } from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { Navbar } from '@/components/Navbar';
import { HoverFooter } from '@/components/HoverFooter';
import { HeroSectionDemo } from '@/components/HeroSectionDemo';
import { StrengthsRevealSection } from '@/components/StrengthsRevealSection';
import ProjectCalculator from '@/components/ProjectCalculator';
import { ToastProvider } from '@/components/ui/toaster';
import AetherFlowHero from '@/components/ui/aether-flow-hero';
import { ContactSection } from '@/components/ContactSection';
import { MapSection } from '@/components/MapSection';
import ServicesPage from '@/components/ServicesPage';

type View = 'hero' | 'about' | 'strengths' | 'contact';

function App() {
  const [, setCurrentView] = useState<View>('hero');
  const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Set up IntersectionObserver to update active section in navbar as user scrolls
  useEffect(() => {
    const sections: View[] = ['hero', 'strengths'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentView(id);
          }
        },
        {
          threshold: 0.4, // Trigger when 40% of the section is visible
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const [currentPage, setCurrentPage] = useState<'home' | 'calculator' | 'about-us' | 'services'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#calculator') return 'calculator';
      if (hash === '#about-us') return 'about-us';
      if (hash.startsWith('#services')) return 'services';
      return 'home';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#calculator') {
        setCurrentPage('calculator');
      } else if (hash === '#about-us') {
        setCurrentPage('about-us');
      } else if (hash.startsWith('#services')) {
        setCurrentPage('services');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage === 'home' && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      if (id === 'contact' || id === 'strengths' || id === 'hero') {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [currentPage]);

  const scrollToSection = (id: View) => {
    setIsProgrammaticScrolling(true);
    setTimeout(() => {
      setIsProgrammaticScrolling(false);
    }, 1200);

    if (window.location.hash && window.location.hash !== '') {
      window.location.hash = '';
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setCurrentView(id);
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setCurrentView(id);
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  return (
    <ToastProvider>
      <div className="min-h-screen w-full scroll-smooth bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 select-none">
        <Navbar theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

        {currentPage === 'calculator' ? (
          <>
            <div className="pt-20">
              <ProjectCalculator theme={theme} />
            </div>
            {/* Footer Section */}
            <section 
              className="relative h-screen w-full bg-[#0F0F11] dark:bg-black text-white transition-colors duration-300"
            >
              <HoverFooter scrollToSection={scrollToSection} />
            </section>
          </>
        ) : currentPage === 'about-us' ? (
          <>
            <div className="pt-24 min-h-[calc(100vh-80px)]">
              <HeroSectionDemo />
            </div>
            {/* Footer Section */}
            <section 
              className="relative h-screen w-full bg-[#0F0F11] dark:bg-black text-white transition-colors duration-300"
            >
              <HoverFooter scrollToSection={scrollToSection} />
            </section>
          </>
        ) : currentPage === 'services' ? (
          <>
            <div className="pt-24 min-h-[calc(100vh-80px)]">
              <ServicesPage theme={theme} />
            </div>
            {/* Footer Section */}
            <section 
              className="relative h-screen w-full bg-[#0F0F11] dark:bg-black text-white transition-colors duration-300"
            >
              <HoverFooter scrollToSection={scrollToSection} />
            </section>
          </>
        ) : (
          <>
            {/* Hero Section */}
            <section 
              id="hero" 
              className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-white dark:bg-black text-black dark:text-white"
            >
              <AetherFlowHero theme={theme}>
                {/* Overlay to ensure text readability in both modes, letting particle flow shine through */}
                <div className="absolute inset-0 bg-white/5 dark:bg-black/40 z-0 transition-colors duration-300 pointer-events-none" />

                {/* Bottom fade out black/white effect */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black via-white/85 dark:via-black/85 to-transparent z-10 pointer-events-none" />

                {/* Hero Content */}
                <div
                  className="relative z-10 w-full px-6 sm:px-12 md:px-20 flex-grow flex items-center justify-center"
                  style={{ paddingTop: 'clamp(115px, 14vw, 195px)', paddingBottom: 'clamp(60px, 8vw, 110px)' }}
                >
                  <div style={{ maxWidth: '800px' }} className="w-full text-center flex flex-col items-center justify-center">
                    <motion.h1
                      custom={0}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      style={{
                        fontFamily: 'Helvetica Now Display Bold, sans-serif',
                        fontSize: 'clamp(1.65rem, 5vw, 3rem)',
                        lineHeight: '1.05',
                        letterSpacing: '-0.01em',
                        color: theme === 'dark' ? '#F3F4F6' : '#192837',
                        marginBottom: '24px',
                      }}
                      className="transition-colors duration-300 text-center flex items-center justify-center"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <img 
                          src="/logo.png" 
                          alt="TRIOTAX Logo" 
                          className="h-16 w-16 md:h-24 md:w-24 object-contain transition-transform duration-300 hover:scale-105 shrink-0" 
                        />
                        <span className="font-sans text-5xl md:text-8xl font-extrabold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#7342E2] to-[#a882fa]">
                          TRIOTAX
                        </span>
                      </div>
                    </motion.h1>
                    <motion.div
                      custom={1}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="text-lg md:text-xl font-normal mb-6 transition-colors duration-300 text-center"
                      style={{ color: theme === 'dark' ? '#CFC8C5' : '#4A5568' }}
                    >
                      <span>{"Trusted business support with "}</span>
                      <Typewriter
                        text={[
                          "manage taxes easily.",
                          "handle compliance securely.",
                          "grow businesses confidently.",
                          "streamline registrations.",
                          "simplify tax filings.",
                        ]}
                        speed={70}
                        className="text-[#7342E2] font-semibold dark:text-[#a882fa]"
                        waitTime={1500}
                        deleteSpeed={40}
                        cursorChar={"_"}
                      />
                    </motion.div>
                    <motion.p
                      custom={2}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      style={{
                        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                        lineHeight: '1.65',
                        color: theme === 'dark' ? '#D1D5DB' : '#192837',
                        opacity: theme === 'dark' ? 0.9 : 0.8,
                        maxWidth: '560px',
                      }}
                      className="transition-colors duration-300 mx-auto text-center"
                    >
                      We help businesses manage registrations, taxation, invoicing, and compliance with fast, reliable, and professional support.
                    </motion.p>
                    <motion.button
                      custom={3}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => scrollToSection('contact')}
                      className="mt-8 flex items-center justify-center gap-4 px-6 py-[17px] rounded-full bg-[#7342E2] text-white font-semibold cursor-pointer mx-auto"
                      style={{
                        boxShadow: '0 4px 24px rgba(115,66,226,0.28)',
                        minWidth: '210px',
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      }}
                    >
                      Get Started
                      <ArrowRightCircle size={20} />
                    </motion.button>
                  </div>
                </div>

                  {/* Scroll Indicator */}
                  <div className="relative z-10 w-full flex justify-center pb-6">
                    <motion.div 
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      onClick={() => scrollToSection('strengths')}
                      className="text-xs font-semibold text-[#192837] dark:text-gray-400 cursor-pointer flex flex-col items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <span>Scroll Down</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                    </motion.div>
                  </div>
                </AetherFlowHero>
              </section>



              {/* Our Key Strength Section */}
              <section 
                id="strengths" 
                className="relative w-full bg-black transition-colors duration-300"
              >
                <StrengthsRevealSection theme={theme} isProgrammaticScrolling={isProgrammaticScrolling} />
              </section>

            {/* Contact Us Section */}
            <ContactSection theme={theme} />

            {/* Office Locations Map Section */}
            <MapSection theme={theme} />

            {/* Footer Section */}
            <section 
              className="relative h-screen w-full bg-[#0F0F11] dark:bg-black text-white transition-colors duration-300"
            >
              <HoverFooter scrollToSection={scrollToSection} />
            </section>
          </>
        )}
      </div>
    </ToastProvider>
  );
}

export default App;
