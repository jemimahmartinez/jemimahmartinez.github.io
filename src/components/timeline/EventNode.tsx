import React, { useRef } from "react";

import {
  BRANCH_OFFSET_BASE,
  CARD_GAP,
  LANE_SPACING,
  TimelineEvent,
  YEAR_LABEL_HEIGHT,
  imageMap,
} from "./constants";
import { isPresent, parseYear } from "./parseYear";
import { useElementVisibility, useStickyCardPosition } from "./hooks";

type Classes = Record<string, string>;

type EventNodeProps = {
  event: TimelineEvent;
  index: number;
  xOf: (year: number) => number;
  classes: Classes;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
};

export const EventNode: React.FC<EventNodeProps> = ({
  event,
  index,
  xOf,
  classes,
  scrollRef,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);

  const startX = xOf(parseYear(event.year));
  const endX = event.endYear ? xOf(parseYear(event.endYear)) : startX;
  const midX = (startX + endX) / 2;

  const isVisible = useElementVisibility(cardRef, scrollRef);
  useStickyCardPosition(cardRef, yearRef, scrollRef, { startX, endX, midX });

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
  const yearOffset = isBranch ? branchOffset + 8 : 14;

  const verticalAnchor = (offset: number): React.CSSProperties =>
    cardOnTop
      ? { bottom: `calc(50% + ${offset}px)` }
      : { top: `calc(50% + ${offset}px)` };

  const cardStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: "translateX(-50%)",
    ...verticalAnchor(cardOffset),
  };
  const yearStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: "translateX(-50%)",
    ...verticalAnchor(yearOffset),
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
        <BranchRail
          startX={startX}
          endX={endX}
          isRange={isRange}
          isOngoing={isOngoing}
          cardOnTop={cardOnTop}
          branchOffset={branchOffset}
          branchY={branchY}
          classes={classes}
        />
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

type BranchRailProps = {
  startX: number;
  endX: number;
  isRange: boolean;
  isOngoing: boolean;
  cardOnTop: boolean;
  branchOffset: number;
  branchY: string;
  classes: Classes;
};

const BranchRail: React.FC<BranchRailProps> = ({
  startX,
  endX,
  isRange,
  isOngoing,
  cardOnTop,
  branchOffset,
  branchY,
  classes,
}) => {
  const stemVertical: React.CSSProperties = cardOnTop
    ? { top: `calc(50% - ${branchOffset}px)`, height: `${branchOffset}px` }
    : { top: "50%", height: `${branchOffset}px` };

  return (
    <>
      <div
        className={classes.junction}
        style={{ left: `${startX - 5}px`, top: "calc(50% - 5px)" }}
      />
      <div
        className={classes.stem}
        style={{ left: `${startX - 1}px`, ...stemVertical }}
      />
      {isRange ? (
        <>
          {!isOngoing && (
            <>
              <div
                className={classes.junction}
                style={{ left: `${endX - 5}px`, top: "calc(50% - 5px)" }}
              />
              <div
                className={classes.stem}
                style={{ left: `${endX - 1}px`, ...stemVertical }}
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
      ) : (
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
  );
};

const Card: React.FC<{ event: TimelineEvent; classes: Classes }> = ({
  event,
  classes,
}) => {
  const src = event.image ? imageMap[event.image] : undefined;
  return (
    <>
      {src && <img src={src} alt="" className={classes.cardImage} />}
      <h3 className={classes.cardTitle}>{event.title}</h3>
      <p className={classes.cardDescription}>{event.description}</p>
    </>
  );
};
