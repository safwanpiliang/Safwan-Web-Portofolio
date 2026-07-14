"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Navbar — iOS 26+ Liquid Glass Effect
 * 
 * Architecture inspired by CYLTabBarController's native platter system:
 *   PlatterView (container)
 *     └─ LiquidLensBackdropView  (backdrop-filter: blur — the frosted layer)
 *     └─ LiquidLensClearGlassView (specular border + inset glow — the glass surface)
 *     └─ ContentView (tab buttons — crisp text, no filter distortion)
 * 
 * The SVG displacement filter is applied ONLY to the BackdropView,
 * keeping all text 100% sharp (matching CYLTabBarController's approach
 * of separating the liquid lens from the content view).
 * 
 * Design spec from Figma:
 *   Mobile (390px): 302×52, top-[63px], centered, pill tabs only (no CTA)
 *   Desktop (md+): Left group + "Let's talk" CTA button
 */
export function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { label: "Home", id: "home" },
    { label: "My Works", id: "works" },
    { label: "About me", id: "about" },
  ];

  // Scroll-to-section on tab click
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const sectionIds = ["hero", "projects", "about"];
    const el = document.getElementById(sectionIds[index]);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Update active tab on scroll
  useEffect(() => {
    const sectionIds = ["hero", "projects", "about"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveTab(index);
            }
          }
        });
      },
      {
        // Trigger when the section reaches the upper 30% to 70% of the screen
        rootMargin: "-30% 0px -70% 0px"
      }
    );

    // Slight delay to ensure DOM is fully painted with IDs
    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
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
      {/* ═══════════════ SVG FILTER (global, rendered once) ═══════════════ */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id="liquid-glass-refraction">
            {/* Very subtle Perlin noise for gentle liquid shimmer */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.005 0.009"
              numOctaves="1"
              result="noise"
            >
              {/* Slow animated shimmer — barely perceptible, like real glass */}
              <animate
                attributeName="baseFrequency"
                values="0.005 0.009; 0.005 0.009; 0.005 0.009"
                dur="20s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            {/* scale=2 — extremely subtle refraction, clean and clear */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
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
        <div className="relative rounded-[999px]">
          {/* 
            Layer 1: LiquidLensBackdropView
            The frosted blur layer that refracts content behind it.
            This is the ONLY element that receives the SVG displacement filter.
          */}
          <div
            ref={backdropRef}
            className="absolute inset-0 rounded-[999px] backdrop-blur-[1px] will-change-transform"
            style={{
              filter: "url(#liquid-glass-refraction)",
              WebkitBackdropFilter: "blur(10px)",
              transform: "translateZ(0)",
            }}
          />

          {/* 
            Layer 2: LiquidLensClearGlassView
            The specular glass surface — semi-transparent bg, satin border, 
            inset highlight shadow. NO SVG filter on this layer.
          */}
          <div
            className="absolute inset-0 rounded-[999px]"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow:
                "0 4px 16px 0 rgba(0, 0, 0, 0.10), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
            }}
          />

          {/* 
            Layer 3: ContentView  
            The actual tab buttons. No filter, no blur — 100% crisp text.
            Matches Figma: gap-[15px], p-[8px]
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
                    : "bg-transparent drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] hover:bg-[rgba(248,250,252,0.10)]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ──────── RIGHT GROUP: CTA Button — hidden on mobile per Figma ──────── */}
        <div className="hidden md:flex items-center p-[8px]">
          <button
            className={[
              "flex items-center justify-center gap-[8px]",
              "px-[14px] py-[8px] rounded-[999px]",
              "bg-[#f1f5f9] border border-[#f1f5f9]",
              "shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]",
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
