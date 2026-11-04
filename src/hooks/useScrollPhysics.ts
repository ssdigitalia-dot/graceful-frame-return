import { useEffect } from "react";

// Fastest scroll (px per frame) treated as "full speed" for the sound-envelope math.
const MAX_V = 52;

function writeVars(root: HTMLElement, y: number, smooth: number, dir: number) {
  const max = Math.max(1, root.scrollHeight - window.innerHeight);
  const next: Record<string, string> = {
    "--sp": (Math.min(1, Math.max(0, y / max))).toFixed(3),
    "--sv": smooth.toFixed(3),
    "--sd": dir > 0 ? "1" : "-1",
    "--sy": Math.round(y).toString(),
  };
  for (const [k, v] of Object.entries(next)) {
    if (root.dataset[k] !== v) {
      root.dataset[k] = v;
      root.style.setProperty(k, v);
    }
  }
}

/**
 * Publishes scroll progress, smoothed velocity and direction as CSS custom
 * properties (--sp, --sv, --sd, --sy) so motion can follow scroll speed.
 */
export function useScrollPhysics() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--sv", "0");
      return;
    }

    let raf = 0;
    let last = window.scrollY;
    let smooth = 0;
    let dir = 1;

    const tick = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      if (delta !== 0) dir = delta > 0 ? 1 : -1;
      const target = Math.min(1, Math.abs(delta) / MAX_V);
      // Sound envelope: quick attack while scrolling, slow release when it stops.
      smooth = target > smooth ? smooth + (target - smooth) * 0.55 : smooth * 0.88;
      if (smooth < 0.002) smooth = 0;
      writeVars(root, y, smooth, dir);
      raf = requestAnimationFrame(tick);
    };

    writeVars(root, window.scrollY, 0, dir);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

/** Reveals [data-reveal] blocks as they enter view, rising from the scroll side. */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    root.classList.add("reveal-armed");

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("reveal-armed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty("--dir", root.style.getPropertyValue("--sd") === "-1" ? "-1" : "1");
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
