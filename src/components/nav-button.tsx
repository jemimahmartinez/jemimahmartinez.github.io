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
  button: {
    color: '#ffffff !important',
    height: '75px !important',
    width: '75px !important',
    'background-color': 'transparent',
    border: 'none',
    outline: 'none',
    margin: '0px 20px 0px 20px',
    transition: 'color 0.75s',
    '&:hover': {
      color: '#C3073F !important',
    },
    'align-items': 'flex-end',
    'z-index': '99',
    cursor: 'pointer',
  },
};

type Type = "up" | "down";
export type Section = "#home" | "#about" | "#projects" | "#contact";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  type: Type;
  section: Section;
  setHomeActive: Function;
  setAboutActive: Function;
  setProjectsActive: Function;
  setContactActive: Function;
}

const NavButton: React.FunctionComponent<IProps> = ({
  classes,
  type,
  section,
  setHomeActive,
  setAboutActive,
  setProjectsActive,
  setContactActive,
}) => {
  if (type === "up") {
    return (
      <div className={classes.upButton}>
        <Button onClick={() => console.log('Up')}>
          <a href={section} style={{  textDecoration: 'none'}}>
            <UpArrow />
          </a>
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.downButton}>
      <Button onClick={() => console.log('Down')}>
        <a href={section} className={classes.button} onClick={()=>{
            setHomeActive(false);
            setAboutActive(true);
            setProjectsActive(false);
            setContactActive(false);
          }}>
          <DownArrow />
        </a>
      </Button>
    </div>
  );
};

export default withStyles(styles)(NavButton);
