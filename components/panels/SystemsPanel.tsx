"use client";

import { useState } from "react";

interface SystemsPanelProps {
  language: 'en' | 'tr';
}

export default function SystemsPanel({ language }: SystemsPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionName)) {
        newSet.delete(sectionName);
      } else {
        newSet.add(sectionName);
      }
      return newSet;
    });
  };
  const content = {
    en: {
      title: "Systems I Work With",
      subtitle: "Exposure and contribution across enterprise infrastructure",
      identityTitle: "Enterprise Identity Environments",
      identityDesc: "I work within large-scale identity management systems handling thousands of users",
      identityWhatIDo: "What I Do",
      identityTech: "Technologies I Use",
      identityOutcomes: "Learning Outcomes",
      identityWhatIDoList: [
        "Implement automation improvements",
        "Contribute to operational workflows",
        "Support identity governance processes",
        "Learn enterprise-scale patterns"
      ],
      identityTechList: [
        "Active Directory management",
        "Microsoft 365 administration",
        "SSO and federation services",
        "Identity automation tools"
      ],
      identityOutcomesText: "Developing expertise in complex enterprise environments and automation challenges",
      lifecycleTitle: "User Lifecycle Automation",
      lifecycleDesc: "I explore automation approaches for employee onboarding and offboarding",
      lifecycleWhatIDoList: [
        "Experiment with workflow automation",
        "Implement process improvements",
        "Support operational efficiency",
        "Learn automation patterns"
      ],
      lifecycleTechList: [
        "API-driven account creation",
        "Security group management",
        "License assignment systems",
        "Workflow automation tools"
      ],
      lifecycleOutcomesText: "Mastering end-to-end process automation and operational workflows",
      supportTitle: "Internal Support Systems",
      supportDesc: "I work on self-service tools and support automation for IT operations",
      supportWhatIDoList: [
        "Implement self-service features",
        "Improve support workflows",
        "Contribute to automation initiatives",
        "Learn user experience patterns"
      ],
      supportTechList: [
        "Password reset systems",
        "Device enrollment tools",
        "Knowledge base integration",
        "Ticket routing automation"
      ],
      supportOutcomesText: "Building expertise in support automation and user-facing system design",
      monitoringTitle: "Monitoring & Incident Response",
      monitoringDesc: "I explore observability and automated response patterns",
      monitoringWhatIDoList: [
        "Implement monitoring improvements",
        "Learn incident response workflows",
        "Contribute to alerting strategies",
        "Experiment with automation approaches"
      ],
      monitoringTechList: [
        "Alert correlation systems",
        "Automated remediation tools",
        "Incident documentation platforms",
        "Monitoring and observability stacks"
      ],
      monitoringOutcomesText: "Gaining deep insights into system reliability and automated incident management"
    },
    tr: {
      title: "Çalıştığım Sistemler",
      subtitle: "Kurumsal altyapı genelinde deneyim ve katkı",
      identityTitle: "Kurumsal Kimlik Ortamları",
      identityDesc: "Binlerce kullanıcıyı yöneten büyük ölçekli kimlik yönetim sistemlerinde çalışıyorum",
      identityWhatIDo: "Ne Yapıyorum",
      identityTech: "Kullandığım Teknolojiler",
      identityOutcomes: "Öğrenme Çıktıları",
      identityWhatIDoList: [
        "Otomasyon iyileştirmeleri uygularım",
        "Operasyonel iş akışlarına katkıda bulunurum",
        "Kimlik yönetimi süreçlerini desteklerim",
        "Kurumsal ölçekli kalıpları öğrenirim"
      ],
      identityTechList: [
        "Active Directory yönetimi",
        "Microsoft 365 yönetimi",
        "SSO ve federasyon servisleri",
        "Kimlik otomasyon araçları"
      ],
      identityOutcomesText: "Karmaşık kurumsal ortamlarda uzmanlık geliştiriyorum ve otomasyon zorluklarını çözüyorum",
      lifecycleTitle: "Kullanıcı Yaşam Döngüsü Otomasyonu",
      lifecycleDesc: "Çalışan işe alım ve işten çıkarma süreçleri için otomasyon yaklaşımları keşfediyorum",
      lifecycleWhatIDoList: [
        "İş akışı otomasyonu ile deneyler yaparım",
        "Süreç iyileştirmeleri uygularım",
        "Operasyonel verimliliği desteklerim",
        "Otomasyon kalıpları öğrenirim"
      ],
      lifecycleTechList: [
        "API tabanlı hesap oluşturma",
        "Güvenlik grubu yönetimi",
        "Lisans atama sistemleri",
        "İş akışı otomasyon araçları"
      ],
      lifecycleOutcomesText: "Uçtan uca süreç otomasyonunda uzmanlaşıyorum ve operasyonel iş akışlarını yönetiyorum",
      supportTitle: "İç Destek Sistemleri",
      supportDesc: "BT operasyonları için self-servis araçları ve destek otomasyonu üzerinde çalışıyorum",
      supportWhatIDoList: [
        "Self-servis özellikler uygularım",
        "Destek iş akışlarını iyileştiririm",
        "Otomasyon girişimlerine katkıda bulunurum",
        "Kullanıcı deneyimi kalıpları öğrenirim"
      ],
      supportTechList: [
        "Şifre sıfırlama sistemleri",
        "Cihaz kayıt araçları",
        "Bilgi tabanı entegrasyonu",
        "Talep yönlendirme otomasyonu"
      ],
      supportOutcomesText: "Destek otomasyonunda uzmanlık geliştiriyorum ve kullanıcı odaklı sistem tasarımı yapıyorum",
      monitoringTitle: "İzleme ve Olay Müdahalesi",
      monitoringDesc: "Gözlemlenebilirlik ve otomatik yanıt kalıplarını keşfediyorum",
      monitoringWhatIDoList: [
        "İzleme iyileştirmeleri uygularım",
        "Olay müdahale iş akışlarını öğrenirim",
        "Uyarı stratejilerine katkıda bulunurum",
        "Otomasyon yaklaşımları ile deneyler yaparım"
      ],
      monitoringTechList: [
        "Uyarı korelasyon sistemleri",
        "Otomatik düzeltme araçları",
        "Olay dokümantasyon platformları",
        "İzleme ve gözlemlenebilirlik yığınları"
      ],
      monitoringOutcomesText: "Sistem güvenilirliği ve otomatik olay yönetiminde derin içgörüler kazanıyorum"
    }
  };
  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold neon-text glitch-text mb-1">{content[language].title}</h2>
        <p className="text-xs text-neutral-400">{content[language].subtitle}</p>
      </div>

      <div className="space-y-3">
        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('identity')}
            className="w-full p-3 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-base text-neutral-100 mb-1">{content[language].identityTitle}</div>
                <div className="text-xs text-neutral-400">{content[language].identityDesc}</div>
              </div>
              <div className="text-sm text-cyan-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('identity') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('identity') && (
            <div className="px-3 pb-3 border-t border-neutral-700/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityWhatIDo}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].identityWhatIDoList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityTech}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].identityTechList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].identityOutcomes}</div>
                <div className="text-xs text-neutral-400">{content[language].identityOutcomesText}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('lifecycle')}
            className="w-full p-3 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-base text-neutral-100 mb-1">{content[language].lifecycleTitle}</div>
                <div className="text-xs text-neutral-400">{content[language].lifecycleDesc}</div>
              </div>
              <div className="text-sm text-cyan-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('lifecycle') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('lifecycle') && (
            <div className="px-3 pb-3 border-t border-neutral-700/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityWhatIDo}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].lifecycleWhatIDoList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityTech}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].lifecycleTechList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].identityOutcomes}</div>
                <div className="text-xs text-neutral-400">{content[language].lifecycleOutcomesText}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('support')}
            className="w-full p-3 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-base text-neutral-100 mb-1">{content[language].supportTitle}</div>
                <div className="text-xs text-neutral-400">{content[language].supportDesc}</div>
              </div>
              <div className="text-sm text-cyan-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('support') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('support') && (
            <div className="px-3 pb-3 border-t border-neutral-700/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityWhatIDo}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].supportWhatIDoList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityTech}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].supportTechList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].identityOutcomes}</div>
                <div className="text-xs text-neutral-400">{content[language].supportOutcomesText}</div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <button
            onClick={() => toggleSection('monitoring')}
            className="w-full p-3 text-left hover:bg-neutral-800/20 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-base text-neutral-100 mb-1">{content[language].monitoringTitle}</div>
                <div className="text-xs text-neutral-400">{content[language].monitoringDesc}</div>
              </div>
              <div className="text-sm text-cyan-400 ml-3 transition-transform duration-200" style={{ transform: expandedSections.has('monitoring') ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>
          </button>
          {expandedSections.has('monitoring') && (
            <div className="px-3 pb-3 border-t border-neutral-700/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityWhatIDo}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].monitoringWhatIDoList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-neutral-200 mb-2 text-sm">{content[language].identityTech}</div>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    {content[language].monitoringTechList.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-medium text-neutral-200 mb-1 text-sm">{content[language].identityOutcomes}</div>
                <div className="text-xs text-neutral-400">{content[language].monitoringOutcomesText}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}