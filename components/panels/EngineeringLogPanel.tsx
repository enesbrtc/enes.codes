"use client";

interface EngineeringLogPanelProps {
  language: 'en' | 'tr';
}

export default function EngineeringLogPanel({ language }: EngineeringLogPanelProps) {
  const content = {
    en: {
      title: "Notes & Experiments",
      subtitle: "Personal observations from working with systems",
      notes: [
        "Testing service-based automation patterns for identity workflows.",
        "Evaluating container workflows for internal tooling deployment.",
        "Learning alert tuning strategies to reduce monitoring noise.",
        "Exploring API design patterns for operational automation.",
        "Understanding enterprise directory synchronization challenges.",
        "Experimenting with self-service patterns for IT support.",
        "Studying incident response automation approaches.",
        "Investigating user lifecycle automation complexity.",
        "Learning about observability in distributed systems."
      ]
    },
    tr: {
      title: "Notlar & Deneyler",
      subtitle: "Sistemlerle çalışmaktan kişisel gözlemler",
      notes: [
        "Kimlik iş akışları için servis tabanlı otomasyon kalıpları test ediliyor.",
        "İç araç dağıtımı için konteyner iş akışları değerlendiriliyor.",
        "İzleme gürültüsünü azaltmak için uyarı ayarlama stratejileri öğreniliyor.",
        "Operasyonel otomasyon için API tasarım kalıpları keşfediliyor.",
        "Kurumsal dizin senkronizasyon zorlukları anlaşılıyor.",
        "BT desteği için self-servis kalıpları deneniyor.",
        "Olay müdahalesi otomasyon yaklaşımları inceleniyor.",
        "Kullanıcı yaşam döngüsü otomasyon karmaşıklığı araştırılıyor.",
        "Dağıtık sistemlerde gözlemlenebilirlik hakkında öğreniliyor."
      ]
    }
  };
  return (
    <div className="space-y-3 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold neon-text glitch-text mb-1">{content[language].title}</h2>
        <p className="text-xs text-neutral-400">{content[language].subtitle}</p>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border-l-4 border-blue-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[0]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border-l-4 border-green-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[1]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-lg border-l-4 border-purple-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[2]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg border-l-4 border-orange-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[3]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg border-l-4 border-red-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[4]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border-l-4 border-cyan-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[5]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border-l-4 border-yellow-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[6]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg border-l-4 border-pink-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[7]}
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border-l-4 border-indigo-400/60">
          <div className="text-xs text-neutral-300">
            {content[language].notes[8]}
          </div>
        </div>
      </div>
    </div>
  );
}