import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const LABELS = ["EXCEL", "SQL", "POWER BI", "DATA CLEANING", "DASHBOARDS"];

/**
 * Interactive 3D data sphere rendered with projected points on canvas 2D:
 * data points, connecting lines, tiny bar charts and numeric values.
 */
export function DataSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    let raf = 0;
    let t = 0;
    const tilt = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const COUNT = window.innerWidth < 768 ? 90 : 170;
    const pts = Array.from({ length: COUNT }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        bar: i % 11 === 0,
        num: i % 17 === 0 ? `${(Math.random() * 100).toFixed(0)}` : null,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.min(rect.width, rect.height);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const R = size * 0.36;

      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;

      const ay = t + tilt.x;
      const ax = 0.35 + tilt.y;

      const proj = pts.map((p) => {
        let x = p.x * Math.cos(ay) - p.z * Math.sin(ay);
        let z = p.x * Math.sin(ay) + p.z * Math.cos(ay);
        const y = p.y * Math.cos(ax) - z * Math.sin(ax);
        z = p.y * Math.sin(ax) + z * Math.cos(ax);
        const scale = 1 / (2.6 - z);
        return {
          sx: cx + x * R * scale * 2.2,
          sy: cy + y * R * scale * 2.2,
          depth: (z + 1) / 2,
          bar: p.bar,
          num: p.num,
        };
      });

      for (let i = 0; i < proj.length; i++) {
        const a = proj[i]!;
        for (let j = i + 1; j < i + 5 && j < proj.length; j++) {
          const b = proj[j]!;
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (dist < R * 0.7) {
            ctx.strokeStyle = `rgba(126, 220, 236, ${0.16 * a.depth})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      for (const p of proj) {
        const alpha = 0.25 + p.depth * 0.7;
        ctx.fillStyle = `rgba(150, 236, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1 + p.depth * 1.9, 0, Math.PI * 2);
        ctx.fill();

        if (p.bar) {
          ctx.fillStyle = `rgba(178, 156, 255, ${alpha * 0.85})`;
          for (let k = 0; k < 3; k++) {
            const h = (4 + ((k * 5 + 6) % 11)) * p.depth;
            ctx.fillRect(p.sx + k * 3.4, p.sy - h, 2.2, h);
          }
        }
        if (p.num) {
          ctx.font = "9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(230, 240, 255, ${alpha * 0.55})`;
          ctx.fillText(p.num, p.sx + 5, p.sy - 4);
        }
      }

      ctx.strokeStyle = "rgba(126, 220, 236, 0.14)";
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.2 * (1 / 1.6), 0, Math.PI * 2);
      ctx.stroke();
    };

    const loop = () => {
      t += 0.0022;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };

    resize();
    if (reduced) {
      draw();
    } else {
      loop();
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", () => {
      resize();
      draw();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div className="relative aspect-square w-full max-w-[440px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Rotating three-dimensional sphere built from data points, connecting lines and tiny charts"
      />
      {LABELS.map((label, i) => {
        const angle = (i / LABELS.length) * Math.PI * 2 - Math.PI / 2;
        const top = 50 + Math.sin(angle) * 43;
        const left = 50 + Math.cos(angle) * 43;
        return (
          <span
            key={label}
            style={{ top: `${top}%`, left: `${left}%` }}
            className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest text-primary sm:text-xs"
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
