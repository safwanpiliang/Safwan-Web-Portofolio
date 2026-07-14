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
      <div id="hero" className="w-full flex flex-col items-center">
        {/* ═══════ MOBILE LAYOUT (< md): Sequential stacked sections ═══════ */}
      <div className="md:hidden w-full flex flex-col bg-gradient-to-b from-[#28a6ff] from-[20%] to-[#d0ecff]">
        {/* Section 1: Hero fills full viewport */}
        <Hero />

        {/* Section 2: Hill image with gradient fade into slate-800 */}
        <div className="w-full relative mt-[-40px]">
          <img
            src="/source_image/Landing Page 2 char 3 1.png"
            alt="3D Robot on Grassy Hill"
            className="w-full h-auto object-cover pointer-events-none relative z-10"
          />
          {/* Gradient fade: transparent → slate-800 at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[165px] z-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(30,41,59,0) 0%, rgba(30,41,59,0.8) 70%, #1e293b 100%)",
            }}
          />
        </div>
      </div>

      {/* Section 3: Services on slate-800 background */}
      <div className="md:hidden w-full bg-slate-800 pt-[16px]">
        <Services />
      </div>

      {/* ═══════ DESKTOP LAYOUT (md+): Original overlay grid ═══════ */}
      <section className="hidden md:flex w-full flex-col items-center bg-gradient-to-b from-[#28a6ff] from-[13%] to-[#d0ecff]">
        <Hero />

        {/* Image and Services Overlaid */}
        <div className="w-full grid grid-cols-1 grid-rows-1 mt-[-40px] place-items-end relative">
          <img
            src="/source_image/Landing Page 2 char 3 1.png"
            alt="3D Robot on Grassy Hill"
            className="w-full h-auto object-cover col-start-1 row-start-1 z-0 pointer-events-none"
          />
          <div className="w-full col-start-1 row-start-1 z-10 flex flex-col justify-end">
            <Services />
          </div>
        </div>
      </section>
      </div>

      <Projects />
      <About />
      <Footer />
    </main>
  );
}
