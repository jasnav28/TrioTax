import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { HandWrittenTitle } from '@/components/ui/hand-writing-text';
import { MinimalistHeroDemo } from '@/components/MinimalistHeroDemo';

export function StrengthsRevealSection({ theme, isProgrammaticScrolling }: { theme?: 'light' | 'dark'; isProgrammaticScrolling?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.15 
  });
  
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showRealSection, setShowRealSection] = useState(false);

  useEffect(() => {
    if (isProgrammaticScrolling) {
      setShowRealSection(true);
      setAnimationStarted(false);
      return;
    }

    if (isInView) {
      if (!animationStarted && !showRealSection) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          // If the top of the section is below the viewport threshold,
          // it means we are scrolling down from the top (top-to-bottom travel)
          const enteredFromBottom = rect.top > 0;
          if (enteredFromBottom) {
            setAnimationStarted(true);
            // Scroll the window so the container is positioned perfectly below the sticky Navbar (80px offset)
            const targetPosition = (window.scrollY || window.pageYOffset) + rect.top - 80;
            window.scrollTo({ top: targetPosition, behavior: 'auto' });
          } else {
            // Entering from top (scrolling up), so skip animation and show instantly
            setShowRealSection(true);
          }
        }
      }
    } else {
      // Reset so that the animation plays every time the user scrolls down
      setAnimationStarted(false);
      setShowRealSection(false);
    }
  }, [isInView, animationStarted, showRealSection, isProgrammaticScrolling]);

  const handleAnimationComplete = () => {
    // Re-verify and snap window scroll position right before revealing the content to prevent half-view shifts
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const targetPosition = (window.scrollY || window.pageYOffset) + rect.top - 80;
      window.scrollTo({ top: targetPosition, behavior: 'auto' });
    }

    // Let the drawn line settle and be visible, then transition
    setTimeout(() => {
      setShowRealSection(true);
    }, 1000);
  };

  // Scroll lock effect during animation
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventKeys = (e: KeyboardEvent) => {
      const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'End', 'Home'];
      if (keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    if (animationStarted && !showRealSection) {
      // Disable scrolling
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', preventKeys, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('keydown', preventKeys);
      };
    }
  }, [animationStarted, showRealSection]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden min-h-[600px] lg:min-h-[700px] bg-black"
    >
      <AnimatePresence>
        {animationStarted && !showRealSection && (
          <motion.div
            key="reveal-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black flex-col"
          >
            <HandWrittenTitle 
              title="Our Key Strength" 
              subtitle="Why businesses choose TRIOTAX" 
              onAnimationComplete={handleAnimationComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showRealSection ? (
          <motion.div
            key="real-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <MinimalistHeroDemo theme={theme} />
          </motion.div>
        ) : (
          <div className="w-full min-h-[600px] lg:min-h-[700px] bg-black" />
        )}
      </AnimatePresence>
    </div>
  );
}
