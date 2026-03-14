"use client";

import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectDetails from './ProjectDetails';
import ProjectTags from './ProjectTags';
import { getProjectStatusStyles } from './statusStyles';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  expandable?: boolean;
}

export default function ProjectCard({ project, expandable = true }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isExpandable = expandable && Boolean(project.myRole || project.solution || project.impact);

  return (
    <article
      className="panel-tile flex w-full min-w-0 flex-col gap-4 p-6"
      role={isExpandable ? 'button' : undefined}
      tabIndex={isExpandable ? 0 : undefined}
      aria-expanded={isExpandable ? expanded : undefined}
      onClick={isExpandable ? () => setExpanded((value) => !value) : undefined}
      onKeyDown={
        isExpandable
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setExpanded((value) => !value);
              }
            }
          : undefined
      }
    >
      <ProjectCardHeader
        icon={project.icon}
        title={project.title}
        status={project.status}
        statusClassName={getProjectStatusStyles(project.statusColor)}
      />

      <p className="panel-copy mt-1 text-sm leading-6">{project.shortDesc}</p>

      <ProjectTags tech={project.tech} />

      {(project.links?.live || project.links?.repo) && (
        <div className="mt-4 flex flex-wrap gap-4">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-action inline-flex items-center gap-1 text-xs transition-colors hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
          )}
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-action inline-flex items-center gap-1 text-xs transition-colors hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              <Github className="h-3 w-3" />
              Code
            </a>
          )}
        </div>
      )}

      {isExpandable && expanded && (
        <ProjectDetails
          role={project.myRole}
          solution={project.solution}
          impact={project.impact}
        />
      )}
    </article>
  );
}
