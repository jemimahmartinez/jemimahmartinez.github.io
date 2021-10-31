import withStyles, { WithStylesProps } from "react-jss";

import { Section } from "./nav-button";
import NavTriangle from "./nav-triangle";

const styles = {
  overallContainer: {
    width: "100%",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "flex-end",
    position: "sticky",
    "z-index": "99",
    top: "6%", // 7.50%
    // transition: 'height 5s ease',
  },
  containerAbout: {
    width: "75%",
    height: "100%",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "flex-start",
  },
  containerProjects: {
    width: "75%",
    height: "100%",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-evenly",
  },
  containerContact: {
    width: "75%",
    height: "100%",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "flex-end",
  },
  noContainer: {
    display: "none",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  section: Section;
  active: boolean;
}

const NavArrow: React.FunctionComponent<IProps> = ({
  classes,
  section,
  active,
}) => {
  let containerAboutArrow, containerProjectsArrow, containerContactArrow;
  switch (section) {
    case "#about":
      active
        ? (containerAboutArrow = classes.containerAbout)
        : (containerAboutArrow = classes.noContainer);
      return (
        <div className={classes.overallContainer}>
          <div className={containerAboutArrow}>
            <NavTriangle />
          </div>
        </div>
      );
    case "#projects":
      active
        ? (containerProjectsArrow = classes.containerProjects)
        : (containerProjectsArrow = classes.noContainer);
      return (
        <div className={classes.overallContainer}>
          <div className={containerProjectsArrow}>
            <NavTriangle />
          </div>
        </div>
      );
    default:
      // '#contact'
      active
        ? (containerContactArrow = classes.containerContact)
        : (containerContactArrow = classes.noContainer);
      return (
        <div className={classes.overallContainer}>
          <div className={containerContactArrow}>
            <NavTriangle />
          </div>
        </div>
      );
  }
};

export default withStyles(styles)(NavArrow);
