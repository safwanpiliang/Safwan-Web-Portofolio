"use client";

import { motion } from "framer-motion";

export function ClientLogos() {
  const row1 = [
    { alt: "Logo UGM", src: "/source_image/Logo UGM.svg", aspectClass: "aspect-[218/62]" },
    { alt: "Logo PIONIR", src: "/source_image/Logo PIONIR.svg", aspectClass: "aspect-[228/62]" },
    { alt: "GDGoC", src: "/source_image/Logo GDGoC.svg", aspectClass: "aspect-[149.6/62.9]" },
    { alt: "RDK", src: "/source_image/Logo RDK.svg", aspectClass: "aspect-[90/62]" },
    { alt: "PSG", src: "/source_image/Logo PSG Putih.svg", aspectClass: "aspect-[54/62]" },
    { alt: "Palpod", src: "/source_image/Logo Palpod.svg", aspectClass: "aspect-[144/62]" },
    { alt: "BEM SV", src: "/source_image/Logo BEM SV.svg", aspectClass: "aspect-square" },
    { alt: "Permadani", src: "/source_image/Logo Permadani.svg", aspectClass: "aspect-[65/62]" },
    { alt: "KMID", src: "/source_image/Logo KMID.svg", aspectClass: "aspect-[120/62]" },
  ];

  const row2 = [
    { alt: "KMTEDI", src: "/source_image/Logo KMTEDI.svg", aspectClass: "aspect-[61/62]" },
    { alt: "APECX", src: "/source_image/Logo Apecx.svg", aspectClass: "aspect-[66.5/62]" },
    { alt: "TGES", src: "/source_image/Logo TGES.svg", aspectClass: "aspect-[47/62]" },
    { alt: "SkyBase", src: "/source_image/Logo SkyBase.svg", aspectClass: "aspect-[252/62]" },
    { alt: "TED", src: "/source_image/Logo TED.svg", aspectClass: "aspect-[237/62]" },
    { alt: "Liga TRPL", src: "/source_image/Logo Liga TRPL.svg", aspectClass: "aspect-[90/62]" },
    { alt: "Vocentic", src: "/source_image/Logo Vocentic.svg", aspectClass: "aspect-[64/62]" },
    { alt: "Assets", src: "/source_image/Logo Assets.svg", aspectClass: "aspect-[221/52]" },
  ];

  return (
    <div className="absolute bottom-[5%] md:bottom-[15%] left-0 w-full flex flex-col gap-[20px] md:gap-[40px] z-20 pointer-events-none overflow-hidden">
      
      {/* Row 1 (Moving Left) */}
      <div className="relative flex w-full overflow-hidden">
        <div className="flex gap-[30px] md:gap-[50px] w-[max-content] pl-[30px] md:pl-[50px] animate-marquee-left items-center">
          {[...row1, ...row1, ...row1, ...row1].map((logo, idx) => (
            <div key={`r1-${idx}`} className={`h-[30px] md:h-[50px] relative shrink-0 w-auto ${logo.aspectClass}`}>
              <img alt={logo.alt} className="absolute block inset-0 max-w-none size-full object-contain" src={logo.src} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (Moving Right) */}
      <div className="relative flex w-full overflow-hidden">
        <div className="flex gap-[30px] md:gap-[50px] w-[max-content] pl-[30px] md:pl-[50px] animate-marquee-right items-center">
          {[...row2, ...row2, ...row2, ...row2].map((logo, idx) => (
            <div key={`r2-${idx}`} className={`h-[30px] md:h-[50px] relative shrink-0 w-auto ${logo.aspectClass}`}>
              <img alt={logo.alt} className="absolute block inset-0 max-w-none size-full object-contain" src={logo.src} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
