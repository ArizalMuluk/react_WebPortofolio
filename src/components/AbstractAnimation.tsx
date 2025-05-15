import { useEffect, useRef, useState } from 'react';

const AbstractAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAlive, setIsAlive] = useState(true);

  useEffect(() => {
    if (!isAlive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isReversing = false;
    let progress = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const drawAbstractShape = (progress: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.3;

      ctx.beginPath();
      for (let i = 0; i <= progress * 360; i++) {
        const angle = (i * Math.PI) / 180;
        const radius = maxRadius * Math.sin(angle * 3) * Math.cos(time + angle);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${time * 50}, 70%, 60%)`);
      gradient.addColorStop(1, `hsl(${time * 50 + 120}, 70%, 60%)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!isReversing) {
        progress += 0.005;
        if (progress >= 1) {
          isReversing = true;
        }
      } else {
        progress -= 0.005;
        if (progress <= 0) {
          isReversing = false;
        }
      }

      drawAbstractShape(progress);
      time += 0.002;
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