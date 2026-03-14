import type { LucideIcon } from 'lucide-react';

interface ProjectCardHeaderProps {
  icon: LucideIcon;
  title: string;
  status: string;
  statusClassName: string;
}

export default function ProjectCardHeader({ icon: Icon, title, status, statusClassName }: ProjectCardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="panel-icon flex h-10 w-10 flex-none items-center justify-center">
          <Icon className="h-[18px] w-[18px] text-accent" />
        </div>
        <h3 className="min-w-0 flex-1 whitespace-normal break-words text-base font-semibold leading-[1.3] line-clamp-2 text-foreground [word-break:normal] [overflow-wrap:break-word]">
          {title}
        </h3>
      </div>
      <span className={`ml-3 inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusClassName}`}>
        {status}
      </span>
    </div>
  );
}
