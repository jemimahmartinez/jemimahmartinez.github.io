import React, { useEffect, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import TileShell from "./tile-shell";
import { LadderGap as LadderGapData, LadderGapStatus } from "./types";
import { useOracle } from "../../useOracle";

const STATUS_COLOR: Record<LadderGapStatus, string> = {
  met: "#4caf50",
  developing: "#ffb300",
  gap: "#5E1219",
};

const styles = {
  meta: {
    margin: "0 0 12px 0",
    color: "#bbb",
    "font-size": "0.9em",
  },
  level: {
    color: "white",
    "font-weight": "bold",
  },
  list: {
    "list-style": "none",
    margin: "0",
    padding: "0",
    display: "flex",
    "flex-direction": "column",
    gap: "8px",
  },
  item: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "flex-start",
    gap: "12px",
  },
  dot: {
    width: "12px",
    height: "12px",
    "border-radius": "50%",
    "flex-shrink": "0",
    "margin-top": "6px",
  },
  competency: {
    margin: "0",
    "font-weight": "bold",
    color: "white",
  },
  notes: {
    margin: "2px 0 0 0",
    color: "#bbb",
    "font-size": "0.9em",
  },
  empty: {
    color: "#888",
    "font-style": "italic",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const LadderGap: React.FunctionComponent<IProps> = ({ classes }) => {
  const [data, setData] = useState<LadderGapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const oracle = useOracle();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/ladder-gap.json`)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <TileShell title={oracle.insights.tiles.ladderGap}>
      {error && (
        <p className={classes.empty}>{oracle.insights.failedToLoad(error)}</p>
      )}
      {!error && !data && (
        <p className={classes.empty}>{oracle.insights.empty.ladderGap}</p>
      )}
      {data && (
        <>
          <p className={classes.meta}>
            <span className={classes.level}>{data.currentLevel}</span>
            {" → "}
            <span className={classes.level}>{data.targetLevel}</span>
            {"  ·  as of "}
            {data.asOf}
          </p>
          <ul className={classes.list}>
            {data.gaps.map((g, i) => (
              <li key={i} className={classes.item}>
                <span
                  className={classes.dot}
                  style={{ backgroundColor: STATUS_COLOR[g.status] }}
                />
                <div>
                  <p className={classes.competency}>{g.competency}</p>
                  {g.notes && <p className={classes.notes}>{g.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </TileShell>
  );
};

export default withStyles(styles)(LadderGap);
