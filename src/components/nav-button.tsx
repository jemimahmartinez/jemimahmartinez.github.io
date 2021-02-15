import withStyles, { WithStylesProps } from "react-jss";

import Button from "./button";
import UpArrow from "./icons/up-arrow";
import DownArrow from "./icons/down-arrow";

const styles = {
  downButton: {
    position: "absolute",
    bottom: "-85%",
    width: "100%",
    height: "100%",
  },
  upButton: {
    position: "absolute",
    top: "5%",
    width: "100%",
    height: "100%",
  },
};

type Type = "up" | "down";
type Section = "#home" | "#about" | "#projects" | "#contact";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  type: Type;
  section: Section;
}

const NavButton: React.FunctionComponent<IProps> = ({
  classes,
  type,
  section,
}) => {
  if (type === "up") {
    return (
      <div className={classes.upButton}>
        <Button>
          <a href={section}>
            <UpArrow />
          </a>
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.downButton}>
      <Button>
        <a href={section}>
          <DownArrow />
        </a>
      </Button>
    </div>
  );
};

export default withStyles(styles)(NavButton);
