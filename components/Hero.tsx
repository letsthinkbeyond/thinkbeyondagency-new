"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import RevealText from "./RevealText";
import MagneticButton from "./MagneticButton";
import StickyNote from "./StickyNote";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export default function Hero() {
  const { x, y } = useMousePosition();
  const [size, setSize] = useState({ w: 1600, h: 900 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  const relX = size.w ? (x - size.w / 2) / size.w : 0;
  const relY = size.h ? (y - size.h / 2) / size.h : 0;

  return (
    <section
      id="top"
      className="paper-texture bg-grid relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-20 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Think Beyond Agency 
            <br /> branding and marketing 
          </motion.span>

          <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight md:text-[6.4vw]">
            <span className="text-stroke">
              <RevealText text="FOR" as="span" delay={0.05} />
            </span>
            <br />
            <RevealText text="BRANDS." as="span" delay={0.05} />
            <br />
            <span className="text-stroke">
              <RevealText text="THAT" as="span" delay={0.1} />
            </span>
            <br />
            <RevealText text="THINK BEYOND." as="span" className="text-accent" delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-secondary"
          >
            TBA (Think Beyond Agency) is a global branding and marketing agency based in Surat, India, working with ambitious brands across India and around the world. We build brands through strategy, creativity, content, and digital marketing, wherever our clients are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton href="#contact">
              Start Project <FiArrowUpRight />
            </MagneticButton>
            <MagneticButton href="#work" variant="outline">
              View Work
            </MagneticButton>
          </motion.div>
        </div>

        <div className="relative hidden md:col-span-4 md:block">
          <motion.div
            style={{ transform: `translate(${relX * 20}px, ${relY * 20}px)` }}
            className="absolute right-2 top-6"
          >
            <StickyNote rotate={-8} delay={1.4} className="w-52">
              "You already took the right step."
            </StickyNote>
          </motion.div>

          <motion.div
            style={{ transform: `translate(${relX * -14}px, ${relY * -14}px)` }}
            className="absolute right-16 top-64"
          >
            <StickyNote rotate={6} delay={1.6} className="w-44 bg-[#E7EDFF]">
              "See what's Beyond"
            </StickyNote>
          </motion.div>

          <motion.svg
            style={{ transform: `translate(${relX * 10}px, ${relY * 10}px)` }}
            className="absolute right-32 top-40 h-24 w-24 text-ink/70 dark:text-ink-dark/70"
            viewBox="0 0 100 100"
            fill="none"
          >
            <motion.path
              d="M10 20 C 30 10, 55 55, 80 78"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M85 68 L82 80 L60 74"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2.6, duration: 0.4 }}
            />
          </motion.svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mx-auto mt-16 flex w-full max-w-container items-center justify-center px-1 font-mono text-xs uppercase tracking-widest text-secondary"
      >
        {/* <span>Est. India</span> */}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          Scroll
        </motion.span>
        {/* <span>Creative &amp; Performance</span> */}
      </motion.div>
    </section>
  );
}
