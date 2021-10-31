import withStyles, { WithStylesProps } from "react-jss";

import Image from "../pics/me.png";
import User from "../icons/user";
import PinPoint from "../icons/pin-point";
import RowFlexContainer from "../layout/row-flex";
import ColumnFlexContainer from "../layout/column-flex";
import NavArrow from "../nav/navigated-arrow";

const styles = {
  About: {
    color: "white",
    display: "flex",
    "font-size": "calc(10px + 2vmin)",
    "text-align": "center",
    "min-height": "100vh",
    "min-width": "100vw",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    "background-color": "#000000",
    position: "relative",
  },
  text: {
    "text-align": "start",
    width: "100%",
    height: "100%",
  },
  image: {
    height: "20%",
    width: "20%",
    margin: "0px 15px 0px 15px",
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
  aboutActivate: boolean;
}

const About: React.ComponentType<IProps> = ({ classes, aboutActivate }) => {
  return (
    <>
      <NavArrow section="#about" active={aboutActivate} />
      <div id="about" className={classes.About}>
        <h1>About Me</h1>
        <RowFlexContainer center={true}>
          <img src={Image} alt="" className={classes.image} />
          <ColumnFlexContainer>
            <RowFlexContainer center={false}>
              <User className={classes.icon} />
              <p className={classes.text}>
                Final year Computer Systems Engineering student at the
                University of Auckland
              </p>
            </RowFlexContainer>
            <RowFlexContainer center={false}>
              <PinPoint className={classes.icon} />
              <p className={classes.text}>Auckland, New Zealand</p>
            </RowFlexContainer>
          </ColumnFlexContainer>
        </RowFlexContainer>
      </div>
    </>
  );
};

export default withStyles(styles)(About);
