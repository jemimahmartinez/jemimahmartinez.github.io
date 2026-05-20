import {
  BRANCH_OFFSET_BASE,
  CARD_GAP,
  CARD_HEIGHT,
  LANE_SPACING,
  LANE_SPACING_MAX_FACTOR,
  MAX_BELOW_LEVEL,
  MIN_LANE_SPACING,
  MOBILE_BRANCH_OFFSET_BASE,
  MOBILE_BREAKPOINT,
  MOBILE_CARD_GAP,
  MOBILE_CARD_HEIGHT,
  MOBILE_LANE_SPACING,
  MOBILE_TRACK_PADDING_Y,
  MOBILE_YEAR_LABEL_HEIGHT,
  PADDING_X,
  PX_PER_YEAR,
  TRACK_PADDING_Y,
  TRACK_PADDING_Y_MAX,
  TimelineEvent,
  YEAR_LABEL_HEIGHT,
} from "./constants";
import { parseYear } from "./parseYear";

export type LaneMetrics = {
  branchOffsetBase: number;
  laneSpacing: number;
  yearLabelHeight: number;
  cardGap: number;
  cardHeight: number;
  trackPaddingY: number;
};

export type StickyBound = { startX: number; endX: number };

export type Layout = {
  sorted: TimelineEvent[];
  xOf: (year: number) => number;
  trackWidth: number;
  trackHeight: number;
  baselineStart: number;
  presentX: number;
  snapTargets: number[];
  yearTicks: number[];
  belowReach: number;
  aboveReach: number;
  railTop: number;
  isMobile: boolean;
  metrics: LaneMetrics;
  stickyBounds: StickyBound[];
};

const desktopMetrics: LaneMetrics = {
  branchOffsetBase: BRANCH_OFFSET_BASE,
  laneSpacing: LANE_SPACING,
  yearLabelHeight: YEAR_LABEL_HEIGHT,
  cardGap: CARD_GAP,
  cardHeight: CARD_HEIGHT,
  trackPaddingY: TRACK_PADDING_Y,
};

const mobileMetrics: LaneMetrics = {
  branchOffsetBase: MOBILE_BRANCH_OFFSET_BASE,
  laneSpacing: MOBILE_LANE_SPACING,
  yearLabelHeight: MOBILE_YEAR_LABEL_HEIGHT,
  cardGap: MOBILE_CARD_GAP,
  cardHeight: MOBILE_CARD_HEIGHT,
  trackPaddingY: MOBILE_TRACK_PADDING_Y,
};

const laneKeyFor = (event: TimelineEvent, idx: number): string =>
  event.branch ? `${event.branch}-${event.level ?? 1}` : `main-${idx % 2}`;

const reachForLevel = (level: number, m: LaneMetrics): number =>
  level === 0
    ? m.cardGap + m.cardHeight
    : m.branchOffsetBase +
      (level - 1) * m.laneSpacing +
      m.yearLabelHeight +
      m.cardGap +
      m.cardHeight;

const levelOf = (event: TimelineEvent): number =>
  event.branch ? event.level ?? 1 : 0;

type ShiftPoint = { atYear: number; shift: number };

const shiftLookup = (points: ShiftPoint[]) => (y: number): number => {
  let s = 0;
  for (const sp of points) {
    if (sp.atYear <= y) s = sp.shift;
    else break;
  }
  return s;
};

const PORTRAIT_IMAGES = new Set(["grad.jpg", "pushpayInternship.jpg"]);

const widthForEvent = (event: TimelineEvent, isMobile: boolean): number => {
  if (event.branch === "below" && !!event.details) {
    return isMobile ? 350 : 420;
  }
  if (event.details?.slideshow && event.details.slideshow.length > 0) {
    return isMobile ? 340 : 440;
  }
  if (event.image && PORTRAIT_IMAGES.has(event.image)) {
    return isMobile ? 340 : 410;
  }
  return isMobile ? 200 : 210;
};

const requiredSpacing = (
  a: TimelineEvent,
  b: TimelineEvent,
  isMobile: boolean
): number => {
  const buffer = isMobile ? 50 : 140;
  return (widthForEvent(a, isMobile) + widthForEvent(b, isMobile)) / 2 + buffer;
};

