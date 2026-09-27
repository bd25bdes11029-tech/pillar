"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * StorySections — Minimal storytelling panels beneath the hero.
 * Large negative space. Short phrases. Pillar stays visible through sections.
 * No cards. No info panels. No HUD.
 */
export default function StorySections() {
  return (
    <div className="relative z-10 w-full">
      <Section01 />
      <Section02 />
      <Section03 />
      <ClosingCTA />
    </div>
  );
}

function Section01() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-start justify-center px-8 md:px-20 lg:px-32 max-w-6xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col gap-6 max-w-xl"
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-purple-400/60 font-mono">
          01 — What is the Pillar
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-wider uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Architecture<br />
          <span className="text-white/50">as Interface.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-loose max-w-sm font-light" style={{ fontFamily: "var(--font-sans)" }}>
          Drawn from the monumental tree-columns of Mumbai International Airport Terminal 2—
          structural art that now listens, responds, and remembers.
        </p>
      </motion.div>
    </section>
  );
}

function Section02() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-end justify-center px-8 md:px-20 lg:px-32 max-w-6xl ml-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        className="flex flex-col gap-6 max-w-xl text-right"
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/60 font-mono">
          02 — The Interaction
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-wider uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Your presence<br />
          <span className="text-white/50">is the input.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-loose max-w-sm ml-auto font-light" style={{ fontFamily: "var(--font-sans)" }}>
          The pillar senses proximity, emotional resonance, and personal history —
          surfacing fragments of memory as light through its woven lattice.
        </p>
      </motion.div>
    </section>
  );
}

function Section03() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col gap-6 items-center max-w-2xl"
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-purple-300/60 font-mono">
          03 — Memory
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-wider uppercase"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Light that<br />
          <span className="text-white/50">holds time.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-loose max-w-md font-light" style={{ fontFamily: "var(--font-sans)" }}>
          Every transit — every departure, arrival, and farewell — is encoded
          into the structure. The pillar doesn't just support the ceiling. It holds your story.
        </p>
      </motion.div>
    </section>
  );
}

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex flex-col items-center gap-10"
      >
        {/* Thin decorative line */}
        <div
          className="w-px h-20"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(168,162,158,0.2) 50%, transparent)" }}
        />

        <div className="flex flex-col items-center gap-5">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-[0.1em] uppercase"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Step Inside.
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-mono">
            Mumbai International Airport · 2085
          </p>
        </div>

        <button
          className="group relative inline-flex items-center gap-4 px-10 py-4 text-xs uppercase tracking-[0.25em] font-mono text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-700 cursor-pointer"
          style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.03)" }}
        >
          <span>Initialize the Pillar</span>
          <span className="inline-block translate-x-0 group-hover:translate-x-2 transition-transform duration-500">→</span>
        </button>
      </motion.div>
    </section>
  );
}
