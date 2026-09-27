"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * HeroText — The primary typography of the landing page.
 * Minimal. Architectural. Cinematic.
 * No HUD. No coordinates. No system data.
 * Just: label → headline → supporting text → CTA
 */
export default function HeroText() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Staggered entrance: label → headline lines → support → cta
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  // Label: subtle slide from below
  const labelVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // Headline line: clip-reveal upward (mask-reveal style)
  const headlineVariants = {
    hidden: { opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // Supporting text: gentle fade up
  const bodyVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  // CTA: fade with very slight upward drift
  const ctaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div ref={ref} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col items-center gap-8 max-w-3xl"
      >
        {/* Small Label */}
        <motion.p
          variants={labelVariants}
          className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/70 font-mono"
        >
          The Future of Interaction
        </motion.p>

        {/* Main Headline — two lines, each reveals independently */}
        <div className="flex flex-col items-center gap-1 overflow-hidden">
          <motion.h1
            variants={headlineVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] text-white leading-[1.05] uppercase"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Memories,
          </motion.h1>
          <motion.span
            variants={headlineVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] leading-[1.05] uppercase"
            style={{
              fontFamily: "var(--font-syne)",
              background: "linear-gradient(90deg, #e2e8f0 0%, #a5b4fc 50%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Reimagined.
          </motion.span>
        </div>

        {/* Supporting Text */}
        <motion.p
          variants={bodyVariants}
          className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md font-light"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          A new interface inspired by the architecture of
          <br />Mumbai International Airport.
        </motion.p>

        {/* CTA */}
        <motion.div variants={ctaVariants}>
          <button
            className="group relative inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors duration-500 cursor-pointer mt-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>Enter the Experience</span>
            <span className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500">→</span>
            {/* Bottom underline that grows on hover */}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-500" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom center, very subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-mono">Scroll</span>
      </motion.div>
    </div>
  );
}
