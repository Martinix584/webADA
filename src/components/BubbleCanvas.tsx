"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  swayAngle: number;
  swaySpeed: number;
  swayRange: number;
}

export function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    // Quantity matched exactly with a slightly enhanced count for rich presentation
    const maxBubbles = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // Reset helper to initialize or respawn a bubble at the bottom
    const resetBubble = (b: Partial<Bubble> = {}): Bubble => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 80 + 20,
        radius: Math.random() * 6 + 2, // Size between 2px and 8px
        speed: Math.random() * 1.5 + 0.5, // Realistic rising speed
        opacity: Math.random() * 0.25 + 0.12, // Translucency
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.005,
        swayRange: Math.random() * 1.5 + 0.5,
        ...b,
      };
    };

    // Populate initial bubbles staggered across the viewport height
    for (let i = 0; i < maxBubbles; i++) {
      bubbles.push(
        resetBubble({
          y: Math.random() * canvas.height,
        })
      );
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");

      bubbles.forEach((b) => {
        // Update physics
        b.y -= b.speed;
        b.swayAngle += b.swaySpeed;
        b.x += Math.sin(b.swayAngle) * b.swayRange;

        // Reset if off top of viewport
        if (b.y < -20) {
          Object.assign(b, resetBubble());
        }

        // 1. Draw main translucent bubble body (celeste / cyan)
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        const color = isDark
          ? `rgba(0, 210, 255, ${b.opacity})` // Glowing cyan in dark mode
          : `rgba(0, 102, 255, ${b.opacity * 1.3})`; // Rich celeste blue in light mode
        ctx.fillStyle = color;
        ctx.fill();

        // 2. Draw 3D light reflection highlight shine (white)
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius / 3,
          b.y - b.radius / 3,
          b.radius / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 1.6})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none opacity-85"
    />
  );
}
