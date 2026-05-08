import withStyles, { WithStylesProps } from "react-jss";

import NavTriangle from "./nav-triangle";

type Section = "home" | "about" | "projects" | "insights" | "contact";

const styles = {
  overallContainer: {
    position: "fixed",
    top: "6%",
    left: "0",
    width: "100%",
    "z-index": "99",
    display: "grid",
    "grid-template-columns": "repeat(5, 1fr)",
    "pointer-events": "none",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  slot: {
    display: "flex",
    "justify-content": "center",
  },
};

const slots: Section[] = ["home", "about", "projects", "insights", "contact"];

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  activeSection: Section | null;
}

const NavArrow: React.FunctionComponent<IProps> = ({ classes, activeSection }) => {
  if (!activeSection || activeSection === "home") return null;
  return (
    <div className={classes.overallContainer}>
      {slots.map((s) => (
        <div key={s} className={classes.slot}>
          {s === activeSection && <NavTriangle />}
        </div>
      ))}
    </div>
  );
};

export default withStyles(styles)(NavArrow);
