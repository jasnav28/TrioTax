"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = ({ checked = false, onCheckedChange }: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state with external checked updates
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <motion.button
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-[#7342E2]",
        isChecked ? "bg-zinc-200 border border-zinc-300" : "bg-zinc-800 border border-zinc-700/50 shadow-inner"
      )}
    >
      <motion.span
        className={cn(
          "relative inline-block h-5 w-5 rounded-full shadow-md flex items-center justify-center transition-colors duration-200",
          isChecked ? "bg-yellow-300" : "bg-zinc-950"
        )}
        animate={{
          x: isChecked ? 22 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
          bounce: 0,
        }}
      >
        {isChecked && (
          <motion.div
            className="absolute h-full w-full z-0 rounded-full bg-yellow-500 blur-md opacity-70 pointer-events-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.1 }}
          />
        )}
      </motion.span>
    </motion.button>
  );
};

export default Switch;
