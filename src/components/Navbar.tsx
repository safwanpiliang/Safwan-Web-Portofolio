"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLiquidGlass } from "../lib/useLiquidGlass";

/**
 * Navbar — iOS 26+ Liquid Glass Effect
 * 
 * Rebuilt using dynamic Liquid Glass Canvas Refraction map generation.
 */
export function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);


  // Hook for Liquid Glass effect dynamically sizing with the nav platter
  const { filterData, blurAmount, specularOpacity, specularSaturation } = useLiquidGlass(backdropRef, {
    borderRadius: 9999,    // Match pill shape (rounded-[999px])
    glassThickness: 80,    // Defines how much it magnifies/refracts
    bezelWidth: 20,        // Adjust edge bevel size for smaller height of navbar
    refractiveIndex: 2.0,  // Subtle distortion for better readability
    blurAmount: 1.5,       // Subtle blur
    specularOpacity: 0.5,  // Intensity of the gloss highlights
    specularSaturation: 4, // Colors boosted in specular layer
    scaleRatio: 1.0,
    surfaceShape: "convex_squircle",
  });

  const tabs = [
    { label: "Home", id: "hero" },
    { label: "My Works", id: "projects" },
    { label: "About me", id: "about" },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const el = document.getElementById(tabs[index].id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = tabs.findIndex(t => t.id === entry.target.id);
            if (index !== -1) {
              setActiveTab(index);
            }
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    const timeoutId = setTimeout(() => {
      tabs.forEach((tab) => {
        const el = document.getElementById(tab.id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ═══════════════ SVG FILTER (dynamic from Liquid Glass) ═══════════════ */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
        colorInterpolationFilters="sRGB"
      >
        <defs>
          {filterData ? (
            <filter id="liquid-glass-refraction" x="0%" y="0%" width="100%" height="100%">
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

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-1/2 -translate-x-1/2 top-[16px] md:top-[24px] z-50 flex items-center gap-[16px]"
      >
        {/* ──────── LEFT GROUP: PlatterView (Tab Bar) ──────── */}
        <div className="relative rounded-[999px] shadow-none">
          {/* 
            Layer 1: LiquidLensBackdropView
            The frosted blur layer that refracts content behind it.
          */}
          <div
            ref={backdropRef}
            className="absolute inset-0 rounded-[999px]"
            style={{
              // Fallback to standard blur before canvas calculates displacement map
              backdropFilter: filterData ? "url(#liquid-glass-refraction)" : "blur(20px)",
              WebkitBackdropFilter: filterData ? "url(#liquid-glass-refraction)" : "blur(20px)",
              willChange: "transform, backdrop-filter",
              transform: "translateZ(0)",
              isolation: "isolate",
            }}
          />

          {/* 
            Layer 1.5: Tint Layer 
            Subtle color overlay + inner shadow for glass reflection
          */}
          <div
            className="absolute inset-0 rounded-[999px] pointer-events-none z-[1]"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              boxShadow: "inset 0 0 20px -5px rgba(255, 255, 255, 0.45)",
            }}
          />

          {/* 
            Layer 3: ContentView  
            The actual tab buttons. No filter, no blur — 100% crisp text.
          */}
          <div className="relative z-10 flex items-center gap-[15px] p-[8px]">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(i)}
                className={[
                  "flex items-center justify-center gap-[8px]",
                  "px-[14px] py-[8px] rounded-[999px]",
                  "font-['Inter'] font-medium text-[14px] leading-[20px]",
                  "text-[#f1f5f9] whitespace-nowrap",
                  "transition-colors duration-200 cursor-pointer",
                  i === activeTab
                    ? "bg-[rgba(248,250,252,0.25)]"
                    : "bg-transparent drop-shadow-[0px_1px_1px_rgba(16,24,40,0.0)] hover:bg-[rgba(248,250,252,0.10)]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ──────── RIGHT GROUP: CTA Button ──────── */}
        <div className="hidden md:flex items-center p-[8px]">
          <button
            className={[
              "flex items-center justify-center gap-[8px]",
              "px-[14px] py-[8px] rounded-[999px]",
              "bg-[#f1f5f9] border border-[#f1f5f9]",
              "shadow-none",
              "font-['Inter'] font-medium text-[14px] leading-[20px]",
              "text-[#334155] whitespace-nowrap",
              "hover:bg-white transition-colors duration-200 cursor-pointer",
              "group",
            ].join(" ")}
          >
            Lets talk
            <ArrowUpRight className="w-[20px] h-[20px] text-[#334155] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
