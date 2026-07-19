"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export function ScrambleText({ text, duration = 1500 }: { text: string, duration?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isInView || !isClient) return;

    let start = Date.now();
    
    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      let newText = "";
      for (let i = 0; i < text.length; i++) {
        if (progress >= (i / text.length)) {
          newText += text[i];
        } else {
          newText += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      
      setDisplayText(newText);

      if (progress === 1) {
        clearInterval(intervalId);
      }
    }, 40);

    return () => clearInterval(intervalId);
  }, [isInView, isClient, text, duration]);

  return <span ref={ref}>{displayText}</span>;
}
