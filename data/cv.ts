export const cv = {
  name: "ENES BARUTCU",
  location: "Istanbul",
  phone: "+90 534 424 6888",
  email: "enesbrtc@gmail.com",
  title: "Hybrid IT Ops + Automation Engineer",
  tagline: "I design automation that keeps infrastructure running.",
  summary:
    "Infrastructure & Identity engineer with 5+ years owning Active Directory, Microsoft 365 and 24/7 production services. Focused on automation-first solutions, monitoring, incident response and driving operational ownership.",
  experience: [
    {
      company: "TAV Technologies",
      date: "08/2022 - 03/2025",
      role: "IT Operations / NOC Specialist",
      bullets: [
        "Managed 1200+ user identities across enterprise environment — reduced manual provisioning time by automating AD workflows.",
        "Reduced incident resolution time by 35% through runbook improvements and alert tuning for NOC teams.",
        "Automated onboarding workflows (PowerShell/Python) — scaled onboarding to support 3 locations with zero backlog.",
      ],
    },
    {
      company: "BSH Home Appliances Group",
      date: "09/2021 - 08/2022",
      role: "IT Support Specialist",
      bullets: [
        "Restructured AD group policies for 800+ endpoints — improved compliance reporting and reduced helpdesk tickets by 22%.",
        "Automated common support tasks with scripts — saved ~10 hours/week across the support team.",
      ],
    },
    {
      company: "Coca-Cola CCI",
      date: "05/2021 - 09/2021",
      role: "ServiceDesk Specialist",
      bullets: [
        "Handled 200+ monthly incidents, achieving SLA targets while improving first-contact resolution.",
      ],
    },
  ],
  education: [
    { school: "Istanbul Bilgi University", degree: "Associate Degree – Graphic Design", date: "01/2017 - 01/2019" },
    { school: "Anadolu University", degree: "Bachelor of Education – English Language & Literature", date: "01/2013 - 01/2017" },
  ],
  certifications: ["Foundations of Cybersecurity (Google)", "CCNA (Cisco)", "ITIL Foundation"],
  coreCompetencies: [
    "Active Directory & Identity Management",
    "Incident Response & Escalation Management (L2–L3)",
    "Monitoring & Alerting",
    "Automation & Scripting",
    "Troubleshooting Ownership",
    "ITIL-based Service Management",
    "Microsoft 365 Administration",
    "24/7 Monitoring & NOC Operations",
  ],
  systems: ["Active Directory", "Citrix", "Linux", "Microsoft 365", "SCCM", "Windows"],
  networking: ["DHCP", "DNS", "LAN/WAN", "TCP/IP", "VPN"],
  monitoring: ["Zabbix", "Event & Alert Analysis", "NOC Tools"],
  tools: ["ServiceNow", "4me", "HPSM", "Jira", "Slack"],
  scripting: ["Bash", "basic Python", "PowerShell"],
  apps: ["Avaya", "Oracle", "SAP"],
  design: ["Photoshop", "Illustrator", "InDesign", "After Effects", "HTML/CSS"],
  stats: { INT: 72, REF: 60, TECH: 78, COOL: 70, EMP: 75 },
  cyberware: ["Identity Shield v2", "Endpoint Sentinel Proxy", "Audit Trace Nucleus"],
  automationProjects: [
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
  ],
  suggestedRoles: ["Infrastructure & IAM Engineer", "IAM Engineer", "Platform / DevOps (entry-mid)"],
  primaryRole: "Infrastructure & IAM Engineer",
  systemsOwned: [
    "Managed enterprise AD environment (1,200+ users) with delegated ownership and automation",
    "Maintained 24/7 operations platform for airport systems",
    "Identity lifecycle governance across AD and M365",
  ],
  recentActivity: [
    "Built internal onboarding automation (AD + Graph) — deployed to production",
    "Implemented containerized helper tools for NOC automation",
    "Learning: FastAPI async patterns and CI/CD best practices",
  ],
  learningLog: [
    "2026-02: FastAPI integration patterns",
    "2026-01: Advanced AD delegation and governance",
  ],
};

export default cv;
