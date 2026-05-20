import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import UpArrow from "../icons/up-arrow";
import DownArrow from "../icons/down-arrow";

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
  button: {
    color: "#ffffff !important",
    height: "75px !important",
    width: "75px !important",
    "background-color": "transparent",
    border: "none",
    outline: "none",
    margin: "0px 20px 0px 20px",
    transition: "color 0.75s",
    "&:hover": {
      color: "#5E1219 !important",
    },
    "align-items": "flex-end",
    "z-index": "99",
    cursor: "pointer",
  },
};

type Type = "up" | "down";
export type Section = "#home" | "#about" | "#insights" | "#contact";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  type: Type;
  section: Section;
  setHomeActive: Function;
  setAboutActive: Function;
  setContactActive: Function;
}

const NavButton: React.FunctionComponent<IProps> = ({
  classes,
  type,
  section,
  setHomeActive,
  setAboutActive,
  setContactActive,
}) => {
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = section.replace("#", "");
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (type === "up") {
    return (
      <div className={classes.upButton}>
        <Button onClick={() => undefined}>
          <a href={section} style={{ textDecoration: "none" }} onClick={scrollToSection}>
            <UpArrow />
          </a>
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.downButton}>
      <Button onClick={() => undefined}>
        <a
          href={section}
          className={classes.button}
          onClick={(e) => {
            scrollToSection(e);
            setHomeActive(false);
            setAboutActive(true);
            setContactActive(false);
          }}
        >
          <DownArrow />
        </a>
      </Button>
    </div>
  );
};

export default withStyles(styles)(NavButton);
