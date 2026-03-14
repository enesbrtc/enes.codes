import type { ProjectStatusColor } from './types';

export function getProjectStatusStyles(statusColor: ProjectStatusColor): string {
  switch (statusColor) {
    case 'emerald':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300';
    case 'purple':
      return 'border-purple-400/20 bg-purple-400/10 text-purple-300';
    case 'blue':
      return 'border-[rgba(110,168,255,0.24)] bg-[rgba(110,168,255,0.12)] text-[#b9d3ff]';
    case 'amber':
      return 'border-amber-400/20 bg-amber-400/10 text-amber-300';
    case 'cyan':
      return 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300';
    case 'violet':
      return 'border-[rgba(155,141,255,0.24)] bg-[rgba(155,141,255,0.12)] text-[#cec4ff]';
    default:
      return 'border-white/10 bg-white/[0.04] text-white/70';
  }
}
