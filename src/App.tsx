import React from 'react';
import './App.css';
import withStyles, { WithStylesProps } from 'react-jss';

import Home from './components/home';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import NavBar from './components/navbar';

const styles = {
  App: {
    'min-height': '100vh',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'font-size': 'calc(10px + 2vmin)',
    'font-family': 'Montserrat, sans-serif',
    color: 'white',
    'background-color': '#000000'
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}
const App: React.ComponentType<IProps> = ({ classes }) => {
  return (
      <div className={classes.App}>
        <Home />
        <NavBar />
        <About />
        <Projects />
        <Contact />
      </div>
  );
};

export default withStyles(styles)(App);
