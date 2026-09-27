"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Radio, Compass, Volume2, VolumeX } from "lucide-react";

interface HUDOverlayProps {
  scrollY: number;
}

export default function HUDOverlay({ scrollY }: HUDOverlayProps) {
  const [timeIST, setTimeIST] = useState("");
  const [timeUTC, setTimeUTC] = useState("");
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeIST(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
      setTimeUTC(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate altitude elevation based on scroll
  const altitude = Math.min(84.5, (scrollY / 20).toFixed(1) as unknown as number);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 md:p-10 select-none">
      {/* Top HUD Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="w-full flex items-center justify-between text-[11px] hud-font text-slate-400 border-b border-cyan-500/10 pb-4 backdrop-blur-xs"
      >
        {/* Top Left: Terminal Code */}
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="text-cyan-300 font-semibold tracking-widest">
            CSMIA-T2 // ARCHITECTURAL AXIS
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-500">SYS: NOMINAL</span>
        </div>

        {/* Top Center: Coordinates */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400">
          <Compass className="w-3.5 h-3.5 text-cyan-400/70" />
          <span>19.0896° N, 72.8656° E</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-500">MUMBAI SANCTUARY NODE</span>
        </div>

        {/* Top Right: Clock & Audio */}
        <div className="flex items-center gap-4 text-right">
          <div className="hidden sm:block">
            <span className="text-slate-300">{timeIST}</span>
            <span className="text-slate-600 mx-2">/</span>
            <span className="text-slate-500">{timeUTC}</span>
          </div>

          <button
            onClick={() => setIsAudioActive(!isAudioActive)}
            className="pointer-events-auto p-2 rounded-full border border-cyan-500/20 bg-slate-950/40 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
            title="Toggle Ambient Audio"
          >
            {isAudioActive ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Center Left: Elevation Altitude Axis */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 text-[10px] hud-font text-slate-500"
      >
        <span className="text-cyan-400 font-mono font-bold">{altitude}m</span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent relative">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff]"
            style={{ top: `${Math.min(100, (scrollY / 15))}%` }}
          />
        </div>
        <span className="text-slate-600 uppercase tracking-widest text-[9px]">ALTITUDE</span>
      </motion.div>

      {/* Center Right: Atmospheric Diagnostics */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-4 text-[10px] hud-font text-slate-500"
      >
        <div className="flex flex-col items-end border-r border-cyan-500/20 pr-3 py-1">
          <span className="text-slate-400">LATTICE LOAD</span>
          <span className="text-cyan-400 font-semibold">14.2 GPa // STABLE</span>
        </div>

        <div className="flex flex-col items-end border-r border-purple-500/20 pr-3 py-1">
          <span className="text-slate-400">AIR FILTRATION</span>
          <span className="text-purple-300 font-semibold">99.98% PURITY</span>
        </div>

        <div className="flex flex-col items-end border-r border-cyan-500/20 pr-3 py-1">
          <span className="text-slate-400">MEMORY RESONANCE</span>
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mt-0.5">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>ACTIVE 4.2 THz</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom Center: Scroll Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="w-full flex flex-col items-center justify-center text-[10px] hud-font text-slate-400 pb-2"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/40" />
          <span className="text-cyan-300/80 tracking-widest uppercase">
            SCROLL TO ASCEND STRUCTURAL AXIS
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/40" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mt-2 shadow-[0_0_8px_#00e5ff]" />
      </motion.div>
    </div>
  );
}
