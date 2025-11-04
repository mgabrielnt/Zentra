// D:\zentra\components\LogoLoop.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type LogoItem = {
  node: React.ReactNode;
  ariaLabel?: string;
  href?: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number; // px per detik (semakin besar semakin cepat)
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
};

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 110,
  direction = "left",
  logoHeight = 32,
  gap = 40,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor = "rgba(3,7,18,0.95)",
  scaleOnHover = false,
  className,
  ariaLabel,
}) => {
  const [duration, setDuration] = useState(30);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const oneCycleWidth = track.scrollWidth / 2; // lebar satu rangkaian logo
    if (!oneCycleWidth) return;

    const calculated = oneCycleWidth / speed; // px / (px/detik) = detik
    setDuration(Math.max(10, calculated)); // jangan terlalu cepat
  }, [logos, speed]);

  const animationName =
    direction === "left" ? "logo-loop-marquee-left" : "logo-loop-marquee-right";

  return (
    <div
      className={cn(
        "relative flex items-center overflow-hidden",
        pauseOnHover && "group",
        className
      )}
      aria-label={ariaLabel}
      role="list"
    >
      {fadeOut && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{
              backgroundImage: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{
              backgroundImage: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        className={cn("flex flex-nowrap items-center logo-loop-track")}
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {/* Duplikat 2x supaya benar-benar kelihatan infinite */}
        {[0, 1].map((dupIndex) => (
          <div key={dupIndex} className="flex flex-nowrap items-center">
            {logos.map((logo, idx) => {
              const inner = (
                <div
                  key={`${dupIndex}-${idx}`}
                  role="listitem"
                  aria-label={logo.ariaLabel}
                  className={cn(
                    "flex items-center justify-center",
                    scaleOnHover && "transition-transform group-hover:scale-[1.03]"
                  )}
                  style={{ height: logoHeight }}
                >
                  {logo.node}
                </div>
              );

              if (logo.href) {
                return (
                  <a
                    key={`${dupIndex}-${idx}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center"
                  >
                    {inner}
                  </a>
                );
              }

              return inner;
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-loop-marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes logo-loop-marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .logo-loop-track {
          will-change: transform;
        }

        .group:hover .logo-loop-track {
          animation-play-state: ${pauseOnHover ? "paused" : "running"};
        }
      `}</style>
    </div>
  );
};

export default LogoLoop;
