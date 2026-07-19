"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const RANDOM_MESSAGES = [
  "Wah, UI-nya keren banget!",
  "Desain portofolio yang rapih \uD83D\uDD25",
  "Transisi 3D-nya smooth abis",
  "Nice work Safwan!",
  "Inspiratif sekali desainnya",
  "Interaksinya dapet banget!",
  "Boleh minta file figmanya? hehe"
];

interface FakeCursorProps {
  cursorImage?: string;
  cursorArrowImage?: string;
  messages?: string[];
  themeColor?: string;
  initialDelay?: number;
}

export function FakeCursor({
  cursorImage = "/source_image/Cursor%20Safwan.svg",
  cursorArrowImage = "/source_image/Cursor%20Safwan%20Arrow.svg",
  messages = RANDOM_MESSAGES,
  themeColor = "#4F46E5",
  initialDelay = 0,
}: FakeCursorProps) {
  const controls = useAnimation();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Initialize window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowSize.width === 0) return;

    let isMounted = true;
    
    // Start at a random position instead of always the middle, 
    // so multiple cursors don't overlap initially
    let currentX = Math.random() * windowSize.width;
    let currentY = windowSize.height / 2 + (Math.random() - 0.5) * 400;

    const moveCursorRandomly = async () => {
      // Start hidden
      await controls.set({
        x: currentX,
        y: currentY,
        opacity: 0,
      });

      // Initial delay so they don't both appear exactly at the same time
      if (initialDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, initialDelay));
      }
      if (!isMounted) return;

      // Fade in
      await controls.start({ opacity: 1, transition: { duration: 1 } });

      while (isMounted) {
        // Random target coordinates within the current viewport (accounting for scroll)
        const scrollY = window.scrollY;
        const nextX = Math.random() * (windowSize.width - 100);
        const nextY = scrollY + Math.random() * (windowSize.height - 100);

        // Add a control point to create a curved human-like movement
        const midX = (currentX + nextX) / 2 + (Math.random() - 0.5) * 400;
        const midY = (currentY + nextY) / 2 + (Math.random() - 0.5) * 400;

        // Random move duration (0.8s to 2s)
        const duration = 0.8 + Math.random() * 1.2;

        await controls.start({
          x: [currentX, midX, nextX],
          y: [currentY, midY, nextY],
          transition: { duration, ease: "easeInOut", times: [0, 0.5, 1] },
        });

        currentX = nextX;
        currentY = nextY;

        // Determine next action: pause, or type a message?
        if (Math.random() > 0.6) {
          setIsTyping(true);
          setDisplayedText("");
          
          // Initial pause before typing
          await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));
          if (!isMounted) break;

          const fullMessage = messages[Math.floor(Math.random() * messages.length)];
          
          // Simulate live typing letter by letter
          for (let i = 0; i <= fullMessage.length; i++) {
            setDisplayedText(fullMessage.substring(0, i));
            // Random typing speed per letter (30ms to 120ms)
            const typingSpeed = 30 + Math.random() * 90;
            await new Promise((resolve) => setTimeout(resolve, typingSpeed));
            if (!isMounted) break;
          }

          // Wait for the user to "read" the message
          const chattingDuration = 2500 + Math.random() * 1500;
          await new Promise((resolve) => setTimeout(resolve, chattingDuration));
          if (!isMounted) break;

          setIsTyping(false);
          setDisplayedText("");
        } else {
          // Just pause
          const pause = 200 + Math.random() * 1300;
          await new Promise((resolve) => setTimeout(resolve, pause));
        }
      }
    };

    moveCursorRandomly();

    return () => {
      isMounted = false;
    };
  }, [windowSize, controls, messages, initialDelay]);

  if (windowSize.width === 0 || windowSize.width < 768) return null;

  return (
    <motion.div
      animate={controls}
      className="absolute top-0 left-0 z-[9999] pointer-events-none drop-shadow-[1px_2px_2px_rgba(0,0,0,0.3)] flex flex-col items-start"
    >
      <img
        src={isTyping ? cursorArrowImage : cursorImage}
        alt="Other User Cursor"
        className="w-[90px] h-auto relative z-10"
      />
      
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            style={{ backgroundColor: themeColor }}
            className="absolute top-[20px] left-[19px] z-20 text-white text-[14px] px-[14px] py-[8px] rounded-r-2xl rounded-bl-2xl whitespace-nowrap font-inter font-medium shadow-md flex items-center min-h-[36px]"
          >
            <span>{displayedText}</span>
            <motion.span 
               animate={{ opacity: [1, 0] }} 
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="w-[2px] h-[14px] bg-white ml-[3px] rounded-full" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
