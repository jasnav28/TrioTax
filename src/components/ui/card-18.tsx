import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import type { Variants, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// CVA for card variants
const cardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-neutral-200 dark:border-neutral-800/80',
  {
    variants: {
      variant: {
        default: 'p-6',
        featured: 'flex-col md:flex-row min-h-[380px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Interface for component props
export interface BlogPostCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'>, VariantProps<typeof cardVariants> {
  tag: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  readMoreText?: string;
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  ({ className, variant, tag, date, title, description, imageUrl, href, readMoreText = 'Read the full article', ...props }, ref) => {
    
    // Animation variants for framer-motion with explicit Typescript support
    const cardHover: Variants = {
      hover: {
        y: -5,
        transition: {
          duration: 0.2,
          ease: 'easeInOut' as const,
        },
      },
    };
    
    const content = (
      <>
        {variant === 'featured' && imageUrl && (
          <div className="relative w-full overflow-hidden md:w-1/2 lg:w-3/5 min-h-[220px] md:min-h-full">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-103"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
          <div>
            <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase text-muted-foreground">
              <span className="rounded-full bg-[#7342E2]/10 px-3 py-1 text-[#7342E2] dark:text-[#a882fa]">{tag}</span>
              <span>{date}</span>
            </div>

            <h3 className="mb-3 text-xl font-bold leading-tight text-foreground lg:text-2xl">
              <span className="bg-gradient-to-r from-[#7342E2] to-[#7342E2] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {title}
              </span>
            </h3>
            
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>

          {variant === 'featured' && (
            <div className="mt-8">
                <Button variant="default" className="group/button bg-[#7342E2] hover:bg-[#6232d1] text-white rounded-xl">
                    {readMoreText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Button>
            </div>
          )}
        </div>
      </>
    );

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        variants={cardHover}
        whileHover="hover"
        {...props}
      >
        <a href={href} className="absolute inset-0 z-10" aria-label={`Read more about ${title}`}>
          <span className="sr-only">Read More</span>
        </a>
        <div className="relative z-0 flex h-full w-full flex-col md:flex-row">{content}</div>
      </motion.div>
    );
  }
);

BlogPostCard.displayName = 'BlogPostCard';

export { BlogPostCard };
