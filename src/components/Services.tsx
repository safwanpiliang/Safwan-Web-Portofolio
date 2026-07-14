"use client";

import { motion, Variants } from "framer-motion";

export function Services() {
  const cards = [
    { title: "UI/UX Design", count: "6 Websites", desc: "Designing beautiful, accessible, and easy-to-use layouts for websites and mobile apps, ensuring your audience has a seamless and engaging digital experience." },
    { title: "Graphic Design", count: "12 Projects", desc: "Crafting visually compelling graphics that communicate your brand's message clearly and creatively across various digital and print media." },
    { title: "3D Modeling", count: "4 Models", desc: "Creating immersive 3D models and environments using Blender to elevate product presentations and visual storytelling." },
    { title: "Web Development", count: "8 Sites", desc: "Building responsive, fast, and scalable websites using modern technologies like React, Next.js, and Tailwind CSS." },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full pb-8 md:pb-16 px-[30px] md:px-4 flex flex-col items-center justify-center bg-transparent z-10">

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1216px] flex flex-col items-center gap-[8px] md:gap-[24px]">

        {/* Figma mobile: 40px heading, "Let's Build" on line 1, "together" on line 2 */}
        {/* Desktop: 64px inline */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center w-full flex flex-wrap justify-center gap-x-[8px] md:gap-x-[16px] items-center mb-0 md:mb-8"
        >
          <span className="font-montserrat font-bold text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">Let&apos;s</span>
          <span className="font-doto font-black text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">Build</span>
          <span className="font-montserrat font-bold text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">together</span>
        </motion.div>

        {/* Figma mobile: single column, transparent cards, p-[18px], rounded-[6px] */}
        {/* Desktop: 2-col grid, glass cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[16px] w-full"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                borderColor: "rgba(148, 163, 184, 0.2)"
              }}
              className="flex flex-col gap-[12px] md:gap-[16px] items-start p-[18px] md:p-[24px] rounded-[6px] md:rounded-[16px] bg-transparent md:bg-white/10 border-0 md:border md:border-white/10 md:backdrop-blur-lg md:shadow-xl transition-colors cursor-default"
            >
              <div className="flex gap-[7px] md:gap-[10px] items-center w-full">
                {/* Figma mobile: 18px / Desktop: 24px */}
                <h3 className="font-montserrat font-bold text-[18px] md:text-[24px] text-slate-100 whitespace-nowrap">
                  {card.title}
                </h3>
                {/* Figma mobile: chip ~10px white text / Desktop: 13px dark text */}
                <div className="bg-[#ffab2f] px-[7px] py-[2px] md:px-[8px] md:py-[4px] rounded-full flex items-center justify-center shadow-sm">
                  <span className="font-inter font-normal md:font-medium text-[10px] md:text-[13px] text-white md:text-slate-900 tracking-[0.16px]">
                    {card.count}
                  </span>
                </div>
              </div>
              {/* Figma mobile: 12px / Desktop: 16px */}
              <p className="font-montserrat text-[12px] md:text-[16px] text-slate-100 md:text-slate-300 leading-normal md:leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
