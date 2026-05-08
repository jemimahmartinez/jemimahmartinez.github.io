import React from "react";
import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  tile: {
    "background-color": "#1A1A1D",
    border: "1px solid #3E0C0C",
    "border-radius": "8px",
    padding: "20px",
    "text-align": "left",
    "font-size": "0.65em",
  },
  title: {
    margin: "0 0 12px 0",
    "font-size": "1.1em",
    color: "white",
    "border-bottom": "2px solid #5E1219",
    "padding-bottom": "6px",
  },
  body: {
    color: "#e0e0e0",
    "line-height": "1.5",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  title: string;
  children: React.ReactNode;
}

const TileShell: React.FunctionComponent<IProps> = ({
  classes,
  title,
  children,
}) => (
  <section className={classes.tile}>
    <h2 className={classes.title}>{title}</h2>
    <div className={classes.body}>{children}</div>
  </section>
);

export default withStyles(styles)(TileShell);
