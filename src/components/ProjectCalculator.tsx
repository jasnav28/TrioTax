import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceType = "design" | "development" | "both";
type TimelineType = "regular" | "fast" | "rush";

export default function ProjectCalculator({ theme }: { theme?: 'light' | 'dark' }) {
  const { toast } = useToast();

  // State definitions
  const [serviceType, setServiceType] = React.useState<ServiceType>("both");
  const [pages, setPages] = React.useState<number>(5);
  const [needContent, setNeedContent] = React.useState<boolean>(false);
  const [needSEO, setNeedSEO] = React.useState<boolean>(false);
  const [timeline, setTimeline] = React.useState<TimelineType>("regular");

  // Pricing calculation logic
  const calculatePrice = () => {
    let base = 499;
    let perPage = 200;

    if (serviceType === "design") {
      base = 399;
      perPage = 100;
    } else if (serviceType === "development") {
      base = 199;
      perPage = 100;
    } else if (serviceType === "both") {
      base = 499;
      perPage = 200;
    }

    let total = Math.max(base, base + (pages - 1) * perPage);
    if (needContent) total += pages * 50;
    if (needSEO) total += pages * 50;
    if (timeline === "rush") total += pages * 100;
    if (timeline === "fast") total += pages * 25;

    return total;
  };

  const calculateAgencyCost = () => {
    const isBoth = serviceType === "both";
    const perPage = isBoth ? 1000 : 400;
    return 8000 + (pages - 1) * perPage;
  };

  const calculateFreelancerCost = () => {
    const isBoth = serviceType === "both";
    const perPage = isBoth ? 500 : 200;
    return 3000 + (pages - 1) * perPage;
  };

  const handleApply = () => {
    toast({
      title: "Estimate Applied!",
      description: `Project estimate of $${calculatePrice().toLocaleString()} has been configured. Let's discuss details!`,
    });
  };

  const isDark = theme !== 'light';

  return (
    <section
      id="calculator-section"
      className={cn(
        "py-16 md:py-28 px-4 md:px-16 w-full transition-colors duration-300",
        isDark ? "bg-black text-white" : "bg-white text-neutral-900"
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl">
          <span className={cn(
            "font-mono text-xs uppercase tracking-widest transition-colors duration-300",
            isDark ? "text-neutral-500" : "text-[#7342E2]"
          )}>
            Try project estimation calculator
          </span>
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-normal mt-3 tracking-tight leading-tight transition-colors duration-300",
            isDark ? "text-white" : "text-neutral-900"
          )}>
            Get premium website within your budget
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 w-full rounded-2xl overflow-hidden border transition-colors duration-300",
          isDark ? "border-[#1E1E1E]" : "border-neutral-200"
        )}>
          {/* LEFT COLUMN: Calculator Form */}
          <div className={cn(
            "p-8 lg:p-12 divide-y flex flex-col gap-8 [&>div]:pt-8 first:pt-0 [&>div:first-child]:pt-0 transition-colors duration-300",
            isDark ? "bg-[#0D0D0D] divide-[#1E1E1E]" : "bg-neutral-50 divide-neutral-200"
          )}>
            {/* Section 1: Service Type */}
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-medium transition-colors duration-300",
                isDark ? "text-neutral-300" : "text-neutral-800"
              )}>
                What kind of service do you need?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                {/* Option 1: Design */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="radio"
                      name="serviceType"
                      value="design"
                      checked={serviceType === "design"}
                      onChange={() => setServiceType("design")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        serviceType === "design"
                          ? "border-[#FF5656]"
                          : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                      }`}
                    >
                      {serviceType === "design" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                  )}>
                    Only Design
                  </span>
                </label>

                {/* Option 2: Development */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="radio"
                      name="serviceType"
                      value="development"
                      checked={serviceType === "development"}
                      onChange={() => setServiceType("development")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        serviceType === "development"
                          ? "border-[#FF5656]"
                          : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                      }`}
                    >
                      {serviceType === "development" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                  )}>
                    Only Development
                  </span>
                </label>

                {/* Option 3: Both */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="radio"
                      name="serviceType"
                      value="both"
                      checked={serviceType === "both"}
                      onChange={() => setServiceType("both")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        serviceType === "both"
                          ? "border-[#FF5656]"
                          : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                      }`}
                    >
                      {serviceType === "both" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                  )}>
                    Design + Development
                  </span>
                </label>
              </div>
            </div>

            {/* Section 2: Number of Pages */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className={cn(
                  "text-lg font-medium transition-colors duration-300",
                  isDark ? "text-neutral-300" : "text-neutral-800"
                )}>
                  Number of Pages
                </h3>
                <span className="text-xl font-semibold text-[#FF5656]">{pages}</span>
              </div>
              <div className="py-4">
                <Slider
                  defaultValue={[5]}
                  value={[pages]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(val) => setPages(val[0])}
                />
                <div className="flex justify-between items-center text-xs text-neutral-600 mt-2 font-mono">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* Section 3: Add-ons */}
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-medium transition-colors duration-300",
                isDark ? "text-neutral-300" : "text-neutral-800"
              )}>
                Add-ons
              </h3>
              <div className="flex flex-col gap-4 pt-1">
                {/* Content Help Checkbox */}
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={needContent}
                        onChange={(e) => setNeedContent(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                          needContent
                            ? "border-[#FF5656] bg-[#FF5656]"
                            : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                        }`}
                      >
                        {needContent && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      I will need help with content
                    </span>
                  </div>
                  <span className="text-sm font-mono text-[#FF5656] font-semibold">
                    +$50/page
                  </span>
                </label>

                {/* SEO Checkbox */}
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={needSEO}
                        onChange={(e) => setNeedSEO(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                          needSEO
                            ? "border-[#FF5656] bg-[#FF5656]"
                            : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                        }`}
                      >
                        {needSEO && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      I want to optimize my website for SEO
                    </span>
                  </div>
                  <span className="text-sm font-mono text-[#FF5656] font-semibold">
                    +$50/page
                  </span>
                </label>
              </div>
            </div>

            {/* Section 4: Timeline */}
            <div className="space-y-4">
              <h3 className={cn(
                "text-lg font-medium transition-colors duration-300",
                isDark ? "text-neutral-300" : "text-neutral-800"
              )}>
                How fast do you need this?
              </h3>
              <div className="flex flex-col gap-4 pt-1">
                {/* Timeline Rush (Within 7 Days) */}
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="timeline"
                        value="rush"
                        checked={timeline === "rush"}
                        onChange={() => setTimeline("rush")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          timeline === "rush"
                            ? "border-[#FF5656]"
                            : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                        }`}
                      >
                        {timeline === "rush" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      Within 7 Days
                    </span>
                  </div>
                  <span className="text-sm font-mono text-[#FF5656] font-semibold">
                    +$100/page
                  </span>
                </label>

                {/* Timeline Fast (Within 14 Days) */}
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="timeline"
                        value="fast"
                        checked={timeline === "fast"}
                        onChange={() => setTimeline("fast")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          timeline === "fast"
                            ? "border-[#FF5656]"
                            : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                        }`}
                      >
                        {timeline === "fast" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      Within 14 Days
                    </span>
                  </div>
                  <span className="text-sm font-mono text-[#FF5656] font-semibold">
                    +$25/page
                  </span>
                </label>

                {/* Timeline Regular (Default) */}
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        name="timeline"
                        value="regular"
                        checked={timeline === "regular"}
                        onChange={() => setTimeline("regular")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          timeline === "regular"
                            ? "border-[#FF5656]"
                            : (isDark ? "border-neutral-700 bg-transparent hover:border-neutral-500" : "border-neutral-300 bg-transparent hover:border-neutral-400")
                        }`}
                      >
                        {timeline === "regular" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5656]" />
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      Regular Speed (Based on discussion)
                    </span>
                  </div>
                  <span className="text-sm font-mono text-neutral-500 font-semibold">
                    Free
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cost Estimation */}
          <div className={cn(
            "p-8 lg:p-12 flex flex-col justify-between min-h-[600px] lg:min-h-[717.98px] border-t lg:border-t-0 lg:border-l transition-colors duration-300",
            isDark ? "bg-[#121212] border-white/10" : "bg-neutral-50/50 border-neutral-200"
          )}>
            {/* Header cost info */}
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">
                Estimated Cost
              </h3>
              <p className={cn(
                "text-sm leading-relaxed transition-colors duration-300",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}>
                Compare typical market rates with our transparent pricing plan. Optimize your budget with no hidden costs.
              </p>
            </div>

            {/* Stacked Cards */}
            <div className="flex flex-col gap-4 my-8 flex-grow justify-center">
              {/* Card 1: Agency */}
              <div className={cn(
                "rounded-2xl p-5 border space-y-2 transition-all",
                isDark ? "bg-neutral-900/50 border-white/5 hover:border-neutral-800" : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm"
              )}>
                <div className="text-xs font-mono uppercase text-neutral-500">
                  Typical Agency charges minimum
                </div>
                <div className={cn(
                  "text-3xl font-bold transition-colors duration-300",
                  isDark ? "text-neutral-300" : "text-neutral-800"
                )}>
                  ${calculateAgencyCost().toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500">
                  + Too much extra time & additional cost
                </div>
              </div>

              {/* Card 2: Freelancer */}
              <div className={cn(
                "rounded-2xl p-5 border space-y-2 transition-all",
                isDark ? "bg-neutral-900/50 border-white/5 hover:border-neutral-800" : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm"
              )}>
                <div className="text-xs font-mono uppercase text-neutral-500">
                  Regular Freelancer charges minimum
                </div>
                <div className={cn(
                  "text-3xl font-bold transition-colors duration-300",
                  isDark ? "text-neutral-300" : "text-neutral-800"
                )}>
                  ${calculateFreelancerCost().toLocaleString()}
                </div>
                <div className="text-xs text-neutral-500">
                  + Too much headache & back-and-forth
                </div>
              </div>

              {/* Card 3: Your Price */}
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl shadow-orange-950/10 space-y-2 hover:scale-[1.01] transition-transform duration-300">
                <div className="text-xs font-mono uppercase opacity-75">
                  With Webfluin Studio
                </div>
                <div className="text-5xl font-black tracking-tight">
                  ${calculatePrice().toLocaleString()}
                </div>
                <div className="text-sm font-semibold opacity-90">
                  Save your money, time & headache
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <button
              onClick={handleApply}
              className={cn(
                "w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all cursor-pointer shadow-lg",
                isDark ? "bg-white text-black hover:bg-neutral-100" : "bg-[#7342E2] text-white hover:bg-[#6232d1]"
              )}
            >
              <span>Apply Estimation & Get Started</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
