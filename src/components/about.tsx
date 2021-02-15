import withStyles, { WithStylesProps } from "react-jss";

import Image from "./pics/me.png";
import User from "./icons/user";
import PinPoint from "./icons/pin-point";
import RowFlexContainer from "./layout/row-flex";
import ColumnFlexContainer from "./layout/column-flex";
import Button from './button';
import DownArrow from './icons/down-arrow';
import UpArrow from './icons/up-arrow';

const styles = {
  About: {
    color: "white",
    display: "flex",
    "font-size": "calc(10px + 2vmin)",
    "text-align": "center",
    "min-height": "100vh",
    "min-width": "100vw",
    overflow: "hidden",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    "background-color": "#000000",
    position: 'relative',
  },
  text: {
    'text-align': 'start',
    width: '100%',
    height: '100%'
  },
  image: {
    height: "20%", // 300px
    width: "20%",
    margin: '0px 15px 0px 15px',
    "border-radius": "50px",
  },
  icon: {
    color: "#ffffff !important",
    height: "50px !important",
    width: "50px !important",
    "background-color": "transparent",
    border: "none",
    outline: "none",
    margin: "0px 15px 0px 15px",
  },
  downButton: {
    position: 'absolute',
    bottom: '-85%',
    width: '100%',
    height: '100%',
  },
  upButton: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    height: '100%',
  }
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const About: React.ComponentType<IProps> = ({ classes }) => {
  return (
    <div id="about" className={classes.About}>
      <div className={classes.upButton}>
        <Button>
          <a href="#home">
            <UpArrow />
          </a>
        </Button>
      </div>
      <h1>About Me</h1>
      <RowFlexContainer center={true}>
        <img src={Image} alt='' className={classes.image} />
        <ColumnFlexContainer>
          <RowFlexContainer center={false}>
            <User className={classes.icon} />
            <p className={classes.text}>
              Final year Computer Systems Engineering student at the University
              of Auckland
            </p>
          </RowFlexContainer>
          <RowFlexContainer center={false}>
            <PinPoint className={classes.icon} />
            <p>Auckland, New Zealand</p>
          </RowFlexContainer>
        </ColumnFlexContainer>
      </RowFlexContainer>
      <div className={classes.downButton}>
        <Button>
          <a href="#projects">
            <DownArrow />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(About);
