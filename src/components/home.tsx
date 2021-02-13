import React, { useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import DownArrow from "./icons/down-arrow";
import About from "./about";
import Projects from "./projects";
import Contact from "./contact";
import Button from "./button";
import Background from './pics/dance.png';

const styles = {
  Home: {
    color: "white",
    display: "flex",
    "text-align": "center",
    "min-height": "100vh",
    "min-width": "100vw",
    overflow: "hidden",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    // 'background-color': '#000000',
    // background: ["url(./pics/revue/png)", "no-repeat", "top"],
    backgroundImage: `url(${Background})`,
   'background-size': 'cover',
    // animationName: '$expand',
    // 'animation-duration': '4s',
    // 'animation-timing-function': 'ease-out',
    // transition: 'transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },
  // '@keyframes animatedFadeOutClass': {
  //   'transition': '0.5s',
  //   'opacity': '0',
  //   'height': '0',
  //   'overflow': 'hidden',
  // },
  // "@keyframes expand": {
  //   from: { top: "0px" },
  //   to: { top: "500px" },
  // },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Home: React.FunctionComponent<IProps> = ({ classes }) => {
  const [contentVisibility, setContentVisibility] = useState(false);
  if (contentVisibility) {
    return (
      <>
        <div className={classes.Home}>
          <p>Hi! My name is</p>
          <h2>Jemimah Martinez</h2>
          <Button onClick={() => setContentVisibility(!contentVisibility)}>
            <DownArrow />
          </Button>
        </div>
        <About />
        <Projects />
        <Contact />
      </>
    );
  } else {
    return (
      <div className={classes.Home}>
        <p>Hi! My name is</p>
        <h2>Jemimah Martinez</h2>
        <Button onClick={() => setContentVisibility(!contentVisibility)}>
          <DownArrow />
        </Button>
      </div>
    );
  }
};

export default withStyles(styles)(Home);
