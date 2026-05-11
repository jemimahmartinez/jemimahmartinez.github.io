import {
  BRANCH_OFFSET_BASE,
  CARD_GAP,
  CARD_HEIGHT,
  LANE_SPACING,
  MIN_LANE_SPACING,
  PADDING_X,
  PX_PER_YEAR,
  TRACK_PADDING_Y,
  TimelineEvent,
  YEAR_LABEL_HEIGHT,
} from "./constants";
import { parseYear } from "./parseYear";

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
};

const laneKeyFor = (event: TimelineEvent, idx: number): string =>
  event.branch ? `${event.branch}-${event.level ?? 1}` : `main-${idx % 2}`;

const reachForLevel = (level: number): number =>
  level === 0
    ? CARD_GAP + CARD_HEIGHT
    : BRANCH_OFFSET_BASE +
      (level - 1) * LANE_SPACING +
      YEAR_LABEL_HEIGHT +
      CARD_GAP +
      CARD_HEIGHT;

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

const computeLaneShifts = (
  sorted: TimelineEvent[],
  baseX: (y: number) => number
): { shiftPoints: ShiftPoint[]; cumulativeShift: number } => {
  const shiftPoints: ShiftPoint[] = [];
  const shiftAt = shiftLookup(shiftPoints);
  const midOf = (sy: number, ey: number) =>
    (baseX(sy) + shiftAt(sy) + baseX(ey) + shiftAt(ey)) / 2;

  const lanePrev: Record<string, { endYear: number; midX: number }> = {};
  let cumulativeShift = 0;

  sorted.forEach((event, idx) => {
    const sy = parseYear(event.year);
    const ey = event.endYear ? parseYear(event.endYear) : sy;
    const laneKey = laneKeyFor(event, idx);
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

export function computeLayout(
  events: TimelineEvent[],
  containerWidth: number
): Layout {
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

  const { shiftPoints, cumulativeShift } = computeLaneShifts(sorted, baseX);
  const shiftAt = shiftLookup(shiftPoints);
  const xOf = (y: number) => Math.round(baseX(y) + shiftAt(y));

  const trackWidth = Math.round(
    span * PX_PER_YEAR + paddingX * 2 + cumulativeShift
  );

  const maxLevel = sorted.reduce((m, e) => Math.max(m, levelOf(e)), 0);
  const belowLevel = sorted.reduce(
    (m, e) => (e.branch === "below" ? Math.max(m, levelOf(e)) : m),
    0
  );
  const reach = reachForLevel(maxLevel);
  const belowReach = reachForLevel(belowLevel);
  const trackHeight = reach * 2 + TRACK_PADDING_Y * 2;

  const baselineStart = xOf(min);
  const presentX = xOf(parseYear("present"));
  const eventCenters = sorted
    .map((e) => eventCenter(e, xOf))
    .sort((a, b) => a - b);
  const snapTargets = Array.from(
    new Set([...eventCenters, presentX])
  ).sort((a, b) => a - b);
  const yearTicks = yearTicksInRange(min, max);

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
}
