import { useEffect, useRef, useState } from "react";

import { MOBILE_BREAKPOINT } from "./constants";

type ScrollState = {
  containerWidth: number;
  atStart: boolean;
  atEnd: boolean;
  atPresent: boolean;
};

export function useScrollState(
  scrollRef: React.MutableRefObject<HTMLDivElement | null>,
  presentXRef: React.MutableRefObject<number>
): ScrollState {
  const [containerWidth, setContainerWidth] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [atPresent, setAtPresent] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setContainerWidth(el.clientWidth);
      const center = el.scrollLeft + el.clientWidth / 2;
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
      setAtPresent(center >= presentXRef.current - 4);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [scrollRef, presentXRef]);

  return { containerWidth, atStart, atEnd, atPresent };
}

type InitialScrollArgs = {
  containerWidth: number;
  presentX: number;
  trackHeight: number;
  belowReach: number;
};

export function useInitialScroll(
  scrollRef: React.MutableRefObject<HTMLDivElement | null>,
  { containerWidth, presentX, trackHeight, belowReach }: InitialScrollArgs
): void {
  const hasInitialScrolledRef = useRef(false);
  useEffect(() => {
    if (hasInitialScrolledRef.current || containerWidth === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    const left = Math.max(0, presentX - containerWidth / 2);
    const baselineY = trackHeight / 2;
    const margin = 20;
    const viewport = el.clientHeight;
    const maxScroll = trackHeight - viewport;
    const fitBelow = baselineY + belowReach + margin - viewport;
    const lowerHalf = baselineY - viewport * 0.6;
    const target = Math.max(fitBelow, lowerHalf);
    const top = Math.max(0, Math.min(target, maxScroll));
    hasInitialScrolledRef.current = true;
    const apply = () => {
      el.scrollTo({ left, top, behavior: "auto" });
    };
    apply();
    requestAnimationFrame(apply);
  }, [scrollRef, containerWidth, presentX, trackHeight, belowReach]);
}

export function useElementVisibility(
  elementRef: React.MutableRefObject<HTMLElement | null>,
  rootRef: React.MutableRefObject<HTMLDivElement | null>
): boolean {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const el = elementRef.current;
    const root = rootRef.current;
    if (!el || !root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [elementRef, rootRef]);
  return isVisible;
}

type StickyRange = { startX: number; endX: number; midX: number };

export function useStickyCardPosition(
  cardRef: React.MutableRefObject<HTMLDivElement | null>,
  yearRef: React.MutableRefObject<HTMLSpanElement | null>,
  rootRef: React.MutableRefObject<HTMLDivElement | null>,
  { startX, endX, midX }: StickyRange
): void {
  useEffect(() => {
    const card = cardRef.current;
    const root = rootRef.current;
    if (!card || !root) return;
    const year = yearRef.current;

    const setLeft = (x: number) => {
      card.style.left = `${x}px`;
      if (year) year.style.left = `${x}px`;
    };

    const update = () => {
      if (root.clientWidth > MOBILE_BREAKPOINT) {
        setLeft(midX);
        return;
      }
      const cardW = card.offsetWidth;
      const range = endX - startX;
      if (range < cardW) {
        setLeft(midX);
        return;
      }
      const vc = root.scrollLeft + root.clientWidth / 2;
      const clamped = Math.max(
        startX + cardW / 2,
        Math.min(vc, endX - cardW / 2)
      );
      setLeft(clamped);
    };

    let rafId: number | null = null;
    const schedule = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    update();
    root.addEventListener("scroll", schedule, { passive: true });
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    return () => {
      root.removeEventListener("scroll", schedule);
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [cardRef, yearRef, rootRef, startX, endX, midX]);
}
