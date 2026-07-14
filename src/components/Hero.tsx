"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "./ui/Button";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  // Stagger variants for the main text elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    // Mobile: Auto height with balanced padding so the hill image is visible in the first frame
    // Desktop: auto height
    <section className="relative w-full pt-[180px] md:pt-[300px] pb-[150px] md:pb-[50px] lg:pb-[70px] flex flex-col items-center justify-center md:justify-start z-20">

      {/* Decorative Parallax Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-white/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-white/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center gap-[17px] md:gap-[32px] px-4 md:px-6"
      >
        {/* Text block */}
        <motion.div variants={itemVariants} className="flex flex-col gap-[4px] md:gap-[8px] items-center text-center tracking-[0.33px] md:tracking-[0.6px]">
          {/* Figma mobile: 12px / Desktop: 20px */}
          <p className="font-montserrat text-[12px] md:text-[20px] text-white">
            Hi, Im <span className="font-semibold">Safwan Piliang!</span>
          </p>

          {/* Figma mobile: 48px stacked column / Desktop: 64px inline wrap */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-x-[12px] gap-y-[3px] md:gap-y-[4px] items-center text-[48px] md:text-[48px] lg:text-[72px] text-slate-100 tracking-[0.2px]">
            <motion.p
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="font-montserrat font-bold cursor-default leading-[1.2]"
            >
              Crafting
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="font-doto font-black cursor-default text-white leading-[1.2]"
            >
              Digital
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="font-montserrat font-bold cursor-default leading-[1.2]"
            >
              Experience
            </motion.p>
          </div>

          {/* Figma mobile: 16px / Desktop: 36px */}
          <p className="font-montserrat font-medium text-[16px] md:text-[24px] lg:text-[36px] text-slate-100 tracking-[0.2px]">
            across <span className="font-semibold">UI</span>, <span className="font-semibold">Graphic Design</span>, and <span className="font-semibold">3D</span>
          </p>
        </motion.div>

        {/* Figma mobile: buttons full-width, stacked vertically, gap-[10px] */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:flex-wrap justify-center gap-[10px] md:gap-[16px] w-full max-w-[283px] md:max-w-none md:w-auto">
          <Button variant="white" icon={ChevronDown} className="w-full md:w-auto justify-center">
            Explore My Work
          </Button>
          <Button variant="ghost" icon={ArrowUpRight} className="w-full md:w-auto justify-center bg-white/25 text-slate-700 hover:bg-white/40">
            Download CV
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
