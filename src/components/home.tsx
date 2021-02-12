import React, { useState } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import DownArrow from './icons/down-arrow';
import About from './about';
import Projects from './projects';
import Contact from './contact';

const styles = {
  Home: {
    color: 'white',
    display: 'flex',
    'font-size': 'calc(10px + 2vmin)',
    'text-align': 'center',
    'min-height': '100vh',
    'min-width': '100vw',
    overflow: 'hidden',
    'align-items': 'center',
    'flex-direction': 'column',
    'justify-content': 'center',
    'background-color': '#000000',
  },
  button: {
    color: '#ffffff !important',
    height: '100px',
    width: '100px',
    'background-color': 'transparent',
    border: 'none',
    outline: 'none',
    // 'transition-property': 'height',
    // 'transition-duration': '3s',
  },
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
          <h1>Hi!</h1>
          <h2>My name is Jemimah :) </h2>
          <button
            type='button'
            className={classes.button}
            onClick={() => setContentVisibility(!contentVisibility)}
          >
            <DownArrow />
          </button>
        </div>
        <About />
        <Projects />
        <Contact />
      </>
    );
  } else {
    return (
      <div className={classes.Home}>
        <h1>Hi!</h1>
        <h2>My name is Jemimah :) </h2>
        <button
          type='button'
          className={classes.button}
          onClick={() => setContentVisibility(!contentVisibility)}
        >
          <DownArrow />
        </button>
      </div>
    );
  }
};

export default withStyles(styles)(Home);
