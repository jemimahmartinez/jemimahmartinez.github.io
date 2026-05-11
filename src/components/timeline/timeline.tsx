import React, { useEffect, useMemo, useRef } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";

import { TimelineEvent } from "./constants";
import { EventNode } from "./EventNode";
import { useInitialScroll, useScrollState } from "./hooks";
import { computeLayout } from "./layout";
import { styles } from "./styles";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  events: TimelineEvent[];
}

const SNAP_EPSILON = 4;

const Timeline: React.FunctionComponent<IProps> = ({ classes, events }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const presentXRef = useRef(0);

  const { containerWidth, atStart, atEnd, atPresent } = useScrollState(
    scrollRef,
    presentXRef
  );

  const layout = useMemo(
    () => computeLayout(events, containerWidth),
    [events, containerWidth]
  );

  useEffect(() => {
    presentXRef.current = layout.presentX;
  }, [layout.presentX]);

  useInitialScroll(scrollRef, {
    containerWidth,
    presentX: layout.presentX,
    trackHeight: layout.trackHeight,
    belowReach: layout.belowReach,
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

export default withStyles(styles)(Timeline);
