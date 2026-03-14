interface ProjectTagsProps {
  tech: string[];
}

export default function ProjectTags({ tech }: ProjectTagsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
