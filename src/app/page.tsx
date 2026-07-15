import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-slate-900">
      <Navbar />

      {/* ═══════ TOP SECTION (Hero + Image + Services) ═══════ */}
      <div id="hero" className="w-full flex flex-col items-center bg-gradient-to-b from-[#28a6ff] from-[20%] md:from-[5%] to-[#EFF6FF] relative z-0">
        
        {/* Rendered ONCE */}
        <Hero />

        <div className="w-full grid grid-cols-1 mt-[-40px] relative z-10">
          {/* Base Image (row 1) */}
          <img
            src="/source_image/Landing Page 2 char 3 1.png"
            alt="3D Robot on Grassy Hill"
            className="w-full h-auto object-cover col-start-1 row-start-1 z-0 pointer-events-none transform-gpu will-change-transform self-end"
          />

          {/* Mobile gradient fade overlaying the image bottom */}
          <div
            className="md:hidden col-start-1 row-start-1 w-full h-[165px] z-20 pointer-events-none self-end"
            style={{
              background: "linear-gradient(to bottom, rgba(30,41,59,0) 0%, rgba(30,41,59,0.8) 70%, #1e293b 100%)",
            }}
          />

          {/* Services Section (Rendered ONCE):
              On mobile: Below the image (row-start-2), slate background
              On desktop: Over the image (row-start-1), transparent background
          */}
          <div className="col-start-1 row-start-2 md:row-start-1 z-10 flex flex-col justify-end w-full bg-slate-800 md:bg-transparent pt-[16px] md:pt-0 relative">
            <Services />
          </div>
        </div>
      </div>

      <div className="w-full relative z-30 bg-slate-800">
        <Projects />
      </div>
      <About />
      <Footer />
    </main>
  );
}
