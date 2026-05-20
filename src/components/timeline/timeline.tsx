import React, { useEffect, useMemo, useRef, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";

import { TimelineEvent } from "./constants";
import { EventModal } from "./EventModal";
import { EventNode } from "./EventNode";
import { useInitialScroll, useScrollState } from "./hooks";
import { computeLayout } from "./layout";
import { styles } from "./styles";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  events: TimelineEvent[];
}

const SNAP_EPSILON = 4;

type HoverInfo = { midX: number; cardOnTop: boolean; expands: boolean };

const Timeline: React.FunctionComponent<IProps> = ({ classes, events }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const presentXRef = useRef(0);
  const originRectRef = useRef<() => DOMRect | null>(() => null);
  const [openEvent, setOpenEvent] = useState<TimelineEvent | null>(null);
  const [hover, setHover] = useState<HoverInfo | null>(null);

  const handleOpen = (
    event: TimelineEvent,
    getOriginRect: () => DOMRect | null
  ) => {
    originRectRef.current = getOriginRect;
    setOpenEvent(event);
  };

  const { containerWidth, containerHeight, atStart, atEnd, atPresent } =
    useScrollState(scrollRef, presentXRef);

  const layout = useMemo(
    () => computeLayout(events, containerWidth, containerHeight),
    [events, containerWidth, containerHeight]
  );

  useEffect(() => {
    presentXRef.current = layout.presentX;
  }, [layout.presentX]);

  useInitialScroll(scrollRef, {
    containerWidth,
    presentX: layout.presentX,
    trackHeight: layout.trackHeight,
    belowReach: layout.belowReach,
    railTop: layout.railTop,
  });

  const snapTo = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const target =
      direction === 1
        ? layout.snapTargets.find((c) => c > center + SNAP_EPSILON)
        : [...layout.snapTargets]
            .reverse()
            .find((c) => c < center - SNAP_EPSILON);
    if (target === undefined) return;
    el.scrollTo({ left: target - el.clientWidth / 2, behavior: "smooth" });
  };

  const wrapperStyle: React.CSSProperties = {
    height: `${layout.trackHeight}px`,
    ["--rail-pos" as any]: `${layout.railTop}px`,
  };

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <div
        className={`${classes.arrow} ${classes.arrowLeft} ${
          atStart ? classes.arrowHidden : ""
        }`}
      >
        <Button onClick={() => snapTo(-1)}>
          <LeftArrow />
        </Button>
      </div>
      <div
        ref={scrollRef}
        className={classes.scrollContainer}
        style={openEvent ? { overflow: "hidden" } : undefined}
      >
        <div
          className={classes.track}
          style={{
            width: `${layout.trackWidth}px`,
            height: `${layout.trackHeight}px`,
          }}
        >
          <div
            className={classes.baseline}
            style={{ left: `${layout.baselineStart}px` }}
          />
          {layout.yearTicks.map((y) => (
            <div
              key={`tick-${y}`}
              className={classes.yearTick}
              style={{ left: `${layout.xOf(y)}px` }}
            />
          ))}
          {layout.snapTargets.map((c, i) => (
            <div
              key={`snap-${i}`}
              className={classes.snapTarget}
              style={{ left: `${c}px` }}
            />
          ))}
          {layout.sorted.map((event, i) => (
            <EventNode
              key={`${event.year}-${i}`}
              event={event}
              index={i}
              xOf={layout.xOf}
              classes={classes}
              scrollRef={scrollRef}
              onOpen={handleOpen}
              hover={hover}
              onHoverChange={setHover}
              metrics={layout.metrics}
              stickyBound={layout.stickyBounds[i]}
              isOpen={openEvent === event}
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
      <EventModal
        event={openEvent}
        onClose={() => setOpenEvent(null)}
        classes={classes}
        originRectRef={originRectRef}
      />
    </div>
  );
};

export default withStyles(styles)(Timeline);
