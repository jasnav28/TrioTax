import { useState, useEffect } from "react";
import { InteractiveBrokerCard } from "@/components/ui/interactive-broker-card";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MinimalistHeroDemo({ theme: _theme }: { theme?: 'light' | 'dark' }) {
  const [activeIdx, setActiveIdx] = useState(0);

  // The 8 key strengths
  const strengths = [
    {
      name: "Business Startup Setup",
      logoSrc: "/BSS.webp",
      tradableAssets: ["Private Limited", "OPC Setup", "LLP Registration", "Partnership"],
      rating: 4.9,
      ratingText: "Excellent",
      reviewsCount: "1.8K",
      accountsCount: "12K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Basic Registrations & License",
      logoSrc: "/BRL.webp",
      tradableAssets: ["GST Registration", "MSME/Udyam", "Shop Act", "FSSAI Food License"],
      rating: 4.8,
      ratingText: "Top Rated",
      reviewsCount: "920",
      accountsCount: "8K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Non Profit Entities (NGO)",
      logoSrc: "/NPE.webp",
      tradableAssets: ["Section 8 Company", "Charitable Trust", "12A & 80G", "NGO Darpan"],
      rating: 4.9,
      ratingText: "Outstanding",
      reviewsCount: "430",
      accountsCount: "3K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Income Tax & GST Filings",
      logoSrc: "/ITG.webp",
      tradableAssets: ["GSTR-1 & 3B", "ITR-1 to 7 Filing", "Tax Audit", "TDS Returns"],
      rating: 4.9,
      ratingText: "Flawless",
      reviewsCount: "2.4K",
      accountsCount: "15K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Labour Laws & Payroll",
      logoSrc: "/LLP.webp",
      tradableAssets: ["PF & ESIC Setup", "Monthly Payroll", "PT Returns", "Wage Compliance"],
      rating: 4.8,
      ratingText: "Very Good",
      reviewsCount: "750",
      accountsCount: "6K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Company/LLP Compliance",
      logoSrc: "/CLC.webp",
      tradableAssets: ["Annual ROC Filings", "AOC-4 & MGT-7", "Board Resolutions", "AGMs"],
      rating: 4.9,
      ratingText: "Trusted",
      reviewsCount: "1.1K",
      accountsCount: "9K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Conversion / Winding Up",
      logoSrc: "/CWU.webp",
      tradableAssets: ["LLP Conversion", "Pvt Ltd Upgrades", "FTE Strike-Off", "Winding Up"],
      rating: 4.7,
      ratingText: "Reliable",
      reviewsCount: "310",
      accountsCount: "2.5K+",
      learnMoreUrl: "#contact"
    },
    {
      name: "Trademark & IPR Services",
      logoSrc: "/TIS.webp",
      tradableAssets: ["Brand Name Search", "Trademark Filing", "Logo Copyright", "IPR Renewals"],
      rating: 4.9,
      ratingText: "Secure",
      reviewsCount: "670",
      accountsCount: "5.5K+",
      learnMoreUrl: "#contact"
    }
  ];

  // Auto slideshow effect changing slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % strengths.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [strengths.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + strengths.length) % strengths.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % strengths.length);
  };

  return (
    <div 
      className="w-full py-20 md:py-28 flex flex-col items-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/asas.webp')" }}
    >
      {/* Black filter overlay */}
      <div className="absolute inset-0 bg-black/65 dark:bg-black/85 z-0 pointer-events-none transition-colors duration-300" />

      {/* Top fade-in gradient to blend with previous section */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-white dark:from-black to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Bottom fade-out gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white dark:from-black to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Relative wrapper to ensure content renders on top of background & overlay filter */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Our Key Strength Title Section */}
        <div className="text-center mb-10">
          <AnimatedText
            text="Our Key Strength"
            textClassName="text-3xl md:text-5xl font-bold tracking-tight text-white transition-colors duration-300"
            underlineClassName="text-[#7342E2]"
            underlineDuration={1.8}
          />
          <p className="mt-6 text-sm md:text-base max-w-md mx-auto px-4 text-neutral-300 transition-colors duration-300">
            We help you navigate the complexities of starting, growing, and managing your business.
          </p>
        </div>

        {/* Slide Container displaying exactly ONE card at a time */}
        <div className="w-full max-w-4xl px-6 md:px-12 flex flex-col items-center justify-center relative">
          <div className="relative w-full overflow-visible min-h-[380px] md:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex justify-center"
              >
                <InteractiveBrokerCard
                  name={strengths[activeIdx].name}
                  logoSrc={strengths[activeIdx].logoSrc}
                  tradableAssets={strengths[activeIdx].tradableAssets}
                  rating={strengths[activeIdx].rating}
                  ratingText={strengths[activeIdx].ratingText}
                  reviewsCount={strengths[activeIdx].reviewsCount}
                  accountsCount={strengths[activeIdx].accountsCount}
                  learnMoreUrl={strengths[activeIdx].learnMoreUrl}
                  className="w-full bg-white dark:bg-neutral-900/40"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Slide Navigation Controls */}
          <div className="flex items-center gap-6 mt-8 z-10">
            <button
              onClick={handlePrev}
              className="h-10 w-10 bg-white dark:bg-neutral-900 hover:bg-[#7342E2]/10 hover:text-[#7342E2] dark:hover:text-[#a882fa] text-neutral-800 dark:text-neutral-200 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous strength"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Inline dot indicators */}
            <div className="flex items-center gap-2">
              {strengths.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    idx === activeIdx 
                      ? "bg-[#7342E2] w-5" 
                      : "bg-white/30 hover:bg-white/60 w-2"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="h-10 w-10 bg-white dark:bg-neutral-900 hover:bg-[#7342E2]/10 hover:text-[#7342E2] dark:hover:text-[#a882fa] text-neutral-800 dark:text-neutral-200 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next strength"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
