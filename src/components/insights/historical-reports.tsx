import React, { useEffect, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";
import ReactMarkdown from "react-markdown";

import TileShell from "./tile-shell";
import { ReportIndexEntry } from "./types";

const styles = {
  empty: {
    color: "#888",
    "font-style": "italic",
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
    border: "1px solid #4E4E50",
    "border-radius": "4px",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    "align-items": "center",
    padding: "10px 14px",
    "background-color": "transparent",
    color: "white",
    border: "none",
    width: "100%",
    cursor: "pointer",
    "font-family": "Montserrat, sans-serif",
    "font-size": "1em",
    "text-align": "left",
    transition: "background-color 0.2s",
    "&:hover": {
      "background-color": "#000000",
    },
  },
  meta: {
    color: "#bbb",
    "font-size": "0.85em",
  },
  body: {
    padding: "12px 14px",
    "background-color": "#000000",
    "border-top": "1px solid #4E4E50",
    color: "#e0e0e0",
    "& h1, & h2, & h3, & h4": {
      color: "white",
      margin: "12px 0 8px 0",
    },
    "& a": { color: "#C3073F" },
  },
  summary: {
    margin: "0 0 8px 0",
    color: "#bbb",
    "font-size": "0.9em",
    "font-style": "italic",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const HistoricalReports: React.FunctionComponent<IProps> = ({ classes }) => {
  const [entries, setEntries] = useState<ReportIndexEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [bodies, setBodies] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/reports/index.json`)
      .then((r) => r.json())
      .then(setEntries)
      .catch((e) => setError(String(e)));
  }, []);

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!bodies[id]) {
      fetch(`${process.env.PUBLIC_URL}/data/reports/${id}.md`)
        .then((r) => r.text())
        .then((text) => setBodies((prev) => ({ ...prev, [id]: text })))
        .catch(() => {});
    }
  };

  return (
    <TileShell title="All quarterly reports">
      {error && <p className={classes.empty}>Failed to load: {error}</p>}
      {!error && (!entries || entries.length === 0) && (
        <p className={classes.empty}>No reports yet.</p>
      )}
      {entries && entries.length > 0 && (
        <ul className={classes.list}>
          {entries.map((e) => (
            <li key={e.id} className={classes.item}>
              <button
                className={classes.header}
                onClick={() => toggle(e.id)}
                type="button"
              >
                <span>
                  <strong>{e.label}</strong>
                </span>
                <span className={classes.meta}>
                  {e.publishedAt} {openId === e.id ? "▲" : "▼"}
                </span>
              </button>
              {openId === e.id && (
                <div className={classes.body}>
                  {e.summary && <p className={classes.summary}>{e.summary}</p>}
                  {bodies[e.id] ? (
                    <ReactMarkdown>{bodies[e.id]}</ReactMarkdown>
                  ) : (
                    <p className={classes.empty}>Loading…</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </TileShell>
  );
};

export default withStyles(styles)(HistoricalReports);
