import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a, button, input, textarea, [role='button']");
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? "48px" : "30px";
        ringRef.current.style.height = interactive ? "48px" : "30px";
        ringRef.current.style.opacity = interactive ? "0.9" : "0.5";
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    tick();
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="absolute -ml-[15px] -mt-[15px] h-[30px] w-[30px] rounded-full border border-primary/60 transition-[width,height,opacity] duration-200"
      />
      <div ref={dotRef} className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]" />
    </div>
  );
}
