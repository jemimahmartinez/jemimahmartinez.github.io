import React, { useEffect, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import TileShell from "./tile-shell";
import { QuarterMetrics } from "./types";

type MetricKey =
  | "prsMerged"
  | "commits"
  | "reviews"
  | "ticketsClosed"
  | "storyPoints"
  | "pagesAuthored";

const METRICS: Array<{ key: MetricKey; label: string; pick: (q: QuarterMetrics) => number }> = [
  { key: "prsMerged", label: "PRs merged", pick: (q) => q.github.prsMerged },
  { key: "commits", label: "Commits", pick: (q) => q.github.commits },
  { key: "reviews", label: "Reviews", pick: (q) => q.github.reviews },
  { key: "ticketsClosed", label: "Tickets closed", pick: (q) => q.jira.ticketsClosed },
  { key: "storyPoints", label: "Story points", pick: (q) => q.jira.storyPoints },
  { key: "pagesAuthored", label: "Pages authored", pick: (q) => q.confluence.pagesAuthored },
];

const styles = {
  empty: {
    color: "#888",
    "font-style": "italic",
  },
  metricRow: {
    margin: "0 0 16px 0",
  },
  metricLabel: {
    margin: "0 0 6px 0",
    color: "white",
    "font-weight": "bold",
  },
  bars: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "flex-end",
    gap: "6px",
    height: "60px",
  },
  barColumn: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    flex: "1",
    "min-width": "0",
  },
  bar: {
    width: "100%",
    "background-color": "#C3073F",
    "border-radius": "2px 2px 0 0",
    "min-height": "2px",
  },
  quarterLabel: {
    margin: "4px 0 0 0",
    "font-size": "0.75em",
    color: "#bbb",
    "white-space": "nowrap",
    overflow: "hidden",
    "text-overflow": "ellipsis",
    width: "100%",
    "text-align": "center",
  },
  value: {
    "font-size": "0.7em",
    color: "#e0e0e0",
    "margin-bottom": "2px",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const VelocityDashboard: React.FunctionComponent<IProps> = ({ classes }) => {
  const [data, setData] = useState<QuarterMetrics[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/velocity.json`)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <TileShell title="Velocity">
      {error && <p className={classes.empty}>Failed to load: {error}</p>}
      {!error && (!data || data.length === 0) && (
        <p className={classes.empty}>No velocity data published yet.</p>
      )}
      {data &&
        data.length > 0 &&
        METRICS.map((m) => {
          const max = Math.max(...data.map(m.pick), 1);
          return (
            <div key={m.key} className={classes.metricRow}>
              <p className={classes.metricLabel}>{m.label}</p>
              <div className={classes.bars}>
                {data.map((q) => {
                  const v = m.pick(q);
                  const pct = (v / max) * 100;
                  return (
                    <div key={q.id} className={classes.barColumn}>
                      <span className={classes.value}>{v}</span>
                      <div
                        className={classes.bar}
                        style={{ height: `${pct}%` }}
                      />
                      <p className={classes.quarterLabel}>{q.quarter}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </TileShell>
  );
};

export default withStyles(styles)(VelocityDashboard);
