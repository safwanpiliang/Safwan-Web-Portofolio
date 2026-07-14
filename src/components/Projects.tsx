"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  // Placeholder project data
  const projectsRow1 = [1, 2, 3, 4, 5];
  const projectsRow2 = [6, 7, 8, 9, 10];

  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-slate-800">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-[16px] sm:gap-[20px] md:gap-[24px] max-w-[968px] px-4 sm:px-6 text-center z-10 mb-10 sm:mb-14 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-x-[8px] sm:gap-x-[12px] md:gap-x-[16px]"
        >
          <span className="font-montserrat font-bold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">Selected</span>
          <span className="font-doto font-black text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">Project's</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-montserrat font-medium text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-slate-300 leading-relaxed"
        >
          Here are a few handpicked projects where I combine visual aesthetics with functional design to solve problems and tell stories.
        </motion.p>
      </div>

      {/* Animated Project Marquees */}
      <div className="relative w-full flex flex-col gap-[16px] sm:gap-[24px] md:gap-[32px] mb-10 sm:mb-14 md:mb-20">
        
        {/* Row 1 (Moving Left) */}
        <div className="relative flex w-full overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex gap-[12px] sm:gap-[16px] md:gap-[24px] w-[max-content] pl-[12px] sm:pl-[16px] md:pl-[24px]"
          >
            {[...projectsRow1, ...projectsRow1].map((item, idx) => (
              <div 
                key={`r1-${idx}`} 
                className="w-[240px] h-[170px] sm:w-[280px] sm:h-[200px] md:w-[400px] md:h-[300px] bg-slate-700/50 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden flex-shrink-0 border border-slate-600/30 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full bg-slate-600/20 flex items-center justify-center text-slate-500 font-doto text-xl group-hover:scale-110 transition-transform duration-700">
                  Project {item}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Moving Right) */}
        <div className="relative flex w-full overflow-hidden">
          <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            className="flex gap-[12px] sm:gap-[16px] md:gap-[24px] w-[max-content] pl-[12px] sm:pl-[16px] md:pl-[24px]"
          >
            {[...projectsRow2, ...projectsRow2].map((item, idx) => (
              <div 
                key={`r2-${idx}`} 
                className="w-[240px] h-[170px] sm:w-[280px] sm:h-[200px] md:w-[400px] md:h-[300px] bg-slate-700/50 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden flex-shrink-0 border border-slate-600/30 group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full bg-slate-600/20 flex items-center justify-center text-slate-500 font-doto text-xl group-hover:scale-110 transition-transform duration-700">
                  Project {item}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Button variant="yellow" icon={ArrowUpRight}>
          Full on Behance
        </Button>
      </motion.div>

    </section>
  );
}
