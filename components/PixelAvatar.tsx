"use client";

import { useEffect, useRef, useState } from 'react';

interface PixelAvatarProps {
  src: string;
  size?: number;
  pixelSize?: number;
  className?: string;
}

export default function PixelAvatar({
  src,
  size = 120,
  pixelSize = 4,
  className = ""
}: PixelAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Set canvas size
      const pixelWidth = Math.floor(size / pixelSize);
      const pixelHeight = Math.floor(size / pixelSize);
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;

      // Create temporary canvas for image processing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = pixelWidth;
      tempCanvas.height = pixelHeight;

      // Draw and pixelate image
      tempCtx.drawImage(img, 0, 0, pixelWidth, pixelHeight);

      // Apply pixelation effect
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, pixelWidth, pixelHeight);

      // Get image data for color manipulation
      const imageData = ctx.getImageData(0, 0, pixelWidth, pixelHeight);
      const data = imageData.data;

      // Apply subtle color adjustments for engineering theme
      for (let i = 0; i < data.length; i += 4) {
        // Slight blue tint for tech feel
        data[i] = Math.min(255, data[i] * 1.05); // Red
        data[i + 1] = Math.min(255, data[i + 1] * 1.02); // Green
        data[i + 2] = Math.min(255, data[i + 2] * 1.1); // Blue
      }

      ctx.putImageData(imageData, 0, 0);
      setIsLoaded(true);
    };

    img.src = src;
  }, [src, size, pixelSize]);

  // Subtle animation loop for breathing effect
  useEffect(() => {
    if (!isLoaded) return;

    const animate = () => {
      setAnimationFrame(prev => (prev + 1) % 120); // 2-second cycle at 60fps
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isLoaded]);

  const breathingScale = 1 + Math.sin(animationFrame * 0.052) * 0.02; // Subtle breathing

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-lg border border-border bg-card"
        style={{
          width: size,
          height: size,
          transform: `scale(${breathingScale})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            imageRendering: 'pixelated',
          }}
        />

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-20 blur-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))',
          transform: `scale(${breathingScale})`,
        }}
      />
    </div>
  );
}