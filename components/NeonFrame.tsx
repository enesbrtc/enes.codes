export default function NeonFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
      >
        <style>{`
          @keyframes stroke-animation {
            0%, 100% { stroke-dashoffset: 1000; }
            50% { stroke-dashoffset: 0; }
          }
          .neon-stroke {
            stroke: url(#neon-gradient);
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 1000;
            animation: stroke-animation 4s ease-in-out infinite;
            filter: drop-shadow(0 0 8px rgba(0,255,65,0.8));
          }
        `}</style>
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff41" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00ff41" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* Top-left to top-right */}
        <path d="M 20 20 L 380 20" className="neon-stroke" />
        {/* Top-right to bottom-right */}
        <path d="M 380 20 L 380 480" className="neon-stroke" style={{ animationDelay: "0.3s" }} />
        {/* Bottom-right to bottom-left */}
        <path d="M 380 480 L 20 480" className="neon-stroke" style={{ animationDelay: "0.6s" }} />
        {/* Bottom-left to top-left */}
        <path d="M 20 480 L 20 20" className="neon-stroke" style={{ animationDelay: "0.9s" }} />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
