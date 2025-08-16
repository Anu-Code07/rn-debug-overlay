import { useEffect, useRef, useState } from 'react';
export function useFps(enabled = true) {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const last = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled || typeof requestAnimationFrame === 'undefined') return;
    const loop = (t: number) => {
      frames.current++;
      if (t - last.current >= 1000) { setFps(frames.current); frames.current = 0; last.current = t; }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current != null) cancelAnimationFrame(raf.current); };
  }, [enabled]);
  return fps;
}