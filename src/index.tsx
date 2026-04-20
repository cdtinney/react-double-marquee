import { useRef, useState, useEffect, useCallback } from 'react';

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

const SCROLL_WHEN_THRESHOLD: Record<'always' | 'overflow', number> = {
  always: 0,
  overflow: 100,
};

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

  // Store current props in a ref so callbacks stay stable
  const propsRef = useRef({ speed, direction, delay, childMargin, scrollWhen, loop, pauseOnHover });
  propsRef.current = { speed, direction, delay, childMargin, scrollWhen, loop, pauseOnHover };

  const [disableScroll, setDisableScroll] = useState<boolean | undefined>(undefined);

  const hasRefs = useCallback((): boolean => {
    return !!(containerRef.current && innerRef.current);
  }, []);

  const getMarqueeFillPercent = useCallback((): number => {
    if (hasRefs() && containerRef.current!.clientWidth > 0) {
      const singleChildSize = innerRef.current!.scrollWidth / 2;
      return (singleChildSize * 100) / containerRef.current!.clientWidth;
    }
    return 0;
  }, [hasRefs]);

  const shouldAnimate = useCallback((): boolean => {
    const { scrollWhen: sw } = propsRef.current;
    return (
      hasRefs() &&
      innerRef.current!.scrollWidth > containerRef.current!.clientWidth &&
      getMarqueeFillPercent() > SCROLL_WHEN_THRESHOLD[sw]
    );
  }, [hasRefs, getMarqueeFillPercent]);

  const getWidthSafely = useCallback((): number => {
    return innerRef.current ? innerRef.current.clientWidth : 0;
  }, []);

  const getInitialPosition = useCallback((): number => {
    const { direction: dir, childMargin: cm } = propsRef.current;
    return dir === 'right'
      ? -(getWidthSafely() / 2) - cm
      : -cm;
  }, [getWidthSafely]);

  const updateScrollState = useCallback(() => {
    if (hasRefs()) {
      const shouldDisable = !shouldAnimate();
      setDisableScroll((prev) => {
        if (prev !== shouldDisable) {
          if (shouldDisable && innerRef.current) {
            innerRef.current.style.transform = translateXCSS(0);
          }
          return shouldDisable;
        }
        return prev;
      });
    }
  }, [hasRefs, shouldAnimate]);

  const updateInnerPosition = useCallback(
    (timeDelta: number) => {
      const { direction: dir, speed: spd, childMargin: cm } = propsRef.current;

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
          if (nextPos < -(getWidthSafely() / 2) - cm) {
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
    [getWidthSafely, getInitialPosition, shouldAnimate],
  );

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
    updateScrollState();
  };

  // Start animation — only restarts on children or delay change
  useEffect(() => {
    posRef.current = getInitialPosition();
    if (shouldAnimate() && innerRef.current) {
      innerRef.current.style.transform = translateXCSS(posRef.current);
    }
    updateScrollState();
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
    // Only restart the animation loop when children change (new content)
    // or delay changes. Other prop changes (speed, direction, etc.) are
    // picked up on the next tick via propsRef.
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

  const showDuplicate = disableScroll !== true;

  return (
    <div
      ref={containerRef}
      style={{ overflowX: 'hidden' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={innerRef}
        style={{ display: 'inline-block' }}
      >
        <span
          style={{
            margin: disableScroll ? '0' : `0 ${childMargin}px`,
          }}
        >
          {children}
        </span>
        {showDuplicate && (
          <span
            style={{
              margin: disableScroll ? '0' : `0 ${childMargin}px`,
            }}
          >
            {children}
          </span>
        )}
      </div>
    </div>
  );
}
