export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-16">
      {children}
    </div>
  );
}