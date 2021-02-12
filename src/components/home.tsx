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
    animationName: '$expand',
    'animation-duration': '4s',
    'animation-timing-function': 'ease-out',
    transition: 'transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },
  button: {
    color: '#ffffff !important',
    height: '100px',
    width: '100px',
    'background-color': 'transparent',
    border: 'none',
    outline: 'none',
  },

  '@keyframes expand': {
    from: { top: '0px' },
    to: { top: '500px' },
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
