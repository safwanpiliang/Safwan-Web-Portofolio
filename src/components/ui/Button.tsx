"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "white" | "ghost" | "yellow";
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = "white",
  icon: Icon,
  onClick,
  className = "",
}: ButtonProps) {
  // Figma mobile: px-[14px] py-[8px], 14px Inter Medium, leading-[20px]
  // Desktop: px-[18px] py-[10px], 16px, leading-[24px]
  const baseStyles =
    "flex gap-[6px] md:gap-[8px] items-center justify-center overflow-hidden px-[12px] py-[6px] md:px-[18px] md:py-[10px] relative rounded-[999px] font-inter font-medium leading-[18px] md:leading-[24px] text-[12px] md:text-[16px] whitespace-nowrap transition-colors";

  const variants = {
    white: "bg-slate-100 text-slate-700 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-slate-100 hover:bg-white",
    ghost: "bg-[rgba(248,250,252,0.25)] text-slate-700 hover:bg-slate-50/40",
    yellow: "bg-[#ffab2f] text-[#333] border border-[#ffab2f] shadow-sm hover:bg-[#ffb74d] md:px-[28px] md:py-[16px] md:text-[18px]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon className="w-[20px] h-[20px]" />}
    </motion.button>
  );
}
