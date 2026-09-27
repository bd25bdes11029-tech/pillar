"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * HeroSection Component (Page 1)
 *
 * Final Video Assets:
 * - Intro video: "/premiere pro final.mp4"
 * - Pillar loop video: "/Creating_a_looping_pillar_video_20260926190300.mp4"
 *
 * Sequence:
 * 1. Intro video autoplays muted from 0:00.
 * 2. At EXACTLY 5.0 seconds into Intro video: DEJA VU text reveals over the continuing video.
 * 3. Intro video plays continuously until its NATURAL END.
 * 4. At natural end: Immediately transitions seamlessly to Pillar loop video.
 * 5. Pillar loop video loops continuously.
 * 6. Hero container occupies Page 1 (100vh) and moves upward out of view naturally on scroll.
 */
export default function HeroSection() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const pillarVideoRef = useRef<HTMLVideoElement>(null);

  const [textVisible, setTextVisible] = useState(false);
  const [crossfading, setCrossfading] = useState(false);
  const crossfadeStarted = useRef(false);

  const textControls = useAnimation();

  useEffect(() => {
    if (textVisible) {
      textControls.start("visible");
    }
  }, [textVisible, textControls]);

  // Seamless transition trigger to Pillar Loop video
  const triggerCrossfade = useCallback(() => {
    if (crossfadeStarted.current) return;
    crossfadeStarted.current = true;
    const pillarVideo = pillarVideoRef.current;
    if (pillarVideo) {
      pillarVideo.play().catch(() => {});
    }
    setCrossfading(true);
  }, []);

  useEffect(() => {
    const introVideo = introVideoRef.current;
    const pillarVideo = pillarVideoRef.current;
    if (!introVideo || !pillarVideo) return;

    // Preload pillar loop video so it's ready for immediate seamless transition
    pillarVideo.preload = "auto";
    pillarVideo.load();

    const handleTimeUpdate = () => {
      // At EXACTLY 5.0 seconds into intro video: reveal DEJA VU text over continuing video
      if (introVideo.currentTime >= 5.0 && !textVisible) {
        setTextVisible(true);
      }

      // Seamless crossfade trigger 1.5 seconds before intro video reaches its natural end
      if (
        introVideo.duration &&
        introVideo.currentTime >= introVideo.duration - 1.5 &&
        !crossfadeStarted.current
      ) {
        triggerCrossfade();
      }
    };

    const handleEnded = () => {
      triggerCrossfade();
    };

    introVideo.addEventListener("timeupdate", handleTimeUpdate);
    introVideo.addEventListener("ended", handleEnded);

    introVideo.play().catch((err) => {
      console.warn("Intro video playback notice:", err);
      setTextVisible(true);
      triggerCrossfade();
    });

    return () => {
      introVideo.removeEventListener("timeupdate", handleTimeUpdate);
      introVideo.removeEventListener("ended", handleEnded);
    };
  }, [textVisible, triggerCrossfade]);

  // Easing curve for typography reveal
  const ease = [0.16, 1, 0.3, 1] as const;

  const dejaVuVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.97,
      clipPath: "inset(100% 0% 0% 0%)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.4, ease },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#02040a] select-none">
      {/* ── PILLAR LOOP VIDEO: /Creating_a_looping_pillar_video_20260926190300.mp4 ── */}
      <video
        ref={pillarVideoRef}
        src="/Creating_a_looping_pillar_video_20260926190300.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: crossfading ? 1 : 0,
          transition: "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ── INTRO VIDEO: /premiere pro final.mp4 ── */}
      <video
        ref={introVideoRef}
        src="/premiere pro final.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: crossfading ? 0 : 1,
          transition: "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ── Atmospheric Vignette Shader ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(2,4,10,0.35) 65%, rgba(2,4,10,0.85) 100%)",
        }}
      />

      {/* ── Bottom Horizon Shader ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #02040a 0%, transparent 100%)",
        }}
      />

      {/* ── HERO TYPOGRAPHY: DEJA VU (Reveals at EXACTLY 5.0s) ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 text-center">
        <motion.div
          initial="hidden"
          animate={textControls}
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden py-4">
            <motion.h1
              variants={dejaVuVariants}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-extrabold uppercase tracking-[0.18em] leading-none text-white whitespace-nowrap drop-shadow-[0_0_60px_rgba(0,229,255,0.25)]"
              style={{
                fontFamily: "var(--font-syne)",
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DEJA VU
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* ── Minimal Non-Text Scroll Bar Line ── */}
      {textVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="absolute bottom-8 inset-x-0 z-20 flex justify-center pointer-events-none"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse" />
        </motion.div>
      )}
    </section>
  );
}
