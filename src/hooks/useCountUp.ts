import { useEffect, useRef, useState } from 'react';

/**
 * Count-up animation hook with easeOutExpo easing.
 * Shoots to target fast, then dramatically decelerates — maximum visual impact.
 *
 * @param target   Final number to count up to
 * @param duration Animation duration in ms (default 900)
 * @param triggered Start the animation when true
 * @param decimals  Number of decimal places to return (default 0)
 */
export const useCountUp = (
  target: number,
  duration = 900,
  triggered = false,
  decimals = 0,
): string => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!triggered) return;
    setCount(0);
    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutExpo: explosive start → dramatic halt
      const eased = progress >= 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(eased * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, target, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
};