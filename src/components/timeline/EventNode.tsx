import React, { useRef, useState } from "react";

import { TimelineEvent, imageMap } from "./constants";
import { SlideshowStack } from "./EventSlideshow";
import { LaneMetrics, StickyBound } from "./layout";
import { isPresent, parseYear } from "./parseYear";
import { useElementVisibility, useStickyCardPosition } from "./hooks";

type Classes = Record<string, string>;

type HoverInfo = { midX: number; cardOnTop: boolean; expands: boolean };

type EventNodeProps = {
  event: TimelineEvent;
  index: number;
  xOf: (year: number) => number;
  classes: Classes;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  onOpen: (
    event: TimelineEvent,
    getOriginRect: () => DOMRect | null
  ) => void;
  hover: HoverInfo | null;
  onHoverChange: (info: HoverInfo | null) => void;
  metrics: LaneMetrics;
  stickyBound: StickyBound;
  isOpen: boolean;
};

const EXPAND_SHIFT_RANGE = 400;

export const EventNode: React.FC<EventNodeProps> = ({
  event,
  index,
  xOf,
  classes,
  scrollRef,
  onOpen,
  hover,
  onHoverChange,
  metrics,
  stickyBound,
  isOpen,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const yearRef = useRef<HTMLSpanElement | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  const startX = xOf(parseYear(event.year));
  const endX = event.endYear ? xOf(parseYear(event.endYear)) : startX;
  const midX = (startX + endX) / 2;

  const isVisible = useElementVisibility(cardRef, scrollRef);
  useStickyCardPosition(cardRef, yearRef, scrollRef, {
    startX: stickyBound.startX,
    endX: stickyBound.endX,
    midX,
  });

  const isRange = !!event.endYear;
  const isOngoing = isPresent(event.endYear);
  const isBranch = !!event.branch;
  const cardOnTop = isBranch ? event.branch === "above" : index % 2 === 0;
  const isBelowInteractive = event.branch === "below" && !!event.details;
  const hasSlideshow =
    !event.image && (event.details?.slideshow?.length ?? 0) > 0;
  const expandsImage =
    !!event.details && !!event.image && !hasSlideshow && !isPortrait;
  const yearText = isRange
    ? `${event.year} – ${isOngoing ? "Present" : event.endYear}`
    : event.year;

  const level = event.level ?? 1;
  const branchOffset = isBranch
    ? metrics.branchOffsetBase + (level - 1) * metrics.laneSpacing
    : 0;
  const cardOffset = isBranch
    ? branchOffset + metrics.yearLabelHeight + metrics.cardGap
    : metrics.cardGap;
  const yearOffset = isBranch ? branchOffset + 8 : 14;

  const verticalAnchor = (offset: number): React.CSSProperties =>
    cardOnTop
      ? { bottom: `calc((100% - var(--rail-pos)) + ${offset}px)` }
      : { top: `calc(var(--rail-pos) + ${offset}px)` };

  const isHovered =
    hover != null && hover.midX === midX && hover.cardOnTop === cardOnTop;

  const shiftPx = (() => {
    if (!hover || isHovered) return 0;
    if (!hover.cardOnTop) return 0;
    if (!hover.expands) return 0;
    if (cardOnTop !== hover.cardOnTop) return 0;
    const delta = midX - hover.midX;
    const distance = Math.abs(delta);
    if (distance >= EXPAND_SHIFT_RANGE) return 0;
    const amount = EXPAND_SHIFT_RANGE - distance;
    return delta >= 0 ? amount : -amount;
  })();

  const cardStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: `translateX(calc(-50% + ${shiftPx}px))`,
    transition: "transform 250ms ease",
    ...verticalAnchor(cardOffset),
  };
  const yearStyle: React.CSSProperties = {
    left: `${midX}px`,
    transform: "translateX(-50%)",
    ...verticalAnchor(yearOffset),
  };

  const branchY = cardOnTop
    ? `calc(var(--rail-pos) - ${branchOffset}px)`
    : `calc(var(--rail-pos) + ${branchOffset}px)`;

  const wrapperStyle: React.CSSProperties | undefined = isHovered
    ? { zIndex: 10 }
    : undefined;

  return (
    <div
      className={`${classes.eventWrapper} ${
        isVisible ? classes.eventWrapperVisible : ""
      }`}
      style={wrapperStyle}
    >
      <div
        ref={cardRef}
        className={[
          classes.card,
          isBelowInteractive && classes.cardBelowInteractive,
          hasSlideshow && classes.cardSlideshow,
          !isBelowInteractive && !hasSlideshow && isPortrait && classes.cardPortrait,
        ]
          .filter(Boolean)
          .join(" ")}
        style={cardStyle}
      >
        <Card
          event={event}
          classes={classes}
          onOpen={onOpen}
          onHoverChange={(hovered) =>
            onHoverChange(
              hovered ? { midX, cardOnTop, expands: expandsImage } : null
            )
          }
          isPortrait={isPortrait}
          onPortraitChange={setIsPortrait}
          isBelowInteractive={isBelowInteractive}
          hasSlideshow={hasSlideshow}
          isOpen={isOpen}
        />
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
            top: "calc(var(--rail-pos) - 5px)",
          }}
        />
      ) : (
        <div
          className={classes.dot}
          style={{
            left: `${startX - 7}px`,
            top: "calc(var(--rail-pos) - 7px)",
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
    ? {
        top: `calc(var(--rail-pos) - ${branchOffset}px)`,
        height: `${branchOffset}px`,
      }
    : { top: "var(--rail-pos)", height: `${branchOffset}px` };

  return (
    <>
      <div
        className={classes.junction}
        style={{
          left: `${startX - 5}px`,
          top: "calc(var(--rail-pos) - 5px)",
        }}
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
                style={{
                  left: `${endX - 5}px`,
                  top: "calc(var(--rail-pos) - 5px)",
                }}
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

const Card: React.FC<{
  event: TimelineEvent;
  classes: Classes;
  onOpen: (
    event: TimelineEvent,
    getOriginRect: () => DOMRect | null
  ) => void;
  onHoverChange: (hovered: boolean) => void;
  isPortrait: boolean;
  onPortraitChange: (portrait: boolean) => void;
  isBelowInteractive: boolean;
  hasSlideshow: boolean;
  isOpen: boolean;
}> = ({
  event,
  classes,
  onOpen,
  onHoverChange,
  isPortrait,
  onPortraitChange,
  isBelowInteractive,
  hasSlideshow,
  isOpen,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const src = event.image ? imageMap[event.image] : undefined;
  const slideshowKeys = event.details?.slideshow ?? [];
  const isInteractive = !!event.details;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    onPortraitChange(img.naturalHeight > img.naturalWidth);
  };

  const imageClass = [
    classes.cardImage,
    isInteractive &&
      (!isPortrait || isBelowInteractive) &&
      classes.cardImageInteractive,
    isPortrait && !isBelowInteractive && classes.cardImagePortrait,
    isOpen && classes.cardImageHidden,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {src && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          className={imageClass}
          onLoad={handleLoad}
        />
      )}
      {hasSlideshow && (
        <SlideshowStack
          keys={slideshowKeys}
          classes={classes}
          imageRef={imgRef}
          hidden={isOpen}
        />
      )}
      <div className={classes.cardTextWrapper}>
        <h3 className={classes.cardTitle}>{event.title}</h3>
        <p className={classes.cardDescription}>{event.description}</p>
      </div>
    </>
  );

  if (!isInteractive) return content;

  const buttonClass = [
    classes.cardInteractive,
    isBelowInteractive && classes.cardInteractiveBelow,
    hasSlideshow && classes.cardInteractiveSlideshow,
    !isBelowInteractive &&
      !hasSlideshow &&
      isPortrait &&
      classes.cardInteractivePortrait,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() =>
        onOpen(
          event,
          () => imgRef.current?.getBoundingClientRect() ?? null
        )
      }
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      aria-label={`Open details for ${event.title}`}
    >
      {content}
    </button>
  );
};
