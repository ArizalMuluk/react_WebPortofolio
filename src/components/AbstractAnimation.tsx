import { useEffect, useRef } from 'react';

const AbstractAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    // Use consistent animation speed regardless of theme
    const animationSpeed = 0.01;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      // Use a consistent fade effect that works in both themes
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;

      for (let i = 0; i < 3; i++) {
        const offset = (i * Math.PI * 2) / 3;
        const x = centerX + Math.cos(time + offset) * radius;
        const y = centerY + Math.sin(time * 1.5 + offset) * radius;

        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for (let j = 0; j < 100; j++) {
          const t = j / 100;
          const nextX = x + Math.cos(time * 2 + t * Math.PI * 2) * (radius * 0.2);
          const nextY = y + Math.sin(time * 3 + t * Math.PI * 2) * (radius * 0.2);
          ctx.lineTo(nextX, nextY);
        }

        // Use consistent hue rotation speed
        ctx.strokeStyle = `hsl(${time * 50 + i * 120}, 70%, 60%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Apply consistent animation speed
      time += animationSpeed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-2] opacity-30 dark:opacity-20"
    />
  );
};

export default AbstractAnimation;