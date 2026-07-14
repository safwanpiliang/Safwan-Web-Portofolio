"use client";

import { motion } from "framer-motion";

export function About() {
  const socialLinks = [
    { name: "Safwan Piliang", iconPath: "/source_image/skill-icons_linkedin.svg", href: "#" },
    { name: "safwanpiliang17@gmail.com", iconPath: "/source_image/skill-icons_gmail-light.svg", href: "mailto:safwanpiliang17@gmail.com" },
    { name: "Safwan Piliang", iconPath: "/source_image/devicon_behance.svg", href: "#" },
    { name: "safwan.piliang", iconPath: "/source_image/skill-icons_instagram.svg", href: "#" },
  ];

  return (
    <section id="about" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 flex justify-center overflow-hidden bg-slate-800">

      <div className="relative z-10 w-full max-w-[1216px] flex flex-col lg:flex-row items-center gap-[32px] sm:gap-[48px] lg:gap-[64px]">

        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-[20px] sm:gap-[24px] md:gap-[32px] w-full lg:w-1/2 order-2 lg:order-1">

          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-[8px] sm:gap-x-[12px] md:gap-x-[16px] justify-center lg:justify-start"
          >
            <span className="font-montserrat font-semibold text-[40px] sm:text-[56px] md:text-[64px] lg:text-[96px] text-slate-100 leading-none">About</span>
            <span className="font-doto font-black text-[40px] sm:text-[56px] md:text-[64px] lg:text-[96px] text-slate-100 leading-none tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px]">Me?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-inter font-medium text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-slate-300 leading-[26px] sm:leading-[28px] md:leading-[32px] text-center lg:text-left"
          >
            "Hi, I’m Safwan Piliang the person behind the projects above. As a freelance multidisciplinary designer and tech student at UGM, my work is driven by a simple idea: see the world through my eyes. I specialize in Graphic Design, UI-focused Product Design, and 3D Modeling using Blender, focusing on crafting visually engaging and user-friendly digital spaces. Let's collaborate and bring your ideas to life!"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex flex-col gap-[16px]"
          >
            <h3 className="font-inter font-bold text-[18px] sm:text-[20px] text-slate-100">Social Links:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[16px] gap-x-[32px]">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-[12px] group"
                >
                  <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full shrink-0">
                    <img src={link.iconPath} alt={link.name} className="w-[24px] h-[24px] object-contain" />
                  </div>
                  <span className="font-inter font-normal text-[14px] sm:text-[15px] md:text-[16px] text-slate-300 group-hover:text-white transition-colors break-all sm:break-normal">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column: 3D Character / Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <img
            src="/source_image/image 10.png"
            alt="Safwan Piliang Portrait"
            className="w-[250px] h-[330px] sm:w-[300px] sm:h-[400px] md:w-[450px] md:h-[600px] lg:w-[550px] lg:h-[700px] object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
