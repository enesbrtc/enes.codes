export default function TechRadar() {
  const coreSystems = [
    "Identity & Access Management",
    "Enterprise Active Directory Operations",
    "Incident Response & Escalation (L2–L3)",
    "Infrastructure Monitoring & Reliability",
    "Automation for IT Operations",
    "Service Continuity & ITIL Practices",
  ];

  const productionPractice = [
    "Microsoft 365 Administration",
    "Hybrid AD Environments",
    "Windows Server Ecosystem",
    "Linux Operational Usage",
    "Citrix Virtualization",
    "Endpoint & Device Management (SCCM)",
  ];

  const currentlyExpanding = [
    "Infrastructure Automation Design",
    "FastAPI Service Integration",
    "Identity Governance & Delegation Models",
    "Containerized Internal Tools",
    "CI/CD for Internal Platforms",
    "Observability Concepts",
  ];

  return (
    <div className="text-xs border border-neutral-700/20 rounded-sm p-3 bg-neutral-900/20">
      <div className="font-semibold text-sm text-neutral-100 mb-3">Tech Radar</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-blue-400 font-bold text-xs mb-2">🟦 Core Systems</div>
          <ul className="space-y-1">
            {coreSystems.map((item) => (
              <li key={item} className="text-xs text-neutral-300 flex items-start">
                <span className="text-neutral-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-purple-400 font-bold text-xs mb-2">🟪 Production Practice</div>
          <ul className="space-y-1">
            {productionPractice.map((item) => (
              <li key={item} className="text-xs text-neutral-300 flex items-start">
                <span className="text-neutral-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-green-400 font-bold text-xs mb-2">🟨 Currently Expanding</div>
          <ul className="space-y-1">
            {currentlyExpanding.map((item) => (
              <li key={item} className="text-xs text-neutral-300 flex items-start">
                <span className="text-neutral-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
