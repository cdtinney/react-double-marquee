import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';

export interface MarqueeProps {
  /** Animation speed, in pixels per millisecond. Defaults to 0.04. */
  speed?: number;
  /** Direction of movement. Defaults to 'right'. */
  direction?: 'left' | 'right';
  /** Delay before animation starts, in milliseconds. Defaults to 3000. */
  delay?: number;
  /** Horizontal margin between children, in pixels. Defaults to 15. */
  childMargin?: number;
  /** Children to render. */
  children?: React.ReactNode;
  /** When scrolling is enabled. 'always' or 'overflow'. Defaults to 'always'. */
  scrollWhen?: 'always' | 'overflow';
  /** Pause scrolling on mouse hover. Defaults to false. */
  pauseOnHover?: boolean;
  /** Number of loops before stopping. Defaults to Infinity. */
  loop?: number;
}

function translateXCSS(numPx: number): string {
  return `translateX(${numPx}px)`;
}

export default function Marquee({
  speed = 0.04,
  direction = 'right',
  delay = 3000,
  childMargin = 15,
  children = null,
  scrollWhen = 'always',
  pauseOnHover = false,
  loop = Infinity,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number>(0);
  const lastTickTimeRef = useRef<number | null>(null);
  const requestIdRef = useRef<number | null>(null);
  const loopCountRef = useRef<number>(0);
  const pausedRef = useRef<boolean>(false);

  const propsRef = useRef({ speed, direction, delay, childMargin, scrollWhen, loop, pauseOnHover });
  propsRef.current = { speed, direction, delay, childMargin, scrollWhen, loop, pauseOnHover };

  // tileCount is the number of copies of `children` actually rendered.
  // For 'always' mode it grows to fill the container; for 'overflow' mode
  // it is 1 (no overflow) or 2 (overflow).
  const [tileCount, setTileCount] = useState(2);
  const tileCountRef = useRef(2);
  tileCountRef.current = tileCount;

  const hasRefs = useCallback((): boolean => {
    return !!(containerRef.current && innerRef.current);
  }, []);

  const getTileWidth = useCallback((): number => {
    if (!innerRef.current || tileCountRef.current === 0) return 0;
    return innerRef.current.scrollWidth / tileCountRef.current;
  }, []);

  const shouldAnimate = useCallback((): boolean => {
    if (!hasRefs()) return false;
    return innerRef.current!.scrollWidth > containerRef.current!.clientWidth;
  }, [hasRefs]);

  const getInitialPosition = useCallback((): number => {
    const { direction: dir, childMargin: cm } = propsRef.current;
    const tileWidth = getTileWidth();
    return dir === 'right' ? -tileWidth - cm : -cm;
  }, [getTileWidth]);

  const updateInnerPosition = useCallback(
    (timeDelta: number) => {
      const { direction: dir, speed: spd, childMargin: cm } = propsRef.current;
      const tileWidth = getTileWidth();

      const nextPosX = (() => {
        if (dir === 'right') {
          const nextPos = posRef.current + timeDelta * spd;
          if (nextPos > -cm) {
            loopCountRef.current += 1;
            return getInitialPosition();
          }
          return nextPos;
        }
        if (dir === 'left') {
          const nextPos = posRef.current - timeDelta * spd;
          if (nextPos < -tileWidth - cm) {
            loopCountRef.current += 1;
            return getInitialPosition();
          }
          return nextPos;
        }
        return posRef.current;
      })();

      posRef.current = nextPosX;

      if (shouldAnimate() && innerRef.current) {
        innerRef.current.style.transform = translateXCSS(posRef.current);
      }
    },
    [getTileWidth, getInitialPosition, shouldAnimate],
  );

  // Resets transform when content stops needing to scroll.
  const syncScrollState = useCallback(() => {
    if (!hasRefs()) return;
    if (!shouldAnimate() && innerRef.current) {
      innerRef.current.style.transform = translateXCSS(0);
    }
  }, [hasRefs, shouldAnimate]);

  // Measure container/content and choose how many tiles to render.
  // Re-runs when content changes or the container is resized.
  useLayoutEffect(() => {
    if (!hasRefs()) return;

    const adjust = () => {
      if (!hasRefs()) return;
      const { scrollWhen: sw } = propsRef.current;
      const containerWidth = containerRef.current!.clientWidth;
      const tileWidth = getTileWidth();
      if (tileWidth <= 0 || containerWidth <= 0) return;

      const needed = sw === 'overflow'
        ? (tileWidth > containerWidth ? 2 : 1)
        : Math.max(2, Math.ceil(containerWidth / tileWidth) + 1);

      if (needed !== tileCountRef.current) {
        setTileCount(needed);
      }
      syncScrollState();
    };

    adjust();

    if (typeof ResizeObserver === 'undefined') return;
    const obs = new ResizeObserver(adjust);
    obs.observe(containerRef.current!);
    obs.observe(innerRef.current!);
    return () => obs.disconnect();
  }, [children, scrollWhen, hasRefs, getTileWidth, syncScrollState]);

  // Stable tick function — reads props from ref, never recreated
  const tickRef = useRef<FrameRequestCallback | null>(null);
  tickRef.current = (time: number) => {
    const { loop: maxLoops } = propsRef.current;

    if (pausedRef.current || loopCountRef.current >= maxLoops) {
      requestIdRef.current = window.requestAnimationFrame(tickRef.current!);
      return;
    }

    if (lastTickTimeRef.current !== null) {
      updateInnerPosition(time - lastTickTimeRef.current);
    }

    lastTickTimeRef.current = time;
    requestIdRef.current = window.requestAnimationFrame(tickRef.current!);
  };

  useEffect(() => {
    posRef.current = getInitialPosition();
    if (shouldAnimate() && innerRef.current) {
      innerRef.current.style.transform = translateXCSS(posRef.current);
    }
    syncScrollState();
    loopCountRef.current = 0;
    lastTickTimeRef.current = null;

    const timeoutId = setTimeout(() => {
      requestIdRef.current = window.requestAnimationFrame(tickRef.current!);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (requestIdRef.current !== null) {
        window.cancelAnimationFrame(requestIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, delay]);

  const handleMouseEnter = useCallback(() => {
    if (propsRef.current.pauseOnHover) {
      pausedRef.current = true;
      lastTickTimeRef.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (propsRef.current.pauseOnHover) {
      pausedRef.current = false;
    }
  }, []);

  // When only one tile is rendered (no overflow in 'overflow' mode), drop
  // margins so the single copy can be centered by parent layout.
  const tileMargin = tileCount === 1 ? '0' : `0 ${childMargin}px`;

  return (
    <div
      ref={containerRef}
      style={{ overflowX: 'hidden' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} style={{ display: 'inline-block' }}>
        {Array.from({ length: tileCount }).map((_, i) => (
          <span key={i} style={{ margin: tileMargin }}>
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}
