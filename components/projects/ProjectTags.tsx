interface ProjectTagsProps {
  tech: string[];
}

export default function ProjectTags({ tech }: ProjectTagsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-[6px]">
      {tech.map((item) => (
        <span
          key={item}
          className="max-w-full rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
