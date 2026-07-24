"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import posterImage from "../lib/posters.png";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-container">
        <SectionTitle label="who we are" title="Who We Are" />

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-xl leading-snug md:col-span-7 md:text-3xl"
          >
            A founder doesn't build a brand to become just another name in the market. 
            They build it with belief, sacrifice, and a vision for something bigger. 
            <br />
            <br />
            At TBA, we begin by understanding that vision—the reason your brand exists,
             the values behind it, and the future you dream of.
             <span className="text-accent"> We create what you've always imagined for your brand</span>.
             We don't want to change your vision—we want to help the world see it exactly as you imagined it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center md:col-span-5"
          >
            {/* <div className="relative mx-auto w-full max-w-[18rem] overflow-hidden rounded-[2rem] border border-white/20 bg-[#f7efe5] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
              <Image
                src={posterImage}
                alt="TBA agency poster"
                width={600}
                height={800}
                priority
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />
            </div> */}
            <div className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/20 bg-[#f7efe5] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:max-w-[24rem] md:max-w-[20rem] lg:max-w-[24rem]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src={posterImage}
                  alt="TBA agency poster"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
