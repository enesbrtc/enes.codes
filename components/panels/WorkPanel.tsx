"use client";

import { useState } from "react";
import cv from "../../data/cv";

interface WorkPanelProps {
  language: 'en' | 'tr';
}

export default function WorkPanel({ language }: WorkPanelProps) {
  const content = {
    en: {
      title: "Automation Projects",
      subtitle: "Case studies in operational automation and system improvement",
      context: "Context",
      attempted: "What was attempted",
      learned: "What was learned",
      outcome: "Practical outcome",
      technologies: "Technologies explored"
    },
    tr: {
      title: "Otomasyon Projeleri",
      subtitle: "Operasyonel otomasyon ve sistem iyileştirmesi vakaları",
      context: "Bağlam",
      attempted: "Ne denendi",
      learned: "Ne öğrenildi",
      outcome: "Pratik sonuç",
      technologies: "Keşfedilen teknolojiler"
    }
  };
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProjectExpansion = (projectName: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectName)) {
        newSet.delete(projectName);
      } else {
        newSet.add(projectName);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold neon-text glitch-text mb-1">{content[language].title}</h2>
        <p className="text-xs text-neutral-400">{content[language].subtitle}</p>
      </div>

      <div className="space-y-3">
        {cv.automationProjects && cv.automationProjects.map((project) => {
          const isExpanded = expandedProjects.has(project.title);
          return (
            <div key={project.title} className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 overflow-hidden rounded-lg border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300">
              <button
                onClick={() => toggleProjectExpansion(project.title)}
                className="w-full p-3 text-left hover:bg-neutral-800/20 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-base text-neutral-100 mb-1">{project.title}</div>
                    <div className="text-xs text-neutral-400">{project.problem}</div>
                  </div>
                  <div className="text-sm text-cyan-400 ml-3 transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </div>
                </div>
              </button>
              {isExpanded && (
                <div className="px-3 pb-3 border-t border-neutral-700/30">
                  <div className="space-y-3 mt-3">
                    <div>
                      <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].context}</div>
                      <div className="text-xs text-neutral-300">{project.problem}</div>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].attempted}</div>
                      <div className="text-xs text-neutral-300">{project.action}</div>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].learned}</div>
                      <div className="text-xs text-neutral-300">Understanding practical constraints and system interactions in enterprise environments.</div>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].outcome}</div>
                      <div className="text-xs text-neutral-300">{project.result}</div>
                    </div>
                    {project.tech && (
                      <div>
                        <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].technologies}</div>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-md text-xs text-cyan-300 border border-cyan-500/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}