const computeLaneShifts = (
  sorted: TimelineEvent[],
  baseX: (y: number) => number,
  isMobile: boolean
): { shiftPoints: ShiftPoint[]; cumulativeShift: number } => {
  const shiftPoints: ShiftPoint[] = [];
  const shiftAt = shiftLookup(shiftPoints);
  const midOf = (sy: number, ey: number) =>
    (baseX(sy) + shiftAt(sy) + baseX(ey) + shiftAt(ey)) / 2;

  const lanePrev: Record<
    string,
    { event: TimelineEvent; endYear: number; midX: number }
  > = {};
  let cumulativeShift = 0;

  sorted.forEach((event, idx) => {
    const sy = parseYear(event.year);
    const ey = event.endYear ? parseYear(event.endYear) : sy;
    const laneKey = laneKeyFor(event, idx);
    let mid = midOf(sy, ey);
    const prev = lanePrev[laneKey];

    if (prev !== undefined) {
      const required = requiredSpacing(prev.event, event, isMobile);
      const gap = mid - prev.midX;
      if (gap < required) {
        const multiplier = prev.endYear >= sy ? 2 : 1;
        const extra = (required - gap) * multiplier;
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
    lanePrev[laneKey] = { event, endYear: ey, midX: mid };
  });

  return { shiftPoints, cumulativeShift };
};

const eventCenter = (
  event: TimelineEvent,
  xOf: (y: number) => number
): number => {
  const startX = xOf(parseYear(event.year));
  const endX = event.endYear ? xOf(parseYear(event.endYear)) : startX;
  return (startX + endX) / 2;
};

const yearTicksInRange = (min: number, max: number): number[] => {
  const ticks: number[] = [];
  for (let y = Math.ceil(min); y <= Math.floor(max); y++) ticks.push(y);
  return ticks;
};

const STICKY_NEIGHBOR_GAP = 20;

const computeStickyBounds = (
  sorted: TimelineEvent[],
  xOf: (y: number) => number,
  isMobile: boolean
): StickyBound[] => {
  type Info = { startX: number; endX: number; midX: number };
  const infos: Info[] = sorted.map((event) => {
    const sx = xOf(parseYear(event.year));
    const ex = event.endYear ? xOf(parseYear(event.endYear)) : sx;
    return { startX: sx, endX: ex, midX: (sx + ex) / 2 };
  });
  const bounds: StickyBound[] = infos.map((info) => ({
    startX: info.startX,
    endX: info.endX,
  }));

  const byLane: Record<string, number[]> = {};
  sorted.forEach((event, idx) => {
    const key = laneKeyFor(event, idx);
    if (!byLane[key]) byLane[key] = [];
    byLane[key].push(idx);
  });

  const rightReach = (idx: number): number => {
    const info = infos[idx];
    const w = widthForEvent(sorted[idx], isMobile);
    return info.endX - info.startX >= w ? info.endX : info.midX + w / 2;
  };
  const leftReach = (idx: number): number => {
    const info = infos[idx];
    const w = widthForEvent(sorted[idx], isMobile);
    return info.endX - info.startX >= w ? info.startX : info.midX - w / 2;
  };

  Object.values(byLane).forEach((indices) => {
    indices.sort((a, b) => infos[a].midX - infos[b].midX);
    indices.forEach((idx, i) => {
      const info = infos[idx];
      const w = widthForEvent(sorted[idx], isMobile);
      if (info.endX - info.startX < w) return;
      const prevIdx = indices[i - 1];
      if (prevIdx !== undefined) {
        bounds[idx].startX = Math.max(
          info.startX,
          rightReach(prevIdx) + STICKY_NEIGHBOR_GAP
        );
      }
      const nextIdx = indices[i + 1];
      if (nextIdx !== undefined) {
        bounds[idx].endX = Math.min(
          info.endX,
          leftReach(nextIdx) - STICKY_NEIGHBOR_GAP
        );
      }
    });
  });

  return bounds;
};

const clampBelowLevel = (event: TimelineEvent): TimelineEvent => {
  if (event.branch !== "below") return event;
  const level = event.level ?? 1;
  return level > MAX_BELOW_LEVEL
    ? { ...event, level: MAX_BELOW_LEVEL }
    : event;
};

const adaptMetrics = (
  base: LaneMetrics,
  containerHeight: number,
  maxLevel: number
): LaneMetrics => {
  if (!containerHeight || containerHeight <= 0) return base;

  const fixedReach =
    base.branchOffsetBase +
    base.yearLabelHeight +
    base.cardGap +
    base.cardHeight;
  const baseReach =
    maxLevel <= 0
      ? base.cardGap + base.cardHeight
      : fixedReach + Math.max(0, maxLevel - 1) * base.laneSpacing;
  const baseTrackHeight = baseReach * 2 + base.trackPaddingY * 2;

  if (containerHeight <= baseTrackHeight) return base;

  let laneSpacing = base.laneSpacing;
  if (maxLevel > 1) {
    const targetContent = containerHeight * 0.9 - base.trackPaddingY * 2;
    const targetReach = targetContent / 2;
    const targetLaneSpacing = (targetReach - fixedReach) / (maxLevel - 1);
    laneSpacing = Math.max(
      base.laneSpacing,
      Math.min(base.laneSpacing * LANE_SPACING_MAX_FACTOR, targetLaneSpacing)
    );
  }

  const actualReach =
    maxLevel <= 0
      ? base.cardGap + base.cardHeight
      : fixedReach + Math.max(0, maxLevel - 1) * laneSpacing;
  const remainingForPadding = Math.max(
    0,
    containerHeight - actualReach * 2
  );
  const trackPaddingY = Math.max(
    base.trackPaddingY,
    Math.min(TRACK_PADDING_Y_MAX, remainingForPadding / 2)
  );

  return { ...base, laneSpacing, trackPaddingY };
};

export function computeLayout(
  events: TimelineEvent[],
  containerWidth: number,
  containerHeight: number
): Layout {
  const sorted = events
    .map(clampBelowLevel)
    .sort((a, b) => parseYear(a.year) - parseYear(b.year));
  const yearValues = sorted.flatMap((e) => [
    parseYear(e.year),
    e.endYear ? parseYear(e.endYear) : parseYear(e.year),
  ]);
  const min = Math.min(...yearValues);
  const max = Math.max(...yearValues);
  const span = Math.max(max - min, 1);
  const paddingX = Math.max(PADDING_X, containerWidth / 2);
  const baseX = (y: number) => paddingX + (y - min) * PX_PER_YEAR;

  const isMobile = containerWidth > 0 && containerWidth <= MOBILE_BREAKPOINT;
  const baseMetrics = isMobile ? mobileMetrics : desktopMetrics;

  const maxLevel = sorted.reduce((m, e) => Math.max(m, levelOf(e)), 0);
  const belowLevel = sorted.reduce(
    (m, e) =>
      e.branch === "below" || !e.branch ? Math.max(m, levelOf(e)) : m,
    0
  );
  const aboveLevel = sorted.reduce(
    (m, e) =>
      e.branch === "above" || !e.branch ? Math.max(m, levelOf(e)) : m,
    0
  );

  const metrics = adaptMetrics(baseMetrics, containerHeight, maxLevel);

  const { shiftPoints, cumulativeShift } = computeLaneShifts(
    sorted,
    baseX,
    isMobile
  );
  const shiftAt = shiftLookup(shiftPoints);
  const xOf = (y: number) => Math.round(baseX(y) + shiftAt(y));

  const trackWidth = Math.round(
    span * PX_PER_YEAR + paddingX * 2 + cumulativeShift
  );

  const aboveReach = reachForLevel(aboveLevel, metrics);
  const belowReach = reachForLevel(belowLevel, metrics);
  const sumReach = aboveReach + belowReach;
  const remainingForPadding = Math.max(0, containerHeight - sumReach);
  const adaptedPaddingY = Math.max(
    metrics.trackPaddingY,
    Math.min(TRACK_PADDING_Y_MAX, remainingForPadding / 2)
  );
  const trackHeight = sumReach + adaptedPaddingY * 2;
  const railTop = aboveReach + adaptedPaddingY;

  const baselineStart = xOf(min);
  const presentX = xOf(parseYear("present"));
  const eventCenters = sorted
    .map((e) => eventCenter(e, xOf))
    .sort((a, b) => a - b);
  const snapTargets = Array.from(
    new Set([...eventCenters, presentX])
  ).sort((a, b) => a - b);
  const yearTicks = yearTicksInRange(min, max);

  const stickyBounds = computeStickyBounds(sorted, xOf, isMobile);

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
    aboveReach,
    railTop,
    isMobile,
    metrics,
    stickyBounds,
  };
}
