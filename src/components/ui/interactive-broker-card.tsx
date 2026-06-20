import * as React from "react";
import { Star, CheckCircle2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the props for the component
interface InteractiveBrokerCardProps {
  logoSrc: string;
  name: string;
  tradableAssets: string[];
  rating: number;
  ratingText: string;
  reviewsCount: string;
  accountsCount: string;
  learnMoreUrl: string;
  className?: string;
}

// Helper component for individual stats
const StatItem = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => (
  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <Icon className="h-3.5 w-3.5" />
    <span>{label}</span>
  </div>
);

export const InteractiveBrokerCard = ({
  logoSrc,
  name,
  tradableAssets,
  rating,
  ratingText,
  reviewsCount,
  accountsCount,
  learnMoreUrl,
  className,
}: InteractiveBrokerCardProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-2xl border bg-card p-6 text-card-foreground md:flex-row md:gap-10 md:p-8 border-neutral-200 dark:border-neutral-800/80 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      {/* Background radial gradient using the primary color variable */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[350px] w-[350px] bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/0.08)_0%,rgba(255,255,255,0)_100%)]" />

      {/* Left Content Section */}
      <div className="z-10 flex flex-col items-center text-center md:items-start md:text-left flex-1">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{name}</h2>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground">
          Offerings: {tradableAssets.join(", ")}
        </p>

        <div className="my-5 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              {rating} &bull; {ratingText}
            </span>
          </div>
          <StatItem icon={CheckCircle2} label={`${reviewsCount} Reviews`} />
          <StatItem icon={Users} label={`${accountsCount} Accounts`} />
        </div>

        <a
          href={learnMoreUrl}
          className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-5 text-xs font-bold text-neutral-700 dark:text-neutral-350 hover:bg-[#7342E2]/10 dark:hover:bg-[#7342E2]/25 hover:text-[#7342E2] dark:hover:text-[#a882fa] transition-colors duration-200"
        >
          Consult Expert
        </a>
      </div>

      {/* Right 3D Logo Section */}
      <div className="z-10 flex-shrink-0 [perspective:800px]">
        <div className="group h-36 w-56 transition-transform duration-500 ease-in-out [transform-style:preserve-3d] hover:[transform:rotateY(-20deg)_rotateX(15deg)_scale(1.05)] md:h-40 md:w-64">
          <div className="absolute h-full w-full rounded-3xl bg-neutral-900/10 dark:bg-white/10 transition-transform duration-500 ease-in-out group-hover:[transform:translateZ(-20px)]" />
          <div className="absolute h-full w-full rounded-3xl bg-neutral-900/5 dark:bg-white/5 transition-transform duration-500 ease-in-out group-hover:[transform:translateZ(-10px)]" />
          
          {/* Top layer with image */}
          <div className="absolute flex h-full w-full items-center justify-center rounded-3xl bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-800 transition-transform duration-500 ease-in-out [transform:translateZ(0)]">
            <img
              src={logoSrc}
              alt={`${name} logo`}
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
