"use client";

import { motion } from "framer-motion";
import Card from "../../../components/Card";
import { skills } from "../../../data/skills";

export default function Stats() {
  return (
    <Card>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>

            <div className="h-2 bg-neutral-800 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8 }}
                className="h-2 bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}