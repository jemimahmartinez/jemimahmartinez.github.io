import React, { useEffect, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";
import ReactMarkdown from "react-markdown";

import TileShell from "./tile-shell";
import { ReportIndexEntry } from "./types";

const styles = {
  meta: {
    margin: "0 0 16px 0",
    color: "#bbb",
    "font-size": "0.9em",
  },
  empty: {
    color: "#888",
    "font-style": "italic",
  },
  markdown: {
    "& h1, & h2, & h3, & h4": {
      color: "white",
      margin: "20px 0 10px 0",
    },
    "& a": {
      color: "#5E1219",
    },
    "& code": {
      "background-color": "#000000",
      padding: "2px 6px",
      "border-radius": "3px",
      "font-size": "0.9em",
    },
    "& pre": {
      "background-color": "#000000",
      padding: "12px",
      "border-radius": "4px",
      overflow: "auto",
    },
    "& blockquote": {
      "border-left": "3px solid #5E1219",
      "padding-left": "12px",
      margin: "12px 0",
      color: "#bbb",
    },
    "& ul, & ol": {
      "padding-left": "24px",
    },
    "& table": {
      display: "block",
      "border-collapse": "collapse",
      "max-width": "100%",
      "overflow-x": "auto",
      "-webkit-overflow-scrolling": "touch",
      margin: "12px 0",
    },
    "& th, & td": {
      border: "1px solid #3E0C0C",
      padding: "8px",
      "text-align": "left",
    },
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const LatestReport: React.FunctionComponent<IProps> = ({ classes }) => {
  const [entry, setEntry] = useState<ReportIndexEntry | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${process.env.PUBLIC_URL}/data/reports/index.json`)
      .then((r) => r.json() as Promise<ReportIndexEntry[]>)
      .then((list) => {
        if (cancelled) return;
        if (!list.length) {
          setEntry(null);
          return;
        }
        const latest = list[0];
        setEntry(latest);
        return fetch(
          `${process.env.PUBLIC_URL}/data/reports/${latest.id}.md`
        ).then((r) => r.text());
      })
      .then((text) => {
        if (cancelled) return;
        if (text) setBody(text);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TileShell title="Latest quarterly report">
      {error && <p className={classes.empty}>Failed to load: {error}</p>}
      {!error && !entry && (
        <p className={classes.empty}>No reports published yet.</p>
      )}
      {entry && (
        <>
          <p className={classes.meta}>
            <strong>{entry.label}</strong> · published {entry.publishedAt}
          </p>
          {body ? (
            <div className={classes.markdown}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          ) : (
            <p className={classes.empty}>Loading…</p>
          )}
        </>
      )}
    </TileShell>
  );
};

export default withStyles(styles)(LatestReport);
