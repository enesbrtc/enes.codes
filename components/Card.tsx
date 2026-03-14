export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="surface-card p-4">
      {children}
    </div>
  );
}