"use client";

import { motion } from 'framer-motion';
import ProjectsSection from '@/components/projects/ProjectsSection';
import { allProjects } from '@/components/projects/projectData';

export default function ProjectsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <ProjectsSection
        title="Projects"
        subtitle="From concepts to production systems"
        projects={allProjects}
      />
    </motion.div>
  );
}
