export default function Avatar({
  src = "https://api.dicebear.com/6.x/pixel-art/png?seed=Enes&scale=90",
  alt = "avatar",
  size = 90,
  fallback = "EB",
}: {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
}) {
  const hasSrc = Boolean(src);

  return (
    <div className="relative w-[96px] h-[96px] rounded-lg overflow-hidden glow bg-neutral-900 flex items-center justify-center flex-shrink-0">
      {hasSrc ? (
        // use plain img to allow external sources without next.config
        <img src={src} alt={alt} width={size} height={size} className="object-cover w-full h-full" />
      ) : (
        <div className="text-xl font-bold text-neutral-100">{fallback}</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-30" />
    </div>
  );
}
