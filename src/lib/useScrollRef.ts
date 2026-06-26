"use client";

import { useEffect, useRef, MutableRefObject } from "react";

/**
 * Tracks normalized document scroll progress (0..1) in a ref without causing
 * React re-renders — ideal for feeding into a requestAnimationFrame / useFrame
 * loop (e.g. the Three.js hero scene that animates with scroll).
 */
export function useScrollRef(): MutableRefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
