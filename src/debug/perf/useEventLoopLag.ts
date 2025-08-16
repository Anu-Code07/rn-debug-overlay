import { useEffect, useState } from 'react';
export function useEventLoopLag(enabled = true, interval = 200) {
  const [lag, setLag] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let expected = Date.now() + interval;
    const id = setInterval(() => {
      const now = Date.now();
      const drift = now - expected;
      expected = now + interval;
      setLag(Math.max(0, drift));
    }, interval);
    return () => clearInterval(id);
  }, [enabled, interval]);
  return lag;
}