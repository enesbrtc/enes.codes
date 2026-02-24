export default function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-neutral-800/40 border border-neutral-700">
      <div className="text-xs text-neutral-300">{label}</div>
      <div className="w-16 h-3 bg-neutral-900 rounded overflow-hidden">
        <div style={{ width: `${value}%`, background: "linear-gradient(90deg,var(--neon-green),var(--neon-red))" }} className="h-3" />
      </div>
      <div className="text-xs text-neutral-400">{value}</div>
    </div>
  );
}
