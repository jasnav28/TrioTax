"use client";

import {
  BentoGridWithFeatures,
  type BentoFeature,
} from "@/components/ui/bento-grid";

const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
};

export default function BentoGridDemo() {
  const timeOfDayGreeting = getTimeOfDayGreeting();

  const features: BentoFeature[] = [
    {
      id: "1",
      title: "Ali Imam",
      description: `${timeOfDayGreeting} I am Ali, an experienced Design Engineer. Learn more about me.`,
      content: <SkeletonAbout />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-2 border-b md:border-r border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "2",
      title: "UI",
      description:
        "Discover beautifully crafted typefaces for every creative project — from modern displays to.",
      content: <div className="bg-purple-100 dark:bg-purple-950/20 dark:border dark:border-purple-900/30 mt-6 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-2 border-b lg:border-r border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "3",
      title: "Agency",
      description:
        "Get agency-level designs without the agency price. A flat monthly rate for all your design needs.",
      content: <div className="bg-blue-100 dark:bg-blue-950/20 dark:border dark:border-blue-900/30 mt-6 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-6 md:border-b lg:border-r-0 lg:col-span-2 border-b border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "4",
      title: "",
      description: "",
      content: <div className="bg-green-100 dark:bg-green-950/20 dark:border dark:border-green-900/30 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-6 lg:col-span-6 border-b lg:border-r-0 border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "5",
      title: "Graphic",
      description: `Discover the essence of creativity in our exquisite collection of top-tier abstract design assets. View all Graphics.`,
      content: <div className="bg-yellow-100 dark:bg-yellow-950/20 dark:border dark:border-yellow-900/30 mt-6 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-2 md:border-r border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "6",
      title: "Fonts",
      description:
        "Discover beautifully crafted typefaces for every creative project — from modern displays to vintage-inspired lettering.",
      content: <div className="bg-orange-100 dark:bg-orange-950/20 dark:border dark:border-orange-900/30 mt-6 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-2 lg:border-r border-neutral-200 dark:border-neutral-800",
    },
    {
      id: "7",
      title: "Visuals",
      description:
        "Discover beautifully websites for design and project — from modern displays to vintage-inspired designs. View all Visuals.",
      content: <div className="bg-red-100 dark:bg-red-950/20 dark:border dark:border-red-900/30 mt-6 rounded-xl h-50 w-full" />,
      className:
        "col-span-1 md:col-span-6 lg:border-r-0 lg:col-span-2 border-neutral-200 dark:border-neutral-800",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 p-8 transition-colors duration-300">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Bento Grid
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A flexible bento grid layout for showcasing your work and services
        </p>
      </div>
      <BentoGridWithFeatures features={features} />
    </div>
  );
}

const SkeletonAbout = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="group flex h-full w-full">
        <div className="relative mt-4 w-full">
          <div className="group inline-block w-full text-center">
            <div
              className="border-border-primary w-full rounded-xl border p-2 transition-all duration-500 ease-out group-hover:border-[#fff200]"
              style={{ height: 208 }}
            >
              <div
                className="grid h-full place-items-center rounded-lg border-2 border-[#fff200] bg-[#EDEEF0]"
                style={{ boxShadow: "10px 10px 1.5px 0px #fff200 inset" }}
              ></div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
            alt="person 1"
            className="absolute top-1 left-1 h-[200px] w-40 -rotate-[6deg] rounded-lg object-cover shadow-sm transition-all duration-500 group-hover:scale-95 group-hover:rotate-[0deg]"
          />
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
            alt="person 2"
            className="absolute top-1 right-24 h-[200px] w-40 rotate-[5deg] rounded-lg object-cover shadow-sm transition-all duration-500 group-hover:scale-95 group-hover:rotate-[0deg]"
          />
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
            alt="person 3"
            className="absolute top-1 right-1 h-[200px] w-40 -rotate-[6deg] rounded-lg object-cover shadow-sm transition-all duration-500 group-hover:scale-95 group-hover:rotate-[0deg]"
          />
        </div>
      </div>
    </div>
  );
};
