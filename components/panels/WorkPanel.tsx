"use client";

import { useState } from "react";

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
      technologies: "Technologies explored",
      learnedText: "Understanding practical constraints and system interactions in enterprise environments.",
      projects: [
        {
          title: "Automated User Lifecycle Management",
          problem: "Manual onboarding and offboarding consumed large support time and caused delays.",
          action: "Built AD + M365 automation scripts to provision and deprovision users; implemented approval workflow and logging.",
          result: "Eliminated manual onboarding tasks and reduced provisioning time from ~30m to ~3m per user.",
          tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
        },
        {
          title: "Internal Tools Containerization",
          problem: "Internal utilities were hard to deploy and maintain across environments.",
          action: "Containerized services with Docker, added simple CI pipelines and rollout scripts.",
          result: "Streamlined deployments and reduced environment drift for internal tools.",
          tech: ["Docker", "Git", "CI (basic)"]
        },
        {
          title: "Self-service Support Automation",
          problem: "High volume of repetitive support requests wasting technician time.",
          action: "Built self-service scripts and a lightweight internal portal for common tasks (password reset, access requests).",
          result: "Reduced repetitive tickets and freed ~10 hours/week for the support team.",
          tech: ["Node.js", "Express", "PowerShell", "ServiceNow"]
        }
      ]
    },
    tr: {
      title: "Otomasyon Projeleri",
      subtitle: "Operasyonel otomasyon ve sistem iyileştirmesi vakaları",
      context: "Bağlam",
      attempted: "Ne denendi",
      learned: "Ne öğrenildi",
      outcome: "Pratik sonuç",
      technologies: "Keşfedilen teknolojiler",
      learnedText: "Kurumsal ortamlarda pratik kısıtlamaları ve sistem etkileşimlerini anlama.",
      projects: [
        {
          title: "Otomatik Kullanıcı Yaşam Döngüsü Yönetimi",
          problem: "Manuel işe alım ve işten çıkarma işlemleri büyük destek zamanı harcıyordu ve gecikmelere neden oluyordu.",
          action: "Kullanıcıları sağlamak ve kaldırmak için AD + M365 otomasyon komutları geliştirdim; onay iş akışı ve günlük kaydı uyguladım.",
          result: "Manuel işe alım görevlerini ortadan kaldırdı ve kullanıcı başına sağlama süresini ~30dk'dan ~3dk'ya düşürdü.",
          tech: ["PowerShell", "Python", "Microsoft Graph", "Active Directory"],
        },
        {
          title: "İç Araçların Konteynerleştirilmesi",
          problem: "İç yardımcı programlar ortamlar arasında dağıtılması ve bakımının yapılması zordu.",
          action: "Hizmetleri Docker ile konteynerleştirdim, basit CI işlem hatları ve dağıtım komutları ekledim.",
          result: "İç araçlar için dağıtımları kolaylaştırdı ve ortam sapmasını azalttı.",
          tech: ["Docker", "Git", "CI (basic)"]
        },
        {
          title: "Self-Servis Destek Otomasyonu",
          problem: "Yüksek hacimli tekrarlayan destek talepleri teknisyen zamanını boşa harcıyordu.",
          action: "Ortak görevler için self-servis komutları ve hafif bir iç portal geliştirdim (şifre sıfırlama, erişim talepleri).",
          result: "Tekrarlayan talepleri azalttı ve destek ekibi için haftada ~10 saat serbest bıraktı.",
          tech: ["Node.js", "Express", "PowerShell", "ServiceNow"]
        }
      ]
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
        {content[language].projects.map((project) => {
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
                      <div className="text-xs text-neutral-300">{content[language].learnedText}</div>
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