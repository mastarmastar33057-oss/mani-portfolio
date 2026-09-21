import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Node = { x: number; y: number; vx: number; vy: number; r: number; label?: string };

/**
 * Live "data universe" wallpaper: drifting data nodes, connecting lines,
 * a faint grid and floating numeric values. Canvas 2D for performance.
 */
export function DataUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const values = ["0.82", "1,240", "12%", "SUM", "AVG", "94", "Q3", "0.15", "SQL", "Σ"];

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const count = Math.round(Math.min(isMobile ? 34 : 90, (width * height) / 18000));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.6 + 0.7,
        ...(i % 9 === 0 ? { label: values[i % values.length] as string } : {}),
      }));
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(148, 197, 214, 0.05)";
      ctx.lineWidth = 1;
      const step = width < 768 ? 60 : 90;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      const linkDist = width < 768 ? 90 : 130;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          const f = (1 - d2 / 16000) * 0.35;
          const d = Math.sqrt(d2);
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.strokeStyle = `rgba(120, 220, 235, ${0.13 * (1 - dist / linkDist)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(140, 232, 245, 0.75)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        if (a.label) {
          ctx.font = "10px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "rgba(178, 156, 255, 0.4)";
          ctx.fillText(a.label, a.x + 6, a.y - 6);
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    setup();
    if (reduced) {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      for (const n of nodes) {
        ctx.fillStyle = "rgba(140, 232, 245, 0.5)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      render();
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_35%,var(--background)_85%)]" />
    </div>
  );
}
