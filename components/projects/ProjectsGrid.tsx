import ProjectCard from './ProjectCard';
import type { Project } from './types';

interface ProjectsGridProps {
  projects: Project[];
  expandable?: boolean;
}

export default function ProjectsGrid({ projects, expandable = true }: ProjectsGridProps) {
  return (
    <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(420px,1fr))]">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} expandable={expandable} />
      ))}
    </div>
  );
}
