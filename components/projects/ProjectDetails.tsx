interface ProjectDetailsProps {
  role?: string;
  solution?: string;
  impact?: string;
}

export default function ProjectDetails({ role, solution, impact }: ProjectDetailsProps) {
  if (!role && !solution && !impact) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-white/10 pt-4 transition-all duration-300 ease-out">
      <div className="space-y-4">
        {role && (
          <div>
            <span className="text-xs tracking-wide text-white/50">role</span>
            <p className="mt-1.5 text-sm leading-6 text-white/65">{role}</p>
          </div>
        )}
        {solution && (
          <div>
            <span className="text-xs tracking-wide text-white/50">solution</span>
            <p className="mt-1.5 text-sm leading-6 text-white/65">{solution}</p>
          </div>
        )}
        {impact && (
          <div>
            <span className="text-xs tracking-wide text-white/50">impact</span>
            <p className="mt-1.5 text-sm leading-6 text-white/65">{impact}</p>
          </div>
        )}
      </div>
    </div>
  );
}
