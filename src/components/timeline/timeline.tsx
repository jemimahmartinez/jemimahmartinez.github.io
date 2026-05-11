import React, { useEffect, useMemo, useRef, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";

import Grad from "../pics/grad.jpg";
import OwnMyData from "../pics/ownMyData.webp";
import PushpayInternship from "../pics/pushpayInternship.jpg";
import TronBTS from "../pics/tronBTS.jpg";
import GenerosityValue from "../pics/generosityCoreValue.png";

type TimelineEvent = {
  year: string;
  endYear?: string | null;
  branch?: "above" | "below" | null;
  level?: number;
  title: string;
  description: string;
  image: string | null;
};

const imageMap: Record<string, string> = {
  "grad.jpg": Grad,
  "ownMyData.webp": OwnMyData,
  "pushpayInternship.jpg": PushpayInternship,
  "tronBTS.jpg": TronBTS,
  "generosityCoreValue.png": GenerosityValue,
};

const PX_PER_YEAR = 320;
const PADDING_X = 96;
const BRANCH_OFFSET_BASE = 50;
const LANE_SPACING = 190;
const CARD_GAP = 14;
const CARD_HEIGHT = 240;
const CARD_WIDTH = 260;
const MIN_LANE_SPACING = CARD_WIDTH + 80;
const TRACK_PADDING_Y = 24;
const YEAR_LABEL_HEIGHT = 22;

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function isPresent(s?: string | null): boolean {
  return !!s && s.trim().toLowerCase() === "present";
}

function parseYear(s: string): number {
  if (isPresent(s)) {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  }
  const parts = s.trim().toLowerCase().split(/\s+/);
  if (parts.length === 1) return parseInt(parts[0], 10);
  const monthKey = parts[0].substring(0, 3);
  const month = MONTHS[monthKey] ?? 0;
  const year = parseInt(parts[parts.length - 1], 10);
  return year + month / 12;
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    "min-height": "0",
    flex: "1 1 auto",
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
    "overflow-x": "auto",
    "overflow-y": "auto",
    "scrollbar-width": "none",
    "scroll-snap-type": "x mandatory",
    "scroll-behavior": "smooth",
    "&::-webkit-scrollbar": { display: "none" },
  },
  snapTarget: {
    position: "absolute",
    top: "0",
    bottom: "0",
    width: "1px",
    "scroll-snap-align": "center",
    "pointer-events": "none",
  },
  track: {
    position: "relative",
    "min-width": "100%",
  },
  baseline: {
    position: "absolute",
    top: "50%",
    right: "0",
    height: "2px",
    "background-color": "rgba(255, 255, 255, 0.25)",
  },
  yearTick: {
    position: "absolute",
    top: "calc(50% - 5px)",
    width: "1px",
    height: "10px",
    "background-color": "rgba(255, 255, 255, 0.4)",
    "pointer-events": "none",
  },
  eventWrapper: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    opacity: "0",
    transition: "opacity 400ms ease",
    "pointer-events": "none",
  },
  eventWrapperVisible: {
    opacity: "1",
  },
  card: {
    position: "absolute",
    width: "260px",
    "text-align": "center",
    display: "flex",
    "flex-direction": "column",
    gap: "6px",
    "align-items": "center",
    "@media (max-width: 600px)": {
      width: "220px",
    },
  },
  cardImage: {
    width: "120px",
    height: "120px",
    "object-fit": "cover",
    "object-position": "center",
    "border-radius": "4px",
    "flex-shrink": "0",
  },
  cardTitle: {
    margin: "0",
    color: "white",
    "font-size": "0.6em",
    "font-weight": "bold",
  },
  cardDescription: {
    margin: "0",
    color: "#bbb",
    "font-size": "0.5em",
    "line-height": "1.4",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  stem: {
    position: "absolute",
    width: "2px",
    "background-color": "#5E1219",
  },
  rail: {
    position: "absolute",
    height: "10px",
    "border-radius": "5px",
    "background-color": "#5E1219",
    "box-shadow": "0 0 0 4px #000000",
  },
  railOngoing: {
    position: "absolute",
    height: "10px",
    "border-radius": "5px 0 0 5px",
    "background-image":
      "linear-gradient(to right, #5E1219 0%, #5E1219 75%, rgba(94, 18, 25, 0) 100%)",
  },
  rangeBar: {
    position: "absolute",
    height: "10px",
    "border-radius": "5px",
    "background-color": "#5E1219",
    "box-shadow": "0 0 0 4px #000000",
  },
  rangeBarOngoing: {
    position: "absolute",
    height: "10px",
    "border-radius": "5px 0 0 5px",
    "background-image":
      "linear-gradient(to right, #5E1219 0%, #5E1219 75%, rgba(94, 18, 25, 0) 100%)",
  },
  dot: {
    position: "absolute",
    width: "14px",
    height: "14px",
    "border-radius": "50%",
    "background-color": "#5E1219",
    "box-shadow": "0 0 0 4px #000000",
  },
  junction: {
    position: "absolute",
    width: "10px",
    height: "10px",
    "border-radius": "50%",
    "background-color": "#5E1219",
    "box-shadow": "0 0 0 3px #000000",
  },
  year: {
    position: "absolute",
    color: "white",
    "font-size": "0.5em",
    "font-weight": "bold",
    "white-space": "nowrap",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    "z-index": "2",
    opacity: "1",
    transition: "opacity 250ms ease",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  arrowHidden: {
    opacity: "0",
    "pointer-events": "none",
  },
  arrowLeft: { left: "-8px" },
  arrowRight: { right: "-8px" },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  events: TimelineEvent[];
}

const Timeline: React.FunctionComponent<IProps> = ({ classes, events }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [atPresent, setAtPresent] = useState(true);
  const presentXRef = useRef(0);

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
  }, []);

  const {
    sorted,
    xOf,
    trackWidth,
    trackHeight,
    baselineStart,
    snapTargets,
    presentX,
    yearTicks,
    belowReach,
  } = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => parseYear(a.year) - parseYear(b.year)
    );
    const yearValues = sorted.flatMap((e) => [
      parseYear(e.year),
      e.endYear ? parseYear(e.endYear) : parseYear(e.year),
    ]);
    const min = Math.min(...yearValues);
    const max = Math.max(...yearValues);
    const span = Math.max(max - min, 1);
    const paddingX = Math.max(PADDING_X, containerWidth / 2);
    const baseX = (y: number) => paddingX + (y - min) * PX_PER_YEAR;

    const shiftPoints: { atYear: number; shift: number }[] = [];
    const shiftAt = (y: number) => {
      let s = 0;
      for (const sp of shiftPoints) {
        if (sp.atYear <= y) s = sp.shift;
        else break;
      }
      return s;
    };
    const midOf = (sy: number, ey: number) =>
      (baseX(sy) + shiftAt(sy) + baseX(ey) + shiftAt(ey)) / 2;

    const lanePrev: Record<string, { endYear: number; midX: number }> = {};
    let cumulativeShift = 0;
    sorted.forEach((e, idx) => {
      const sy = parseYear(e.year);
      const ey = e.endYear ? parseYear(e.endYear) : sy;
      const laneKey = e.branch
        ? `${e.branch}-${e.level ?? 1}`
        : `main-${idx % 2}`;
      let mid = midOf(sy, ey);
      const prev = lanePrev[laneKey];
      if (prev !== undefined) {
        const gap = mid - prev.midX;
        if (gap < MIN_LANE_SPACING) {
          const multiplier = prev.endYear >= sy ? 2 : 1;
          const extra = (MIN_LANE_SPACING - gap) * multiplier;
          cumulativeShift += extra;
          shiftPoints.push({ atYear: sy, shift: cumulativeShift });
          for (const k of Object.keys(lanePrev)) {
            if (lanePrev[k].endYear >= sy) {
              lanePrev[k].midX += extra / 2;
            }
          }
          mid = midOf(sy, ey);
        }
      }
      lanePrev[laneKey] = { endYear: ey, midX: mid };
    });

    const trackWidth = Math.round(
      span * PX_PER_YEAR + paddingX * 2 + cumulativeShift
    );
    const xOf = (y: number) => Math.round(baseX(y) + shiftAt(y));

    const levelOf = (e: TimelineEvent) =>
      e.branch ? e.level ?? 1 : 0;
    const maxLevel = sorted.reduce((m, e) => Math.max(m, levelOf(e)), 0);
    const reachFor = (level: number) =>
      level === 0
        ? CARD_GAP + CARD_HEIGHT
        : BRANCH_OFFSET_BASE +
          (level - 1) * LANE_SPACING +
          YEAR_LABEL_HEIGHT +
          CARD_GAP +
          CARD_HEIGHT;
    const reach = reachFor(maxLevel);
    const belowLevel = sorted.reduce(
      (m, e) => (e.branch === "below" ? Math.max(m, levelOf(e)) : m),
      0
    );
    const belowReach = reachFor(belowLevel);
    const trackHeight = reach * 2 + TRACK_PADDING_Y * 2;
    const baselineStart = xOf(min);
    const eventCenters = sorted
      .map((e) => {
        const startX = xOf(parseYear(e.year));
        const endX = e.endYear ? xOf(parseYear(e.endYear)) : startX;
        return (startX + endX) / 2;
      })
      .sort((a, b) => a - b);
    const presentX = xOf(parseYear("present"));
    const snapTargets = Array.from(
      new Set([...eventCenters, presentX])
    ).sort((a, b) => a - b);
    const yearTicks: number[] = [];
    for (let y = Math.ceil(min); y <= Math.floor(max); y++) {
      yearTicks.push(y);
    }
    return {
      sorted,
      xOf,
      trackWidth,
      trackHeight,
      baselineStart,
      presentX,
      snapTargets,
      yearTicks,
      belowReach,
    };
  }, [events, containerWidth]);

  useEffect(() => {
    presentXRef.current = presentX;
  }, [presentX]);

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
  }, [containerWidth, presentX, trackHeight, belowReach]);

  const snapTo = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const currentCenter = el.scrollLeft + el.clientWidth / 2;
    const epsilon = 4;
    const target =
      direction === 1
        ? snapTargets.find((c) => c > currentCenter + epsilon)
        : [...snapTargets]
            .reverse()
            .find((c) => c < currentCenter - epsilon);
    if (target === undefined) return;
    el.scrollTo({
      left: target - el.clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={`${classes.arrow} ${classes.arrowLeft} ${
          atStart ? classes.arrowHidden : ""
        }`}
      >
        <Button onClick={() => snapTo(-1)}>
          <LeftArrow />
        </Button>
      </div>
      <div ref={scrollRef} className={classes.scrollContainer}>
        <div
          className={classes.track}
          style={{ width: `${trackWidth}px`, height: `${trackHeight}px` }}
        >
          <div
            className={classes.baseline}
            style={{ left: `${baselineStart}px` }}
          />
          {yearTicks.map((y) => (
            <div
              key={`tick-${y}`}
              className={classes.yearTick}
              style={{ left: `${xOf(y)}px` }}
            />
          ))}
          {snapTargets.map((c, i) => (
            <div
              key={`snap-${i}`}
              className={classes.snapTarget}
              style={{ left: `${c}px` }}
            />
          ))}
          {sorted.map((event, i) => (
            <EventNode
              key={`${event.year}-${i}`}
              event={event}
              index={i}
              xOf={xOf}
              classes={classes}
              scrollRef={scrollRef}
            />
          ))}
        </div>
      </div>
      <div
        className={`${classes.arrow} ${classes.arrowRight} ${
          atEnd || atPresent ? classes.arrowHidden : ""
        }`}
      >
        <Button onClick={() => snapTo(1)}>
          <RightArrow />
        </Button>
      </div>
    </div>
  );
};

