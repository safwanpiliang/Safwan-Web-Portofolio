"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { useLiquidGlass } from "../lib/useLiquidGlass";

function ServiceCard({ card, idx, cardVariants }: { card: any, idx: number, cardVariants: Variants }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const filterId = `liquid-glass-services-${idx}`;

  // Use a smaller bezel and radius for cards compared to the navbar
  const { filterData, blurAmount, specularOpacity, specularSaturation } = useLiquidGlass(backdropRef, {
    borderRadius: 16,      // Card corner radius
    glassThickness: 50,    // Refraction intensity
    bezelWidth: 15,        // Edge bevel
    refractiveIndex: 1.8,  // Less distortion for card text readability
    blurAmount: 1.5,       // Increased blur for a more frosted glass look
    specularOpacity: 0.3,
    specularSaturation: 2,
    scaleRatio: 1.0,
    surfaceShape: "convex_squircle",
  });

  return (
    <div className="w-full h-full relative">
      {/* SVG FILTER for this specific card */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
        colorInterpolationFilters="sRGB"
      >
        <defs>
          {filterData ? (
            <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blurred_source" />
              <feImage href={filterData.dispUrl} x="0" y="0" width={filterData.w} height={filterData.h} result="disp_map" />
              <feDisplacementMap
                in="blurred_source"
                in2="disp_map"
                scale={filterData.scale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feColorMatrix in="displaced" type="saturate" values={String(specularSaturation)} result="displaced_sat" />
              <feImage href={filterData.specUrl} x="0" y="0" width={filterData.w} height={filterData.h} result="spec_layer" />
              <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
              <feComponentTransfer in="spec_layer" result="spec_faded">
                <feFuncA type="linear" slope={specularOpacity} />
              </feComponentTransfer>
              <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
              <feBlend in="spec_faded" in2="with_sat" mode="normal" />
            </filter>
          ) : null}
        </defs>
      </svg>

      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="relative flex flex-col items-start rounded-[16px] shadow-lg transition-transform cursor-default h-full w-full"
      >
        {/* Layer 1: Liquid Lens Backdrop */}
        <div
          ref={backdropRef}
          className="absolute inset-0 rounded-[16px] will-change-transform"
          style={{
            backdropFilter: filterData ? `url(#${filterId})` : "blur(20px)",
            WebkitBackdropFilter: filterData ? `url(#${filterId})` : "blur(20px)",
            transform: "translateZ(0)",
            isolation: "isolate",
          }}
        />

        {/* Layer 1.5: Tint and Specular Border */}
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none z-[1]"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "inset 0 0 15px -5px rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />

        {/* Layer 2: Content */}
        <div className="relative z-10 flex flex-col gap-[12px] md:gap-[16px] p-[18px] md:p-[24px]">
          <div className="flex gap-[7px] md:gap-[10px] items-center w-full">
            <h3 className="font-montserrat font-bold text-[18px] md:text-[24px] text-slate-100 whitespace-nowrap">
              {card.title}
            </h3>
            <div className="bg-[#ffab2f] px-[7px] py-[2px] md:px-[8px] md:py-[4px] rounded-full flex items-center justify-center shadow-sm">
              <span className="font-inter font-normal md:font-medium text-[10px] md:text-[13px] text-white md:text-slate-900 tracking-[0.16px]">
                {card.count}
              </span>
            </div>
          </div>
          <p className="font-montserrat text-[12px] md:text-[16px] text-slate-100 md:text-slate-300 leading-normal md:leading-relaxed">
            {card.desc}
          </p>
        </div>
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
