"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ARTICLE_DATA = [
  { 
    id: 1, 
    title: "Behind the Interface: Crafting a “Digital Welcome” for UGM’s 2025 Freshmen", 
    readTime: "5 min read", 
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "#"
  },
  { 
    id: 2, 
    title: "Behind the Interface: Crafting a “Digital Welcome” for UGM’s 2025 Freshmen", 
    readTime: "5 min read", 
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "#"
  },
  { 
    id: 3, 
    title: "Behind the Interface: Crafting a “Digital Welcome” for UGM’s 2025 Freshmen", 
    readTime: "5 min read", 
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    link: "#"
  },
];

function ArticleCard({ article }: { article: any }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="bg-slate-950 rounded-[20px] md:rounded-[32px] p-[6px] md:p-[8px] pb-[12px] md:pb-[16px] flex flex-col gap-[16px] md:gap-[24px] group transition-shadow duration-300 ease-out hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-transparent hover:border-slate-800 h-full"
      >
        {/* Image Box */}
        <div 
          className="w-full h-[120px] md:h-[148px] overflow-hidden rounded-[16px] md:rounded-[24px] bg-white relative shrink-0"
        >
          <img 
            src={article.image} 
            alt={article.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
          />
        </div>

        {/* Text Content */}
        <div 
          className="flex flex-col gap-[6px] md:gap-[8px] px-[8px] flex-grow"
        >
          <p className="font-montserrat font-semibold text-[11px] md:text-[12px] leading-[normal] text-slate-400">
            {article.readTime}
          </p>
          <h3 className="font-montserrat font-semibold text-[16px] md:text-[20px] leading-[normal] text-slate-100">
            {article.title}
          </h3>
        </div>

        {/* Action Button */}
        <div 
          className="flex items-center justify-end w-full px-[8px] mt-auto shrink-0"
        >
          <a href={article.link} className="bg-[#ffab2f] text-neutral-800 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-[12px] md:px-[14px] py-[6px] md:py-[8px] rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] flex items-center gap-[6px] md:gap-[8px] hover:bg-[#e69b2a] transition-colors border border-[#ffab2f]">
            Read on Medium
            <ArrowUpRight className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Articles() {
  return (
    <section id="articles" className="relative w-full py-10 sm:py-16 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-slate-900">
      
      <div className="w-full max-w-[1400px] px-4 sm:px-6 z-10 flex flex-col gap-6 md:gap-14">
        
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-[8px] sm:gap-x-[12px] md:gap-x-[16px]"
          >
            <span className="font-montserrat text-[32px] md:text-[64px] text-slate-100 font-bold tracking-[-1px]">
              Insights & <span className="font-doto font-black"><ScrambleText text="Articles" /></span>
            </span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-slate-300 text-base md:text-lg max-w-2xl mx-auto"
          >
            Deep dives into my design process, case studies, and explorations in UI and 3D visualization.
          </motion.p>
        </div>

        {/* Article Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-[32px] justify-center items-stretch"
        >
          {ARTICLE_DATA.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-[8px] mt-4"
        >
          <button className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors text-slate-400">
            <ChevronLeft className="w-[20px] h-[20px]" />
          </button>
          
          <button className="bg-slate-100 text-slate-700 font-inter font-medium text-[14px] leading-[20px] px-[14px] py-[8px] rounded-full shadow-sm">
            1
          </button>
          <button className="bg-slate-300/25 text-slate-100 font-inter font-medium text-[14px] leading-[20px] px-[14px] py-[8px] rounded-full hover:bg-slate-300/40 transition-colors">
            2
          </button>

          <button className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors text-slate-400">
            <ChevronRight className="w-[20px] h-[20px]" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
