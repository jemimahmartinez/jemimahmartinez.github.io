import React, { useState } from 'react';
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
  a: {
    display: "block",
    color: "white",
    "text-align": "center",
    padding: "14px 16px",
    "text-decoration": "none",
    "&:hover": {
      "background-color": "#4E4E50 ",
    },
  },
  active: {
    display: "block",
    color: "white",
    "text-align": "center",
    padding: "14px 16px",
    "text-decoration": "none",
    'background-color': '#C3073F',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const App: React.ComponentType<IProps> = ({ classes }) => {
  let navHomeClass, navAboutClass, navProjectsClass, navContactClass;

  const [homeActive, setHomeActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [aboutActivate, setAboutActivate] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const [projectsActivate, setProjectsActivate] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [contactActivate, setContactActivate] = useState(false);

  if (homeActive) {
    navHomeClass = classes.active;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navContactClass = classes.a;
  } else if (aboutActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.active;
    navProjectsClass = classes.a;
    navContactClass = classes.a;
  } else if (projectsActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.active;
    navContactClass = classes.a;
  } else if (contactActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navContactClass = classes.active;
  } else if (!homeActive && !aboutActive && !projectsActive && !contactActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navContactClass = classes.a;
  }

  window.onscroll = function() {
    console.log(window.pageYOffset);
    if (window.pageYOffset < (0.25*document.body.scrollHeight)) { // 800 25%
      setHomeActive(true);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(false);
      setContactActivate(false);
    } else if ( window.pageYOffset > (0.25*document.body.scrollHeight) && window.pageYOffset < (0.50*document.body.scrollHeight)) { // 800 1475 25% - 50%
      setHomeActive(false);
      setAboutActive(true);
      setProjectsActive(false);
      setContactActive(false);
      setAboutActivate(true);
      setProjectsActivate(false);
      setContactActivate(false);
    } else if (window.pageYOffset > (0.50*document.body.scrollHeight) && window.pageYOffset < (0.74*document.body.scrollHeight)) { // 1550 2250 50% - 75%
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(true);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(true);
      setContactActivate(false);
    } else if (window.pageYOffset > (0.75*document.body.scrollHeight)) { // 2300 75% - 100%
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(true);
      setAboutActivate(false);
      setProjectsActivate(false);
      setContactActivate(true);
    } else {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(false);
      setContactActivate(false);
    }
}

// console.log('outer: ', window.outerHeight);
// console.log('inner: ', window.innerHeight);
// let heightApp = document.getElementsByClassName("App").scrollHeight;
// console.log({heightApp});

// console.log("Page height:",document.body.scrollHeight);

  return (
      <div className={classes.App}>
        <Home
          setHomeActive={setHomeActive}
          setAboutActive={setAboutActive}
          setProjectsActive={setProjectsActive}
          setContactActive={setContactActive}
        />
        <NavBar 
          navHomeClass={navHomeClass} 
          navAboutClass={navAboutClass} 
          navProjectsClass={navProjectsClass} 
          navContactClass={navContactClass} 
          setHomeActive={setHomeActive}
          setAboutActive={setAboutActive}
          setProjectsActive={setProjectsActive}
          setContactActive={setContactActive}
        />
        <About aboutActivate={aboutActivate}/>
        <Projects projectsActivate={projectsActivate}/>
        <Contact contactActivate={contactActivate}/>
      </div>
  );
};

export default withStyles(styles)(App);
