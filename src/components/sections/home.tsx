import React from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Background from "../pics/dance.png";
import NavButton from "../nav/nav-button";
import { useOracle } from "../../useOracle";

const styles = {
  Home: {
    color: "white",
    display: "flex",
    "text-align": "center",
    "min-height": "100vh",
    width: "100%",
    overflow: "hidden",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    backgroundImage: `url(${Background})`,
    "background-size": "cover",
    position: "relative",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  setHomeActive: Function;
  setAboutActive: Function;
  setProjectsActive: Function;
  setContactActive: Function;
}

const Home: React.FunctionComponent<IProps> = ({
  classes,
  setHomeActive,
  setAboutActive,
  setProjectsActive,
  setContactActive,
}) => {
  const oracle = useOracle();
  return (
    <div id="home" className={classes.Home}>
      <h4>{oracle.home.greeting}</h4>
      <h1>{oracle.home.name}</h1>
      <NavButton
        type="down"
        section="#about"
        setHomeActive={setHomeActive}
        setAboutActive={setAboutActive}
        setProjectsActive={setProjectsActive}
        setContactActive={setContactActive}
      />
    </div>
  );
};

export default withStyles(styles)(Home);
