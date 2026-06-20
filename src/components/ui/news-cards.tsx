import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { BookmarkIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsCard {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  timeAgo: string;
  location: string;
  image: string;
  gradientColors?: string[];
  content?: string[];
}

export interface StatusBar {
  id: string;
  category: string;
  subcategory: string;
  length: number; // 1-3 for different lengths
  opacity: number; // 0.3-1 for different opacities
}

interface NewsCardsProps {
  title?: string;
  subtitle?: string;
  statusBars?: StatusBar[];
  newsCards?: NewsCard[];
  enableAnimations?: boolean;
}

const defaultStatusBars: StatusBar[] = [
  {
    id: "1",
    category: "Compliance Services",
    subcategory: "Registrations",
    length: 3,
    opacity: 1,
  },
  {
    id: "2", 
    category: "Financial Audit",
    subcategory: "Taxation",
    length: 2,
    opacity: 0.7,
  },
  {
    id: "3",
    category: "Corporate Filings",
    subcategory: "ROC",
    length: 1,
    opacity: 0.4,
  }
];

const defaultNewsCards: NewsCard[] = [];

export function NewsCards({
  title = "News Today",
  subtitle = "Stories from all over the world",
  statusBars = defaultStatusBars,
  newsCards = defaultNewsCards,
  enableAnimations = true,
}: NewsCardsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const toggleBookmark = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const openCard = (card: NewsCard) => {
    setSelectedCard(card);
  };

  const closeCard = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [shouldAnimate]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      filter: "blur(4px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const, 
        stiffness: 400, 
        damping: 28,
        mass: 0.6,
      }
    }
  };

  const statusBarContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const statusBarVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scaleX: 0,
      x: -20,
    },
    visible: { 
      opacity: 1, 
      scaleX: 1,
      x: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 25,
        scaleX: { type: "spring" as const, stiffness: 400, damping: 30 }
      }
    }
  };

  const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      filter: "blur(6px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 28,
        mass: 0.8,
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-6 bg-transparent text-foreground"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isLoaded ? "visible" : "hidden"}
      variants={shouldAnimate ? containerVariants : undefined}
    >
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          className="mb-8"
          variants={shouldAnimate ? headerVariants : undefined}
        >
          {title && <h1 className="text-4xl font-bold mb-2">{title}</h1>}
          {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
          
          {/* Simple Border Lines */}
          <motion.div 
            className="mt-6 space-y-1"
            variants={shouldAnimate ? statusBarContainerVariants : undefined}
          >
            {statusBars.map((bar, index) => (
              <motion.div
                key={bar.id}
                className={cn("h-0.5 bg-[#7342E2] rounded-full", bar.id === "1" ? "bg-[#7342E2]" : bar.id === "2" ? "bg-[#7342E2]/70" : "bg-[#7342E2]/40")}
                style={{ 
                  opacity: bar.opacity,
                  width: `${(bar.length / 3) * 100}%`
                }}
                variants={shouldAnimate ? statusBarVariants : undefined}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  delay: 0.3 + (index * 0.1),
                  type: "spring" as const, 
                  stiffness: 400, 
                  damping: 30 
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* News Cards with Shared Layout */}
      <LayoutGroup>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          variants={shouldAnimate ? cardContainerVariants : undefined}
        >
          {newsCards.map((card) => {
            if (selectedCard?.id === card.id) {
              return null; // Don't render the compact card when expanded
            }
            
            return (
              <motion.article
                key={card.id}
                layoutId={`card-${card.id}`}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer group"
                variants={shouldAnimate ? cardVariants : undefined}
                whileHover={shouldAnimate ? { 
                  y: -6,
                  scale: 1.02,
                  transition: { type: "spring" as const, stiffness: 400, damping: 25 }
                } : undefined}
                onClick={() => openCard(card)}
              >
                {/* Image with gradient overlay */}
                <motion.div 
                  layoutId={`card-image-${card.id}`}
                  className="relative h-48 overflow-hidden bg-muted"
                >
                  <img
                     src={card.image}
                     alt={card.title}
                     className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {card.gradientColors && (
                    <div className={cn("absolute inset-0 bg-gradient-to-t to-transparent opacity-30", card.gradientColors[0], card.gradientColors[1])}></div>
                  )}
                  
                  {/* Bookmark icon */}
                  <motion.div 
                     className="absolute top-3 right-3"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4, type: "spring" as const, stiffness: 400, damping: 25 }}
                     whileHover={{ scale: 1.15 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={(e) => toggleBookmark(card.id, e)}
                  >
                    <BookmarkIcon 
                      className={cn("w-5 h-5 transition-colors cursor-pointer text-white/80 hover:text-white", 
                        bookmarkedCards.has(card.id) && 'text-yellow-400 fill-yellow-400 text-yellow-400'
                      )} 
                    />
                  </motion.div>

                  {/* Category and subcategory */}
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="inline-block bg-[#7342E2] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1">
                      {card.subcategory}
                    </span>
                    <div className="text-[11px] opacity-75">
                      {card.timeAgo} • {card.location}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  layoutId={`card-content-${card.id}`}
                  className="p-5"
                >
                  <motion.h3 
                    layoutId={`card-title-${card.id}`}
                    className="font-bold text-base md:text-lg leading-snug line-clamp-2 text-neutral-800 dark:text-neutral-100 group-hover:text-[#7342E2] transition-colors duration-200"
                  >
                    {card.title}
                  </motion.h3>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {selectedCard && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-[999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCard}
              />
              
              {/* Expanded Card */}
              <motion.div
                layoutId={`card-${selectedCard.id}`}
                className="fixed inset-4 md:inset-10 lg:inset-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden z-[1000] shadow-2xl flex flex-col max-w-4xl mx-auto"
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center z-10 text-white cursor-pointer transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeCard}
                >
                  <X className="w-4 h-4" />
                </motion.button>

                <div className="h-full overflow-y-auto">
                  {/* Header Image */}
                  <motion.div 
                    layoutId={`card-image-${selectedCard.id}`}
                    className="relative h-64 md:h-80"
                  >
                    <img
                       src={selectedCard.image}
                       alt={selectedCard.title}
                       className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 via-transparent to-transparent"></div>
                    
                    {/* Image overlay info */}
                    <div className="absolute bottom-6 left-6 text-neutral-900 dark:text-white">
                      <span className="inline-block bg-[#7342E2] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2">
                        {selectedCard.subcategory}
                      </span>
                      <div className="text-xs opacity-75 text-neutral-600 dark:text-neutral-300">
                        {selectedCard.timeAgo} • {selectedCard.location}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    layoutId={`card-content-${selectedCard.id}`}
                    className="p-6 md:p-8"
                  >
                    <motion.h1 
                      layoutId={`card-title-${selectedCard.id}`}
                      className="text-2xl md:text-3xl font-extrabold mb-6 text-neutral-900 dark:text-white"
                    >
                      {selectedCard.title}
                    </motion.h1>
                    
                    <motion.div 
                      className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm md:text-base space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {selectedCard.content ? (
                        selectedCard.content.map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p className="mb-4">
                          No details available.
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  );
}
