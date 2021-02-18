import React from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Background from './pics/dance.png';
import NavButton from './nav-button';

const styles = {
  Home: {
    color: "white",
    display: "flex",
    "text-align": "center",
    "min-height": "100vh",
    "min-width": "100vw",
    'overflow': "hidden",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    backgroundImage: `url(${Background})`,
   'background-size': 'cover',
   position: 'relative',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  setHomeActive: Function;
  setAboutActive: Function; 
  setProjectsActive: Function;
  setContactActive: Function
}

const Home: React.FunctionComponent<IProps> = ({ 
  classes,
  setHomeActive,
  setAboutActive,
  setProjectsActive,
  setContactActive
 }) => {
    return (
      <>
        <div id="home" className={classes.Home}>
          <h4>Hi! My name is</h4>
          <h1>Jemimah Martinez</h1>
          <NavButton 
            type='down' 
            section='#about' 
            setHomeActive={setHomeActive}
            setAboutActive={setAboutActive} 
            setProjectsActive={setProjectsActive}
            setContactActive={setContactActive}
          />
        </div>

      </>
    );
};

export default withStyles(styles)(Home);
