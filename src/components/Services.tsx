"use client";

import { motion, Variants } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

function ServiceCard({ card, idx, cardVariants }: { card: any, idx: number, cardVariants: Variants }) {
  return (
    <div className="w-full h-full relative">
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-white flex flex-col gap-[16px] items-start p-[20px] md:p-[24px] rounded-[8px] w-full h-full shadow-sm cursor-default"
      >
        <div className="flex gap-[10px] items-center w-full flex-wrap sm:flex-nowrap">
          <h3 className="font-montserrat font-bold text-[20px] sm:text-[24px] text-slate-700 whitespace-nowrap">
            {card.title}
          </h3>
          <div className="bg-[#ffab2f] px-[10px] py-[3px] rounded-[16px] flex items-center shrink-0">
            <span className="font-inter font-normal text-[12px] sm:text-[13px] text-white tracking-[0.16px]">
              {card.count}
            </span>
          </div>
        </div>
        <p className="font-montserrat font-normal text-[14px] sm:text-[16px] text-slate-700 leading-[1.5] w-full">
          {card.desc}
        </p>
      </motion.div>
    </div>
  );
}

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
          <span className="font-doto font-black text-[40px] md:text-[48px] lg:text-[64px] text-slate-100"><ScrambleText text="Build" /></span>
          <span className="font-montserrat font-bold text-[40px] md:text-[48px] lg:text-[64px] text-slate-100">together</span>
        </motion.div>

        {/* Liquid Glass Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[16px] w-full"
        >
          {cards.map((card, idx) => (
            <ServiceCard key={idx} card={card} idx={idx} cardVariants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
