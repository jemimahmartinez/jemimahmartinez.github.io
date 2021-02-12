import React from 'react';
import './App.css';
import withStyles, { WithStylesProps } from 'react-jss';

import Home from './components/home';
// import About from './components/about';

const styles = {
  App: {
    'background-color': '#000000',
    'min-height': '100vh',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'font-size': 'calc(10px + 2vmin)',
    color: 'white',
    'overflow-x': 'hidden',
    'scroll-behaviour': 'smooth',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}
const App: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.App}>
      {/* <section id='home' ref="about"> */}
      <Home />
      {/* </section>
       <section id='about'>
        <About />
      </section> */}
    </div>
  );
};

export default withStyles(styles)(App);
