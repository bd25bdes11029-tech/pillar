"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Scan, Waves, Cpu, ArrowUpRight } from "lucide-react";

interface NodeItem {
  id: string;
  title: string;
  category: string;
  position: string;
  coords: string;
  description: string;
  memoryExcerpt: string;
  accentColor: string;
}

const MEMORY_NODES: NodeItem[] = [
  {
    id: "node-01",
    title: "Spatial Sensing Matrix",
    category: "ARCHITECTURAL RESONANCE",
    position: "top-[32%] left-[18%] md:left-[24%]",
    coords: "LAT-01 // 42.8m ELEVATION",
    description:
      "Inspired by CSMIA Terminal 2's organic mega-columns. Integrated sensor arrays detect human proximity and translate ambient emotional signatures into radiant light.",
    memoryExcerpt:
      "“A thousand journeys converge beneath the canopy; the pillar remembers every footsteps' echo.”",
    accentColor: "#00e5ff",
  },
  {
    id: "node-02",
    title: "Memory Substratum",
    category: "HUMAN EXPERIENCE REPOSITORY",
    position: "top-[52%] right-[16%] md:right-[22%]",
    coords: "LAT-02 // 28.4m ELEVATION",
    description:
      "The pillar functions as a living projection surface. Personal transit memories, departure farewells, and arrivals are woven into the glowing lattice conduits.",
    memoryExcerpt:
      "“Light reflects off polished bronze; a memory of departure turns into a constellation of return.”",
    accentColor: "#c084fc",
  },
  {
    id: "node-03",
    title: "Terminal Concourse Sanctuary",
    category: "BIOPHILIC CONVERSATION",
    position: "top-[72%] left-[22%] md:left-[28%]",
    coords: "LAT-03 // 14.1m ELEVATION",
    description:
      "Where physical sanctuary meets digital consciousness. The pillar breathes at a 7-second harmonic cycle, filtering air while illuminating the terminal concourse.",
    memoryExcerpt:
      "“Sanctuary isn't just a place to wait—it is an architectural embrace of light.”",
    accentColor: "#38bdf8",
  },
];

export default function InteractiveMemoryNodes() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto min-h-screen z-20 pointer-events-none">
      {MEMORY_NODES.map((node) => {
        const isActive = activeNodeId === node.id;

        return (
          <div
            key={node.id}
            className={`absolute ${node.position} flex items-center gap-4 pointer-events-auto`}
          >
            {/* Target Reticle Button */}
            <button
              onClick={() => setActiveNodeId(isActive ? null : node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              className="relative group flex items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-500 focus:outline-hidden"
            >
              {/* Outer Rotating Reticle Ring */}
              <div
                className={`absolute inset-0 rounded-full border border-dashed ${
                  isActive
                    ? "border-cyan-400 animate-spin-slow scale-125"
                    : "border-cyan-500/30 group-hover:border-cyan-400/60"
                } transition-all duration-500`}
              />

              {/* Glowing Core Dot */}
              <div
                className="w-3.5 h-3.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: node.accentColor,
                  boxShadow: isActive
                    ? `0 0 16px ${node.accentColor}`
                    : `0 0 8px ${node.accentColor}80`,
                }}
              />

              {/* Pulsing Signal Wave */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: node.accentColor }}
              />
            </button>

            {/* Label Tag */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] hud-font text-cyan-400/80 tracking-widest">
                {node.coords}
              </span>
              <span className="text-xs headline-font font-semibold text-slate-200 tracking-wider">
                {node.title}
              </span>
            </div>

            {/* Expanded Holographic Micro-Panel */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="absolute left-12 top-0 w-80 md:w-96 p-5 rounded-xl border border-cyan-500/30 bg-[#070e1b]/90 backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.15)] z-40 text-left pointer-events-auto"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-[10px] hud-font text-cyan-400 mb-3 border-b border-cyan-500/20 pb-2">
                    <span className="flex items-center gap-1.5 font-bold tracking-widest">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      {node.category}
                    </span>
                    <span className="text-slate-400">{node.coords}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base headline-font font-bold text-slate-100 tracking-wider mb-2">
                    {node.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                    {node.description}
                  </p>

                  {/* Memory Excerpt Box */}
                  <div className="p-3 rounded-lg border border-purple-500/30 bg-purple-950/20 text-[11px] italic text-purple-200/90 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{node.memoryExcerpt}</span>
                  </div>

                  {/* Interactive Status Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] hud-font text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Waves className="w-3 h-3 animate-pulse" /> LATTICE CONDUIT ENGAGED
                    </span>
                    <button
                      onClick={() => setActiveNodeId(null)}
                      className="hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      CLOSE [X]
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
