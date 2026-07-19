import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Articles } from "@/components/Articles";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ClientLogos } from "@/components/ClientLogos";
import { MultiplayerCursors } from "@/components/MultiplayerCursors";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-slate-900">
      <MultiplayerCursors />
      <Navbar />

      {/* ═══════ TOP SECTION (Hero + Image + Logos) ═══════ */}
      <div id="hero" className="w-full flex flex-col justify-between md:justify-start min-h-[100svh] md:min-h-0 items-center bg-gradient-to-b from-[#28a6ff] from-[20%] md:from-[5%] to-[#EFF6FF] relative z-0">
        
        {/* Rendered ONCE */}
        <Hero />

        <div className="w-full relative mt-[-40px] z-10 flex flex-col justify-end">
          {/* Base Image (row 1) */}
          <img
            src="/source_image/Landing Page 2 char 3 1 WEBP.webp"
            alt="3D Robot on Grassy Hill"
            className="w-full h-auto object-cover z-0 pointer-events-none transform-gpu will-change-transform"
          />

          {/* Client Logos over the image */}
          <ClientLogos />

          {/* Gradient overlay to transition into slate-900 smoothly */}
          <div
            className="absolute bottom-0 w-full h-[30%] z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,0.7) 60%, #0f172a 100%)",
            }}
          />
        </div>
      </div>

      <div className="w-full relative z-30 bg-slate-900">
        <Projects />
      </div>
      <div className="w-full relative z-30 bg-slate-900">
        <Articles />
      </div>
      <About />
      <Footer />
    </main>
  );
}
