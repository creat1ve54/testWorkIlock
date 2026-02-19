import { useRef } from "react";

export function useDebounce<F extends (...args: any[]) => any>(
  callback: F,
  delay: number,
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<F>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };
}
