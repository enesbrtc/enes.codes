import ProjectCard from './ProjectCard';
import type { Project } from './types';

interface ProjectsGridProps {
  projects: Project[];
  expandable?: boolean;
}

export default function ProjectsGrid({ projects, expandable = true }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} expandable={expandable} />
      ))}
    </div>
  );
}
