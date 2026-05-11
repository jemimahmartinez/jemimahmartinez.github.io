import withStyles, { WithStylesProps } from "react-jss";

import Timeline from "../timeline/timeline";
import { useOracle } from "../../useOracle";

const styles = {
  About: {
    color: "white",
    display: "flex",
    "font-size": "calc(10px + 2vmin)",
    "text-align": "center",
    "min-height": "100vh",
    height: "100vh",
    "max-height": "100vh",
    width: "100%",
    "align-items": "stretch",
    "flex-direction": "column",
    "justify-content": "center",
    "background-color": "#000000",
    position: "relative",
    overflow: "hidden",
    "box-sizing": "border-box",
  },
  heading: {
    margin: "0",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const About: React.ComponentType<IProps> = ({ classes }) => {
  const oracle = useOracle();
  return (
    <div id="about" className={classes.About}>
      <Timeline events={oracle.about.timeline as any} />
    </div>
  );
};

export default withStyles(styles)(About);
