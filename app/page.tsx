"use client";

import HeroSection from "./components/HeroSection";

/**
 * Main Page Layout:
 * - PAGE 1: HeroSection (Video 1 -> 5.0s DEJA VU reveal -> Video 2 loop + embedded audio).
 *   Moves upward out of view on scroll.
 * - PAGE 2: Standalone empty section container awaiting user's text reference.
 */
export default function Home() {
  return (
    <main className="relative bg-[#02040a] text-white min-h-screen overflow-x-hidden">
      {/* PAGE 1: HERO EXPERIMENTAL SECTION (100vh) */}
      <HeroSection />

      {/* PAGE 2: STANDALONE SECTION CONTAINER */}
      <section
        id="page-2"
        className="relative z-20 w-full min-h-screen bg-[#02040a] flex items-center justify-center border-t border-white/5"
      />
    </main>
  );
}
