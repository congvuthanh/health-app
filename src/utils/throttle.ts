/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Creates a throttled function that only invokes the provided function at most once
 * per every `wait` milliseconds.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @returns A throttled version of the function
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolled!');
 * }, 200);
 *
 * window.addEventListener('scroll', handleScroll);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (!lastRan) {
      // First call - execute immediately
      func.apply(context, args);
      lastRan = now;
    } else {
      const timeSinceLastRan = now - lastRan;

      if (timeSinceLastRan >= wait) {
        // Enough time has passed - execute immediately
        func.apply(context, args);
        lastRan = now;
      } else {
        // Clear any existing timeout
        if (timeout) {
          clearTimeout(timeout);
        }

        // Set a new timeout to execute after the remaining wait period
        timeout = setTimeout(() => {
          func.apply(context, args);
          lastRan = Date.now();
          timeout = null;
        }, wait - timeSinceLastRan);
      }
    }
  };
}
