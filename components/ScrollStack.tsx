"use client";

import React, {
  ReactNode,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Lenis from "lenis";

// ----- Types -----
export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[24rem] md:min-h-[36rem] my-2 md:my-8 px-4 py-8 sm:px-6 sm:py-10 md:p-16 rounded-3xl md:rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.12)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number; // reserved
  rotationAmount?: number;
  blurAmount?: number; // disarankan 0 untuk performa
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

// Hindari any untuk Lenis
interface LenisLike {
  raf: (t: number) => void;
  readonly scroll: number;
  destroy: () => void;
}
type LenisCtor = new (options?: Record<string, unknown>) => LenisLike;

// ----- Component -----
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5, // reserved
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lenisRef = useRef<LenisLike | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);
  interface TransformState {
    translateY: number;
    scale: number;
    rotation: number;
    blur: number;
  }
  // ✅ Map disimpan di ref dan selalu diakses via .current
  const lastTransformsRef = useRef<Map<number, TransformState>>(new Map());

  // Cached measurement
  const measuredTopsRef = useRef<number[]>([]);
  const endTopRef = useRef<number>(0);
  const containerHRef = useRef<number>(0);
  const dprRef = useRef<number>(1);
  const remeasureScheduledRef = useRef(false);

  const useFilter = blurAmount > 0;

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return Number(value);
    },
    []
  );

  const getScrollY = useCallback(() => {
    if (lenisRef.current) return lenisRef.current.scroll;
    return useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
  }, [useWindowScroll]);

  const measure = useCallback(() => {
    dprRef.current = window.devicePixelRatio || 1;

    const scroller = scrollerRef.current;
    const cards = (useWindowScroll
      ? (document.querySelectorAll(
          ".scroll-stack-card"
        ) as NodeListOf<HTMLElement>)
      : (scroller?.querySelectorAll(
          ".scroll-stack-card"
        ) as NodeListOf<HTMLElement> | null)) as
      | NodeListOf<HTMLElement>
      | [];

    cardsRef.current = Array.from(cards);

    const containerH = useWindowScroll
      ? window.innerHeight
      : scroller?.clientHeight || 0;
    containerHRef.current = containerH;

    const currentScroll = getScrollY();

    // Absolut top (window-mode) / relatif (scroller-mode)
    measuredTopsRef.current = cardsRef.current.map((el) => {
      if (useWindowScroll) {
        const rect = el.getBoundingClientRect();
        return rect.top + currentScroll;
      }
      return el.offsetTop;
    });

    // End marker
    const endEl = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (scroller?.querySelector(".scroll-stack-end") as HTMLElement | null);

    if (endEl) {
      if (useWindowScroll) {
        const rect = endEl.getBoundingClientRect();
        endTopRef.current = rect.top + currentScroll;
      } else {
        endTopRef.current = endEl.offsetTop;
      }
    } else {
      endTopRef.current = 0;
    }
  }, [getScrollY, useWindowScroll]);

  const calculateProgress = useCallback((v: number, start: number, end: number) => {
    if (v <= start) return 0;
    if (v >= end) return 1;
    return (v - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = getScrollY();
    const containerHeight = containerHRef.current;
    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPosPx = parsePercentage(scaleEndPosition, containerHeight);
    const endTop = endTopRef.current;
    const dpr = dprRef.current;

    // Quantizer anti-jitter
    const q = (v: number, precision = 1) =>
      Math.round(v * dpr * precision) / (dpr * precision);

    // index kartu teratas (di depan)
    let topIdx = 0;
    for (let j = 0; j < cards.length; j++) {
      const jTop = measuredTopsRef.current[j] ?? 0;
      const jStart = jTop - stackPosPx - itemStackDistance * j;
      if (scrollTop >= jStart) topIdx = j;
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = measuredTopsRef.current[i] ?? 0;

      // Scale timing
      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPosPx;

      // Pin timing
      const pinStart = cardTop - stackPosPx - itemStackDistance * i;
      const pinEnd = endTop - containerHeight / 2;

      // Scale & rotation
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Depth blur (di belakang top-card) — disarankan 0 untuk perf
      let blur = 0;
      if (useFilter && i < topIdx) {
        const depth = topIdx - i;
        blur = Math.max(0, depth * blurAmount);
      }

      // TranslateY (pin)
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      // Quantize
      const next: TransformState = {
        translateY: q(translateY, 1),
        scale: q(scale, 1000),
        rotation: q(rotation, 100),
        blur: Math.max(0, Math.round(blur)),
      };

      const prev = lastTransformsRef.current.get(i);
      const changed =
        !prev ||
        Math.abs(prev.translateY - next.translateY) > 0.01 ||
        Math.abs(prev.scale - next.scale) > 0.0005 ||
        Math.abs(prev.rotation - next.rotation) > 0.05 ||
        prev.blur !== next.blur;

      if (changed) {
        const transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`;
        if (card.style.transform !== transform) {
          card.style.transform = transform;
        }

        if (useFilter) {
          const filter = `blur(${next.blur}px)`;
          if (card.style.filter !== filter) {
            card.style.filter = filter;
          }
        }

        lastTransformsRef.current.set(i, next);
      }

      // onStackComplete saat kartu terakhir ter-pin
      if (i === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }
  }, [
    getScrollY,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    useFilter,
  ]);

  // Lenis setup dengan rAF tunggal
  const startRaf = useCallback(() => {
    const loop = (t: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(t);
      }
      updateCardTransforms();
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);
  }, [updateCardTransforms]);

  const stopRaf = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const setupLenis = useCallback(() => {
    const LenisClass = Lenis as unknown as LenisCtor;

    if (useWindowScroll) {
      const lenis = new LenisClass({
        duration: 1.0,
        easing: (t: unknown) =>
          Math.min(1, 1.001 - Math.pow(2, -10 * Number(t))),
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.08,
        lerp: 0.1,
      });
      lenisRef.current = lenis;
      startRaf();
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new LenisClass({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.0,
      easing: (t: unknown) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * Number(t))),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      lerp: 0.1,
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;
    startRaf();
  }, [startRaf, useWindowScroll]);

  // Mount / unmount
  useLayoutEffect(() => {
    const scrollerOk = useWindowScroll || !!scrollerRef.current;
    if (!scrollerOk) return;

    // Init card styles
    const cards = Array.from(
      useWindowScroll
        ? (document.querySelectorAll(
            ".scroll-stack-card"
          ) as NodeListOf<HTMLElement>)
        : (scrollerRef.current?.querySelectorAll(
            ".scroll-stack-card"
          ) as NodeListOf<HTMLElement> | null) || []
    ) as HTMLElement[];

    cardsRef.current = cards;
    lastTransformsRef.current.clear();

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    measure();
    setupLenis();
    updateCardTransforms();

    // Re-measure on resize
    const onResize = () => {
      if (remeasureScheduledRef.current) return;
      remeasureScheduledRef.current = true;
      requestAnimationFrame(() => {
        remeasureScheduledRef.current = false;
        measure();
        updateCardTransforms();
      });
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      stopRaf();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      window.removeEventListener("resize", onResize);
      ro.disconnect();

      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance,
    useWindowScroll,
    measure,
    setupLenis,
    stopRaf,
    updateCardTransforms,
  ]);

  // Wrapper class & style
  const wrapperClass = useMemo(
    () =>
      (
        "relative w-full " +
        (useWindowScroll ? "" : "h-full overflow-y-auto overflow-x-visible ") +
        className
      ).trim(),
    [useWindowScroll, className]
  );

  const wrapperStyle: React.CSSProperties = useWindowScroll
    ? { overscrollBehavior: "auto" }
    : {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        willChange: "scroll-position",
      };

  return (
    <div className={wrapperClass} ref={scrollerRef} style={wrapperStyle}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* spacer untuk melepaskan pin terakhir */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
