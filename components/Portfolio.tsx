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
      const getTotalScroll = () => {
        const viewportWidth = section.clientWidth || window.innerWidth;
        const gap = 32;
        const totalContentWidth = Array.from(track.children).reduce((sum, child, index) => {
          const element = child as HTMLElement;
          return sum + element.getBoundingClientRect().width + (index > 0 ? gap : 0);
        }, 0);
        const isDesktop = window.innerWidth >= 768;
        const extraPadding = isDesktop ? 180 : 80;
        return Math.max(totalContentWidth - viewportWidth + extraPadding, 0);
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getTotalScroll()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -getTotalScroll(),
          ease: "none",
        }),
      });

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("load", refresh);
      window.addEventListener("orientationchange", refresh);

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(section);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("orientationchange", refresh);
        resizeObserver.disconnect();
        st.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden px-6 pt-32 md:px-12">
      <div className="mx-auto mb-14 max-w-container">
        <SectionTitle label="Tba's work" title="Keep scrolling. The best is yet to come." />
      </div>

      <div ref={trackRef} className="flex w-max gap-8 pr-4 md:pr-8">
        {portfolio.map((project) => {
          const isVideo = project.mediaType === "video";

          return (
            <div
              key={project.title}
              data-cursor-hover
              className="group relative shrink-0 overflow-hidden rounded-2xl border border-ink/10"
              style={{
                width: "min(74vw, 20rem)",
                aspectRatio: "8.5 / 7.6",
                maxWidth: "20rem",
              }}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105">
                {isVideo ? (
                  <video
                    src={project.mediaSrc}
                    poster={project.posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-contain object-center bg-black/90"
                  />
                ) : (
                  <img src={project.mediaSrc} alt={project.title} className="h-full w-full object-contain object-center bg-black/90" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
            </div>
          );
        })}

        <a
          href="https://drive.google.com/drive/folders/15_w8D8eGqGWPc7_v5R0JpaJJRWxEx1MQ?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="group flex shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/5 px-8 text-center transition-transform duration-700 ease-premium hover:scale-105"
          style={{ width: "min(74vw, 20rem)", aspectRatio: "8.5 / 7.6", maxWidth: "20rem" }}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-ink/60">More</p>
            <h3 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Works</h3>
            <p className="mt-3 text-sm text-ink/70">Open our full portfolio drive</p>
          </div>
        </a>
        <div className="shrink-0 w-4 md:w-8" />
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { portfolio } from "@/lib/data";
// import SectionTitle from "./SectionTitle";

// export default function Portfolio() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const section = sectionRef.current;
//     const track = trackRef.current;
//     if (!section || !track) return;

//     const ctx = gsap.context(() => {
//       const viewportWidth = section.clientWidth || window.innerWidth;
//       const gap = 32;
//       const totalContentWidth = Array.from(track.children).reduce((sum, child, index) => {
//         const element = child as HTMLElement;
//         return sum + element.getBoundingClientRect().width + (index > 0 ? gap : 0);
//       }, 0);
//       const isDesktop = window.innerWidth >= 768;
//       const extraPadding = isDesktop ? 180 : 80;
//       const totalScroll = Math.max(totalContentWidth - viewportWidth + extraPadding, 0);
//       if (totalScroll <= 0) return;

//       // gsap.to(track, {
//       //   x: -totalScroll,
//       //   ease: "none",
//       //   scrollTrigger: {
//       //     trigger: section,
//       //     start: "top top",
//       //     end: () => `+=${totalScroll}`,
//       //     scrub: 1,
//       //     pin: false,
//       //     invalidateOnRefresh: true,
//       //   },
//       // });
//       gsap.to(track, {
//   x: -totalScroll,
//   ease: "none",
//   scrollTrigger: {
//     trigger: section,
//     start: "top top",
//     end: () => `+=${totalScroll}`,
//     scrub: 1,
//     pin: true,
//     pinSpacing: true,
//     anticipatePin: 1,
//     invalidateOnRefresh: true,
//   },
// });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section id="work" ref={sectionRef} className="relative overflow-hidden px-6 pt-32 md:px-12">
//       <div className="mx-auto mb-14 max-w-container">
//         <SectionTitle label="Tba's work" title="Keep scrolling. The best is yet to come." />
//       </div>

//       <div ref={trackRef} className="flex w-max gap-8 pr-4 md:pr-8">
//         {portfolio.map((project) => {
//           const isVideo = project.mediaType === "video";

//           return (
//             <div
//               key={project.title}
//               data-cursor-hover
//               className="group relative shrink-0 overflow-hidden rounded-2xl border border-ink/10"
//               style={{
//                 width: "min(74vw, 20rem)",
//                 aspectRatio: "8.5 / 7.6",
//                 maxWidth: "20rem",
//               }}
//             >
//               <div className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105">
//                 {isVideo ? (
//                   <video
//                     src={project.mediaSrc}
//                     poster={project.posterSrc}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="h-full w-full object-contain object-center bg-black/90"
//                   />
//                 ) : (
//                   <img src={project.mediaSrc} alt={project.title} className="h-full w-full object-contain object-center bg-black/90" />
//                 )}
//               </div>
//               <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
//             </div>
//           );
//         })}

//         <a
//           href="https://drive.google.com/drive/folders/15_w8D8eGqGWPc7_v5R0JpaJJRWxEx1MQ?usp=sharing"
//           target="_blank"
//           rel="noopener noreferrer"
//           data-cursor-hover
//           className="group flex shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/5 px-8 text-center transition-transform duration-700 ease-premium hover:scale-105"
//           style={{ width: "min(74vw, 20rem)", aspectRatio: "8.5 / 7.6", maxWidth: "20rem" }}
//         >
//           <div>
//             <p className="text-sm uppercase tracking-[0.35em] text-ink/60">More</p>
//             <h3 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Works</h3>
//             <p className="mt-3 text-sm text-ink/70">Open our full portfolio drive</p>
//           </div>
//         </a>
//         <div className="shrink-0 w-4 md:w-8" />
//       </div>
//     </section>
//   );
// }

