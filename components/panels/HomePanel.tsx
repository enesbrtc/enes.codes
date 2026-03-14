"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Code2,
  Cog,
  GitBranch,
  Settings,
} from 'lucide-react';
import avatarImage from '@/components/avatar/avatar.png';

const focusTags = [
  'Automation',
  'Identity Systems',
  'Platform Engineering',
  'Developer Tooling',
];

const quickStats = [
  { value: '3', label: 'Production Systems' },
  { value: '5+', label: 'Automation Workflows' },
  { value: '4', label: 'Internal Tools' },
];

const engineeringFocus = [
  {
    title: 'Workflow Automation Platforms',
    description: 'Process-driven systems coordinating approvals, provisioning, and operational workflows.',
    icon: Cog,
  },
  {
    title: 'Internal Operations Tools',
    description: 'Interfaces for support teams and internal operators that centralize repetitive tasks into dependable flows.',
    icon: Settings,
  },
  {
    title: 'API Integrations',
    description: 'Reliable integrations connecting services, automations, and external systems into a cohesive internal platform.',
    icon: GitBranch,
  },
  {
    title: 'Developer Tooling',
    description: 'Utility layers, debug surfaces, and engineering support tools designed for speed and clarity.',
    icon: Code2,
  },
];

const skillGroups = [
  {
    title: 'Backend Engineering',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'OpenAPI'],
  },
  {
    title: 'Platform & DevOps',
    skills: ['Docker', 'CI/CD', 'Linux', 'Observability'],
  },
  {
    title: 'Automation & Integration',
    skills: ['PowerShell', 'Python', 'Microsoft Graph', 'REST APIs'],
  },
  {
    title: 'Infrastructure',
    skills: ['Active Directory', 'Azure', 'Redis', 'Vercel'],
  },
];

export default function HomePanel() {
  return (
    <div className="animate-fade-in">
      <div className="mx-auto mt-6 max-w-[1200px] space-y-14 px-0 pb-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="surface-card mx-auto max-w-[980px] p-5 sm:p-6"
        >
          <div className="grid gap-5 lg:grid-cols-[140px_minmax(0,1.35fr)_minmax(260px,0.9fr)] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border-2 border-[rgba(120,160,255,0.25)] bg-[rgba(255,255,255,0.04)] p-1.5 shadow-[0_16px_32px_rgba(0,0,0,0.18)]">
                <Image
                  src={avatarImage}
                  alt="Enes Barutcu"
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="min-w-0 space-y-4">
              <div className="space-y-2">
                <p className="section-kicker text-xs">Engineering Profile</p>
                <div className="space-y-1">
                  <h1 className="text-2xl font-semibold text-foreground sm:text-[1.75rem]">Enes Barutcu</h1>
                  <p className="text-sm font-medium text-foreground/90">Application Support Engineer</p>
                  <p className="text-sm text-muted-foreground">Adesso — Lidl Schwarz Project</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {focusTags.map((tag) => (
                  <span key={tag} className="panel-chip px-2.5 py-1 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-tile p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="section-kicker text-xs">Impact Metrics</p>
                  <p className="panel-copy text-sm">Clear signals of delivery across production systems, automation work, and internal tooling.</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="min-w-0">
                      <p className="text-2xl font-semibold leading-none text-foreground">{stat.value}</p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <p className="section-kicker text-xs">Engineering Focus</p>
            <h2 className="text-xl font-semibold text-foreground">The kinds of systems this engineer builds.</h2>
            <p className="panel-copy max-w-3xl text-sm leading-6">A compact capability view focused on operational reliability, workflow automation, integrations, and internal engineering support.</p>
          </div>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {engineeringFocus.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="panel-tile p-5 sm:p-6">
                  <div className="space-y-3.5">
                    <div className="panel-icon flex h-10 w-10 items-center justify-center">
                      <Icon className="h-[18px] w-[18px] text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="panel-copy text-sm leading-6">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <p className="section-kicker text-xs">Core Skills</p>
            <h2 className="text-xl font-semibold text-foreground">A practical stack for automation, backend systems, and platform operations.</h2>
          </div>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {skillGroups.map((group) => (
              <article key={group.title} className="panel-tile p-5 sm:p-6">
                <div className="space-y-3.5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground/92">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="panel-chip px-2.5 py-1 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
