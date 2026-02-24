export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2.5 sm:p-3 lg:p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
      {children}
    </div>
  );
}