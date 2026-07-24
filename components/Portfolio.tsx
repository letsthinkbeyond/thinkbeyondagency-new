"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/lib/data";
import SectionTitle from "./SectionTitle";

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="mx-auto mb-14 max-w-container">
        <SectionTitle label="Tba's work" title="Keep scrolling. The best is yet to come." />
      </div>

      <div ref={trackRef} className="flex w-max gap-8 pl-6 md:pl-12">
        {portfolio.map((project) => (
          <div
            key={project.title}
            data-cursor-hover
            className="group relative aspect-[4/5] w-[78vw] max-w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-ink/10 sm:w-[44vw] sm:max-w-[26rem] lg:w-[30vw] lg:max-w-[24rem]"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105">
              {project.mediaType === "video" ? (
                <video
                  src={project.mediaSrc}
                  poster={project.posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <img src={project.mediaSrc} alt={project.title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
          </div>
        ))}
      </div>
    </section>
  );
}
