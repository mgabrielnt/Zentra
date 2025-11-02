// D:\zentra\components\ScrollStack.tsx
"use client";

import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[28rem] md:min-h-[36rem] my-8 p-14 md:p-16 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.12)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
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
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

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
  const lenisRef = useRef<Lenis | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());

  // === NEW: cache measurement supaya tidak forced reflow tiap frame
  const measuredTopsRef = useRef<number[]>([]);
  const endTopRef = useRef<number>(0);
  const containerHRef = useRef<number>(0);

  // untuk re-measure debounce
  const remeasureScheduledRef = useRef(false);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollY = useCallback(() => {
    // Lenis menyimpan virtual scroll; lebih stabil pakai nilai dari lenis ketika ada
    if (lenisRef.current) return lenisRef.current.scroll;
    return useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
  }, [useWindowScroll]);

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = (useWindowScroll
      ? (document.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement>)
      : (scroller?.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement> | null)) || [];

    cardsRef.current = Array.from(cards);

    const containerH = useWindowScroll
      ? window.innerHeight
      : scroller?.clientHeight || 0;
    containerHRef.current = containerH;

    const currentScroll = getScrollY();

    // hitung posisi top absolut (sekali)
    measuredTopsRef.current = cardsRef.current.map((el) => {
      if (useWindowScroll) {
        const rect = el.getBoundingClientRect();
        return rect.top + currentScroll;
      }
      // relatif terhadap scroller
      return el.offsetTop;
    });

    // end marker
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
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    const scrollTop = getScrollY();
    const containerHeight = containerHRef.current;
    const stackPosPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPosPx = parsePercentage(scaleEndPosition, containerHeight);
    const endTop = endTopRef.current;

    const cache = lastTransformsRef.current;

    cardsRef.current.forEach((card, i) => {
      const cardTop = measuredTopsRef.current[i] ?? 0;

      // waktu trigger scale
      const triggerStart = cardTop - stackPosPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPosPx;

      // pin range
      const pinStart = cardTop - stackPosPx - itemStackDistance * i;
      const pinEnd = endTop - containerHeight / 2;

      // scale & rot
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // blur (hanya kartu di belakang top-card)
      let blur = 0;
      if (blurAmount) {
        let topIdx = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTop = measuredTopsRef.current[j] ?? 0;
          const jStart = jTop - stackPosPx - itemStackDistance * j;
          if (scrollTop >= jStart) topIdx = j;
        }
        if (i < topIdx) {
          const depth = topIdx - i;
          blur = Math.max(0, depth * blurAmount);
        }
      }

      // translateY (pin logic)
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const prev = cache.get(i);
      const changed =
        !prev ||
        Math.abs(prev.translateY - next.translateY) > 0.1 ||
        Math.abs(prev.scale - next.scale) > 0.001 ||
        Math.abs(prev.rotation - next.rotation) > 0.1 ||
        Math.abs(prev.blur - next.blur) > 0.1;

      if (changed) {
        // cukup satu write per frame
        const transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale}) rotate(${next.rotation}deg)`;
        if (card.style.transform !== transform) {
          card.style.transform = transform;
        }
        const filter = next.blur > 0 ? `blur(${next.blur}px)` : "";
        if (card.style.filter !== filter) {
          card.style.filter = filter;
        }
        cache.set(i, next);
      }

      // panggil onStackComplete saat kartu terakhir ter-pin
      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
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
  ]);

  // === LENIS setup dengan loop rAF tunggal (hindari double-callback)
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
    if (useWindowScroll) {
      // window mode
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.08,
        lerp: 0.1,
      });
      lenisRef.current = lenis;
      startRaf();
      return;
    }

    // scroller mode
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner") as HTMLElement,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      lerp: 0.1,
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;
    startRaf();
  }, [startRaf, useWindowScroll]);

  // === mount / unmount
  useLayoutEffect(() => {
    const scrollerOk = useWindowScroll || !!scrollerRef.current;
    if (!scrollerOk) return;

    // inisialisasi kartu
    const cards = Array.from(
      useWindowScroll
        ? (document.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement>)
        : (scrollerRef.current?.querySelectorAll(".scroll-stack-card") as NodeListOf<HTMLElement> | null) || []
    ) as HTMLElement[];

    cardsRef.current = cards;
    lastTransformsRef.current.clear();

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      // jangan set transform di sini (biar tidak buat layer extra saat idle)
    });

    measure();
    setupLenis();
    updateCardTransforms();

    // re-measure on resize / font loads / images
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

  // === wrapper class & inline style dipisah agar window-mode tidak bikin layer extra
  const wrapperClass =
    "relative w-full " +
    (useWindowScroll ? "" : "h-full overflow-y-auto overflow-x-visible ") +
    className;

  const wrapperStyle: React.CSSProperties = useWindowScroll
    ? {
        // window mode: hindari style yang memicu compositor layer
        overscrollBehavior: "auto",
      }
    : {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        willChange: "scroll-position",
      };

  return (
    <div className={wrapperClass.trim()} ref={scrollerRef} style={wrapperStyle}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* spacer untuk melepaskan pin terakhir */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
