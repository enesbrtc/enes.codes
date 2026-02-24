"use client";
import { motion } from "framer-motion";
import Avatar from "./Avatar";
import Glitch from "./Glitch";
import StatPill from "./StatPill";
import cv from "@/data/cv";

export default function AnimatedCardContent() {
  const data = cv;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 neon-border bg-card p-4">
      <div className="flex items-center gap-4">
        <Avatar src="/2dme.png" fallback="EB" />
        <div>
          <h2 className="text-2xl font-bold neon-text glitch-text" data-text={data.name}>{data.name}</h2>
          <div className="text-sm text-neutral-400">{data.title}</div>
        </div>
        <div className="ml-auto text-xs text-neutral-400">{data.location}</div>
      </div>

      <div>
        <h3 className="font-semibold">Summary</h3>
        <p className="text-sm text-neutral-300"><Glitch>{data.summary}</Glitch></p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Stats</h4>
          <div className="mt-3 space-y-2">
            {Object.entries(data.stats).map(([k, v]) => (
              <StatPill key={k} label={k} value={v as number} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold">Cyberware & Tools</h4>
          <ul className="text-sm text-neutral-300 mt-2 space-y-1">
            {data.cyberware.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Experience (latest)</h4>
        <div className="mt-2 text-sm text-neutral-300">
          <strong>{data.experience[0].company}</strong> — {data.experience[0].role} <span className="text-neutral-500">{data.experience[0].date}</span>
          <ul className="list-disc ml-5 mt-2">
            {data.experience[0].bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
