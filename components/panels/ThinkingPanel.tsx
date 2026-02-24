"use client";

import { useState } from 'react';

interface ThinkingPanelProps {
  language: 'en' | 'tr';
}

export default function ThinkingPanel({ language }: ThinkingPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };
  const content = {
    en: {
      title: "Engineering Thinking",
      subtitle: "Practical approaches learned through experience",
      incidentResponse: "Incident Response",
      incidentDesc: "Systematic approach to incident management",
      incidentList: [
        "Focus on systematic investigation over blame",
        "Document what happened and why it matters",
        "Implement fixes that prevent recurrence",
        "Learn from every incident, no matter how small"
      ],
      automationApproach: "Automation Approach",
      automationDesc: "Progressive automation strategy",
      automationList: [
        "Start with manual processes, then automate",
        "Make automation observable and maintainable",
        "Test automated systems thoroughly",
        "Keep humans in the loop for complex decisions"
      ],
      systemDesign: "System Design",
      systemDesignDesc: "Operability-first design principles",
      systemDesignList: [
        "Design for operability from day one",
        "Include monitoring in every component",
        "Plan for failure and recovery",
        "Keep systems simple when possible"
      ],
      reliabilityPractices: "Reliability Practices",
      reliabilityDesc: "Proactive reliability engineering",
      reliabilityList: [
        "Think about failure modes early",
        "Implement circuit breakers and timeouts",
        "Test failure scenarios regularly",
        "Have rollback plans for every change"
      ]
    },
    tr: {
      title: "Mühendislik Düşüncesi",
      subtitle: "Deneyim yoluyla öğrenilen pratik yaklaşımlar",
      incidentResponse: "Olay Müdahalesi",
      incidentDesc: "Olay yönetimine sistematik yaklaşım",
      incidentList: [
        "Suçlama yerine sistematik araştırmaya odaklan",
        "Ne olduğunu ve neden önemli olduğunu dokümante et",
        "Tekrarlanmayı önleyen düzeltmeler uygula",
        "Ne kadar küçük olursa olsun her olaydan öğren"
      ],
      automationApproach: "Otomasyon Yaklaşımı",
      automationDesc: "Aşamalı otomasyon stratejisi",
      automationList: [
        "Manuel süreçlerle başla, sonra otomasyona geç",
        "Otomasyonu gözlemlenebilir ve sürdürülebilir yap",
        "Otomatik sistemleri kapsamlı test et",
        "Karmaşık kararlar için insan faktörünü koru"
      ],
      systemDesign: "Sistem Tasarımı",
      systemDesignDesc: "İşletilebilirlik odaklı tasarım prensipleri",
      systemDesignList: [
        "Başlangıçtan itibaren işletilebilirlik için tasarla",
        "Her bileşende izleme dahil et",
        "Arıza ve kurtarma planla",
        "Mümkün olduğunca sistemleri basit tut"
      ],
      reliabilityPractices: "Güvenilirlik Pratikleri",
      reliabilityDesc: "Proaktif güvenilirlik mühendisliği",
      reliabilityList: [
        "Arıza modlarını erken düşün",
        "Devre kesiciler ve zaman aşımları uygula",
        "Arıza senaryolarını düzenli test et",
        "Her değişiklik için geri alma planları hazırla"
      ]
    }
  };
  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold neon-text glitch-text mb-1">{content[language].title}</h2>
        <p className="text-xs text-neutral-400">{content[language].subtitle}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('incident')}
            className="w-full p-4 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-base font-bold neon-text mb-1">{content[language].incidentResponse}</h3>
                <div className="text-xs text-neutral-400">{content[language].incidentDesc}</div>
              </div>
              <div className="text-sm text-red-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('incident') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('incident') && (
            <div className="px-4 pb-4 border-t border-neutral-700/30">
              <ul className="text-xs text-neutral-300 space-y-2 mt-3">
                {content[language].incidentList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('automation')}
            className="w-full p-4 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-base font-bold neon-text mb-1">{content[language].automationApproach}</h3>
                <div className="text-xs text-neutral-400">{content[language].automationDesc}</div>
              </div>
              <div className="text-sm text-green-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('automation') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('automation') && (
            <div className="px-4 pb-4 border-t border-neutral-700/30">
              <ul className="text-xs text-neutral-300 space-y-2 mt-3">
                {content[language].automationList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('design')}
            className="w-full p-4 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-base font-bold neon-text mb-1">{content[language].systemDesign}</h3>
                <div className="text-xs text-neutral-400">{content[language].systemDesignDesc}</div>
              </div>
              <div className="text-sm text-blue-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('design') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('design') && (
            <div className="px-4 pb-4 border-t border-neutral-700/30">
              <ul className="text-xs text-neutral-300 space-y-2 mt-3">
                {content[language].systemDesignList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('reliability')}
            className="w-full p-4 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-base font-bold neon-text mb-1">{content[language].reliabilityPractices}</h3>
                <div className="text-xs text-neutral-400">{content[language].reliabilityDesc}</div>
              </div>
              <div className="text-sm text-purple-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('reliability') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('reliability') && (
            <div className="px-4 pb-4 border-t border-neutral-700/30">
              <ul className="text-xs text-neutral-300 space-y-2 mt-3">
                {content[language].reliabilityList.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}