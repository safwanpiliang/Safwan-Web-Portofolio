"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function NavButton({ tab, isActive, isScrolled, effectiveScroll, onClick }: { tab: { label: string, id: string }, isActive: boolean, isScrolled: boolean, effectiveScroll: any, onClick: () => void }) {
  const scrollRange = [0, 200];
  
  const bgActive = useTransform(effectiveScroll, scrollRange, ["rgba(255, 255, 255, 0.15)", "rgba(203, 213, 225, 0.4)"]);
  const textColorActive = useTransform(effectiveScroll, scrollRange, ["rgb(255, 255, 255)", "rgb(15, 23, 42)"]); // white to slate-900
  const textColorInactive = useTransform(effectiveScroll, scrollRange, ["rgb(203, 213, 225)", "rgb(71, 85, 105)"]); // slate-300 to slate-600

  const color = isActive ? textColorActive : textColorInactive;

  return (
    <motion.div className="relative rounded-[999px] flex items-center justify-center">
      {/* Background Layer */}
      <motion.div
        style={{ 
          backgroundColor: isActive ? bgActive : "transparent"
        }}
        className="absolute inset-0 rounded-[999px] pointer-events-none z-[1]"
      />
      
      {/* Content */}
      <motion.button
        onClick={onClick}
        style={{ color }}
        whileHover={{ color: isScrolled ? "rgb(15, 23, 42)" : "rgb(255, 255, 255)" }}
        className="relative z-10 flex items-center justify-center gap-[8px] px-[12px] py-[6px] md:px-[14px] md:py-[8px] rounded-[999px] font-['Inter'] font-medium text-[12px] md:text-[14px] leading-[20px] whitespace-nowrap cursor-pointer transition-colors duration-200"
      >
        {tab.label}
      </motion.button>
    </motion.div>
  );
}

export function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const { scrollY } = useScroll();
  const effectiveScroll = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        effectiveScroll.set(200);
      } else {
        effectiveScroll.set(scrollY.get());
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [effectiveScroll, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) {
      effectiveScroll.set(200);
    } else {
      effectiveScroll.set(latest);
    }
  });

  useMotionValueEvent(effectiveScroll, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const scrollRange = [0, 200];
  
  // Container
  const navPaddingPx = useTransform(effectiveScroll, scrollRange, [16, 0]);
  const navPadding = useTransform(navPaddingPx, v => `${v}px`);

  // Spacer between left and right groups
  const spacerFlex = useTransform(effectiveScroll, scrollRange, [1, 0]);

  // Group wrappers (tabs and CTA)
  const groupBg = useTransform(effectiveScroll, scrollRange, ["rgba(241, 245, 249, 0)", "rgba(241, 245, 249, 1)"]);
  const groupPaddingPx = useTransform(effectiveScroll, scrollRange, [0, 8]);
  const groupPadding = useTransform(groupPaddingPx, v => `${v}px`);

  // CTA button styles inside its wrapper
  const ctaBg = useTransform(effectiveScroll, scrollRange, ["rgba(241, 245, 249, 1)", "rgba(241, 245, 249, 0)"]);
  const ctaColor = useTransform(effectiveScroll, scrollRange, ["rgb(51, 65, 85)", "rgb(71, 85, 105)"]);
  const ctaPaddingSidePx = useTransform(effectiveScroll, scrollRange, [16, 14]);
  const ctaPaddingSide = useTransform(ctaPaddingSidePx, v => `${v}px`);
  const ctaGapPx = useTransform(effectiveScroll, scrollRange, [8, 0]);
  const ctaGap = useTransform(ctaGapPx, v => `${v}px`);

  // CTA text
  const ctaTextWidthPx = useTransform(effectiveScroll, scrollRange, [65, 0]);
  const ctaTextWidth = useTransform(ctaTextWidthPx, v => `${v}px`);
  const ctaTextOpacity = useTransform(effectiveScroll, scrollRange, [1, 0]);

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
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // If we are at the bottom of the page (within 50px), activate the last tab
      if (scrollPosition + windowHeight >= documentHeight - 50) {
        setActiveTab(tabs.length - 1);
        return;
      }

      // Otherwise, find the last section whose top is above the middle of the viewport
      let newActiveIndex = 0;
      for (let i = tabs.length - 1; i >= 0; i--) {
        const el = document.getElementById(tabs[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is above the middle of the screen
          if (rect.top <= windowHeight * 0.5) {
            newActiveIndex = i;
            break;
          }
        }
      }
      setActiveTab(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-[16px] md:top-[24px] left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        style={{
          paddingLeft: navPadding,
          paddingRight: navPadding,
        }}
        className="flex justify-center items-center w-full max-w-[1400px] pointer-events-auto"
      >
        {/* ──────── LEFT GROUP: Tab Bar ──────── */}
        <motion.div 
          style={{
            backgroundColor: groupBg,
            padding: groupPadding,
          }}
          className="relative flex items-center gap-[4px] md:gap-[15px] rounded-[999px]"
        >
          {tabs.map((tab, i) => (
            <NavButton 
              key={tab.id}
              tab={tab}
              isActive={i === activeTab}
              isScrolled={isScrolled}
              effectiveScroll={effectiveScroll}
              onClick={() => handleTabClick(i)}
            />
          ))}
        </motion.div>

        {!isMobile && (
          <>
            {/* ──────── SPACER ──────── */}
            <motion.div style={{ flexGrow: spacerFlex, minWidth: "16px" }} />

            {/* ──────── RIGHT GROUP: CTA Button ──────── */}
            <motion.div 
              style={{
                backgroundColor: groupBg,
                padding: groupPadding,
              }}
              className="flex items-center rounded-[999px]"
            >
              <motion.button
                style={{
                  backgroundColor: ctaBg,
                  color: ctaColor,
                  paddingLeft: ctaPaddingSide,
                  paddingRight: ctaPaddingSide,
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  gap: ctaGap,
                }}
                whileHover={
                  isScrolled 
                    ? { color: "rgb(15, 23, 42)" } 
                    : { backgroundColor: "rgb(226, 232, 240)" }
                }
                className="flex items-center justify-center rounded-[999px] font-['Inter'] font-medium text-[14px] leading-[20px] whitespace-nowrap cursor-pointer transition-colors duration-200 group"
              >
                <motion.span 
                  style={{ 
                    width: ctaTextWidth,
                    opacity: ctaTextOpacity,
                    overflow: "hidden", 
                    display: "block",
                    whiteSpace: "nowrap"
                  }}
                >
                  Let's talk
                </motion.span>
                <motion.div>
                  <ArrowUpRight className="w-[20px] h-[20px] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
                </motion.div>
              </motion.button>
            </motion.div>
          </>
        )}
      </motion.nav>
    </div>
  );
}
