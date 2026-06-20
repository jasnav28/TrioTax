import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';
import type { Variants } from 'framer-motion';

export interface Strength {
  title: string;
  description: string;
  imageSrc: string;
  overlayText: {
    part1: string;
    part2: string;
  };
}

interface MinimalistHeroProps {
  strengths: Strength[];
  className?: string;
}

export const MinimalistHero = ({
  strengths,
  className,
}: MinimalistHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play rotation every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % strengths.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [strengths.length]);

  const currentStrength = strengths[activeIndex];

  // Animation configurations
  const leftTextVariants: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const rightTextVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const imageVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1.05, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.6, ease: "easeIn" } },
  };

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Header: 'Our Key Strength' */}
      <header className="z-30 flex w-full justify-center mt-4">
        <AnimatedText
          text="Our Key Strength"
          textClassName="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          underlineClassName="text-[#7342E2]"
          underlineDuration={1.8}
        />
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-4 my-8">
        {/* Left Column: Current Strength Detail */}
        <div className="z-20 order-2 md:order-1 text-center md:text-left flex flex-col justify-center h-full min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={leftTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center md:items-start"
            >
              {/* Index Indicator */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#7342E2] mb-3">
                0{activeIndex + 1} / 0{strengths.length}
              </span>
              
              {/* Strength title */}
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {currentStrength.title}
              </h2>
              
              {/* Description */}
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
                {currentStrength.description}
              </p>
              
              <a 
                href="#contact" 
                className="mt-6 inline-block text-sm font-medium text-foreground underline decoration-from-font hover:text-[#7342E2] transition-colors"
              >
                Inquire Now
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Column: Image & Rotating Glow Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-[350px] md:h-[450px]">
          {/* Animated Background Circle */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 25, 
              ease: "linear" 
            }}
            className="absolute z-0 h-[260px] w-[260px] rounded-full bg-yellow-400/80 md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"
          />
          
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={currentStrength.imageSrc}
              alt={currentStrength.title}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 h-auto w-52 object-cover md:w-60 lg:w-64 rounded-2xl shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=${encodeURIComponent(currentStrength.title)}`;
              }}
            />
          </AnimatePresence>
        </div>

        {/* Right Column: Giant Overlay Text */}
        <div className="z-20 order-3 flex items-center justify-center text-center md:justify-start h-full min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={rightTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <h1 className="text-5xl font-extrabold leading-none text-foreground md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter">
                {currentStrength.overlayText.part1}
                <br />
                <span className="text-[#7342E2] dark:text-[#a882fa]">
                  {currentStrength.overlayText.part2}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators / Jump controls */}
      <div className="z-30 flex items-center justify-center gap-3 py-4">
        {strengths.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative flex h-8 w-8 items-center justify-center cursor-pointer focus:outline-none"
            aria-label={`Go to strength ${index + 1}`}
          >
            {/* Active Dot indicator */}
            <span 
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                activeIndex === index 
                  ? "bg-[#7342E2] scale-125" 
                  : "bg-foreground/20 group-hover:bg-foreground/45"
              )} 
            />
            {activeIndex === index && (
              <motion.span 
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full border border-[#7342E2] opacity-60"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
