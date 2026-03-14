import type { LucideIcon } from 'lucide-react';

export type ProjectStatusColor = 'emerald' | 'purple' | 'blue' | 'amber' | 'cyan' | 'violet';

export type ProjectLink = {
  live?: string;
  repo?: string;
};

export type Project = {
  title: string;
  status: string;
  statusColor: ProjectStatusColor;
  icon: LucideIcon;
  shortDesc: string;
  myRole?: string;
  solution?: string;
  impact?: string;
  tech: string[];
  links?: ProjectLink;
};
