import ProjectsGrid from './ProjectsGrid';
import type { Project } from './types';

interface ProjectsSectionProps {
  title: string;
  subtitle?: string;
  projects: Project[];
  expandable?: boolean;
}

export default function ProjectsSection({ title, subtitle, projects, expandable = true }: ProjectsSectionProps) {
  return (
    <section className="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6 lg:px-10">
      <div className="mb-8 space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
      </div>
      <ProjectsGrid projects={projects} expandable={expandable} />
    </section>
  );
}
