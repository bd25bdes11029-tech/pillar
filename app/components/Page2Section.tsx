"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Page2Section Component (PAGE 2)
 *
 * Appears below the Hero when scrolling down.
 * Has its own independent dark background and visual identity, completely separate
 * from the Hero video.
 */
export default function Page2Section() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative z-20 w-full min-h-screen bg-[#030712] text-white py-32 px-8 md:px-20 lg:px-32 flex flex-col justify-center border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(109,40,217,0.08) 0%, rgba(0,229,255,0.04) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease }}
          className="flex flex-col gap-5 max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400/70 tracking-[0.3em] uppercase">
              01 // ARCHITECTURAL LINEAGE
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.08em] leading-tight text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Monumental<br />
            <span className="text-slate-400 font-light">Structure.</span>
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
            Inspired by the organic mega-columns of Mumbai International Airport Terminal 2 — re-engineering physical concourse architecture into a living, responsive interface.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-16"
        >
          {/* Card 1 */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-purple-400/80 tracking-widest">
              [ 01 — WOVEN LATTICE ]
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Organic Geometry
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Diamond coffered ceilings and mega-columns acting as natural light conductors and structural nodes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-cyan-400/80 tracking-widest">
              [ 02 — SPATIAL SENSING ]
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Human Proximity
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Sensor arrays detect physical presence and translate ambient human signatures into visual resonance loops.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-indigo-400/80 tracking-widest">
              [ 03 — REPOSITORY ]
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Surfacing Memories
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Departures, transit, and arrivals encoded directly into the architectural fabric of the concourse.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
