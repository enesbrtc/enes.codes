import cv from '@/data/cv';

export function createPortfolioFileContents() {
  return {
    about: [
      'Enes Barutcu',
      'Application Support Engineer',
      'Adesso — Lidl Schwarz Project',
      '',
      'Builds automation, internal platforms, and developer-facing systems',
      'for operational reliability, support efficiency, and scalable tooling.',
    ].join('\n'),
    skills: [
      'Backend Engineering',
      '  Node.js, TypeScript, PostgreSQL, OpenAPI',
      '',
      'Platform & DevOps',
      '  Docker, CI/CD, Linux, Observability',
      '',
      'Automation & Integration',
      '  PowerShell, Python, Microsoft Graph, REST APIs',
      '',
      'Infrastructure',
      '  Active Directory, Azure, Redis, Vercel',
    ].join('\n'),
    contact: [
      `email    ${cv.email}`,
      `github   ${cv.github}`,
      `linkedin ${cv.linkedin}`,
    ].join('\n'),
  };
}
