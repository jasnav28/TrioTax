import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
};

export function Typewriter({
  text,
  delay = 0,
  speed = 0.015,
  className = '',
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={parentVariants}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