const EventNode: React.FunctionComponent<{
  event: TimelineEvent;
  index: number;
  xOf: (year: number) => number;
  classes: any;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}> = ({ event, index, xOf, classes, scrollRef }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const card = cardRef.current;
    const root = scrollRef.current;
    if (!card || !root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root, threshold: 0 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [scrollRef]);

  const startX = xOf(parseYear(event.year));
  const endX = event.endYear ? xOf(parseYear(event.endYear)) : startX;
  const midX = (startX + endX) / 2;

  useEffect(() => {
    const card = cardRef.current;
    const root = scrollRef.current;
    if (!card || !root) return;
    const year = yearRef.current;
    const resetToCenter = () => {
      card.style.left = `${midX}px`;
      if (year) year.style.left = `${midX}px`;
    };
    const update = () => {
      if (root.clientWidth > 600) {
        resetToCenter();
        return;
      }
      const cardW = card.offsetWidth;
      const vc = root.scrollLeft + root.clientWidth / 2;
      const range = endX - startX;
      let centerX: number;
      if (range < cardW) {
        centerX = midX;
      } else {
        centerX = Math.max(
          startX + cardW / 2,
          Math.min(vc, endX - cardW / 2)
        );
      }
      card.style.left = `${centerX}px`;
      if (year) year.style.left = `${centerX}px`;
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
  }, [scrollRef, startX, endX, midX]);
  const isRange = !!event.endYear;
  const isOngoing = isPresent(event.endYear);
  const isBranch = !!event.branch;
  const cardOnTop = isBranch ? event.branch === "above" : index % 2 === 0;
  const yearText = isRange
    ? `${event.year} – ${isOngoing ? "Present" : event.endYear}`
    : event.year;

  const level = event.level ?? 1;
  const branchOffset = isBranch
    ? BRANCH_OFFSET_BASE + (level - 1) * LANE_SPACING
    : 0;

  const cardOffset = isBranch
    ? branchOffset + YEAR_LABEL_HEIGHT + CARD_GAP
    : CARD_GAP;
  const cardStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: "translateX(-50%)",
    ...(cardOnTop
      ? { bottom: `calc(50% + ${cardOffset}px)` }
      : { top: `calc(50% + ${cardOffset}px)` }),
  };

  const yearOffset = isBranch ? branchOffset + 8 : 14;
  const yearStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: "translateX(-50%)",
    ...(cardOnTop
      ? { bottom: `calc(50% + ${yearOffset}px)` }
      : { top: `calc(50% + ${yearOffset}px)` }),
  };

  const branchY = cardOnTop
    ? `calc(50% - ${branchOffset}px)`
    : `calc(50% + ${branchOffset}px)`;

  return (
    <div
      className={`${classes.eventWrapper} ${
        isVisible ? classes.eventWrapperVisible : ""
      }`}
    >
      <div ref={cardRef} className={classes.card} style={cardStyle}>
        <Card event={event} classes={classes} />
      </div>

      <span ref={yearRef} className={classes.year} style={yearStyle}>
        {yearText}
      </span>

      {isBranch ? (
        <>
          <div
            className={classes.junction}
            style={{
              left: `${startX - 5}px`,
              top: "calc(50% - 5px)",
            }}
          />
          <div
            className={classes.stem}
            style={{
              left: `${startX - 1}px`,
              ...(cardOnTop
                ? {
                    top: `calc(50% - ${branchOffset}px)`,
                    height: `${branchOffset}px`,
                  }
                : {
                    top: "50%",
                    height: `${branchOffset}px`,
                  }),
            }}
          />
          {isRange && (
            <>
              {!isOngoing && (
                <>
                  <div
                    className={classes.junction}
                    style={{
                      left: `${endX - 5}px`,
                      top: "calc(50% - 5px)",
                    }}
                  />
                  <div
                    className={classes.stem}
                    style={{
                      left: `${endX - 1}px`,
                      ...(cardOnTop
                        ? {
                            top: `calc(50% - ${branchOffset}px)`,
                            height: `${branchOffset}px`,
                          }
                        : {
                            top: "50%",
                            height: `${branchOffset}px`,
                          }),
                    }}
                  />
                </>
              )}
              <div
                className={isOngoing ? classes.railOngoing : classes.rail}
                style={{
                  left: `${startX}px`,
                  width: `${endX - startX}px`,
                  top: branchY,
                  transform: "translateY(-50%)",
                }}
              />
            </>
          )}
          {!isRange && (
            <div
              className={classes.dot}
              style={{
                left: `${startX - 7}px`,
                top: branchY,
                transform: "translateY(-50%)",
              }}
            />
          )}
        </>
      ) : isRange ? (
        <div
          className={isOngoing ? classes.rangeBarOngoing : classes.rangeBar}
          style={{
            left: `${startX}px`,
            width: `${endX - startX}px`,
            top: "calc(50% - 5px)",
          }}
        />
      ) : (
        <div
          className={classes.dot}
          style={{
            left: `${startX - 7}px`,
            top: "calc(50% - 7px)",
          }}
        />
      )}
    </div>
  );
};

const Card: React.FunctionComponent<{
  event: TimelineEvent;
  classes: any;
}> = ({ event, classes }) => {
  const src = event.image ? imageMap[event.image] : undefined;
  return (
    <>
      {src && <img src={src} alt="" className={classes.cardImage} />}
      <h3 className={classes.cardTitle}>{event.title}</h3>
      <p className={classes.cardDescription}>{event.description}</p>
    </>
  );
};

export default withStyles(styles)(Timeline);
