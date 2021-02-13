import withStyles, { WithStylesProps } from "react-jss";

import Image from "./me.png";
import User from "./icons/user";
import PinPoint from "./icons/pin-point";
import RowFlexContainer from "./layout/row-flex";
import ColumnFlexContainer from "./layout/column-flex";

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
    // animationName: '$expand',
    // 'animation-duration': '4s',
    // 'animation-timing-function': 'ease-out',
  },

  // '@keyframes expand': {
  //   from: { top: '0px' },
  //   to: { top: '500px' },
  // },
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
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const About: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.About}>
      <h1>About Me</h1>
      <RowFlexContainer center={true}>
        <img src={Image} alt='' className={classes.image} />
        <ColumnFlexContainer>
          <RowFlexContainer center={false}>
            <User className={classes.icon} />
            <p>
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
    </div>
  );
};

export default withStyles(styles)(About);
