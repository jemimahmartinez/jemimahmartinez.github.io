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
    "&:active": {
        'background-color': '#C3073F',
    },
    transition: 'height 1s ease',
  },
  active: {
    display: "block",
    color: "white",
    "text-align": "center",
    padding: "14px 16px",
    "text-decoration": "none",
    'background-color': '#C3073F',
  },
  line: {
    'background-color': '#FFFFFF',
    width: '100%',
    height: '10px'
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const App: React.ComponentType<IProps> = ({ classes }) => {
  let navHomeClass, navAboutClass, navProjectsClass, navContactClass;

  const [homeActive, setHomeActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

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
    if (window.pageYOffset < 800) {
      setHomeActive(true);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(false);
    } else if ( window.pageYOffset > 800 && window.pageYOffset < 1475) {
      setHomeActive(false);
      setAboutActive(true);
      setProjectsActive(false);
      setContactActive(false);
    } else if (window.pageYOffset > 1500 && window.pageYOffset < 2250) {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(true);
      setContactActive(false);
    } else if (window.pageYOffset > 2300) {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(true);
    } else {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setContactActive(false);
    }
}

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
        <About aboutActive={aboutActive}/>
        <Projects projectsActive={projectsActive}/>
        <Contact contactActive={contactActive}/>
      </div>
  );
};

export default withStyles(styles)(App);
