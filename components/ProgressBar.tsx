export default function ProgressBar({
  value,
}: {
  value: number;
}) {
  return (
    <>
      <style>{`
        @keyframes cyber-load {
          0% {
            width: 0%;
            box-shadow: 0 0 8px rgba(0, 128, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 12px rgba(0, 128, 255, 0.8), 0 0 20px rgba(255, 0, 128, 0.3);
          }
          100% {
            box-shadow: 0 0 8px rgba(0, 128, 255, 0.5);
          }
        }
        
        .progress-bar-fill {
          animation: cyber-load 1.2s ease-out forwards;
          height: 100%;
          background: linear-gradient(90deg, rgba(0, 128, 255, 0.8), rgba(0, 128, 255, 1), rgba(255, 0, 128, 0.6));
          box-shadow: 0 0 8px rgba(0, 128, 255, 0.6), inset 0 0 8px rgba(0, 128, 255, 0.3);
          border-right: 2px solid rgba(0, 128, 255, 0.8);
          position: relative;
        }
        
        .progress-bar-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(0, 128, 255, 0.8), transparent);
          box-shadow: 0 0 8px rgba(0, 128, 255, 0.8);
        }
      `}</style>
      <div className="h-2 bg-neutral-900 rounded overflow-hidden border border-neutral-700/30">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${value}%` }}
        />
      </div>
    </>
  );
}
