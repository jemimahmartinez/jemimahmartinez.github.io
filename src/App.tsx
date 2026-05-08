import React, { useState } from "react";
import "./App.css";
import withStyles, { WithStylesProps } from "react-jss";

import Home from "./components/sections/home";
import About from "./components/sections/about";
import Projects from "./components/sections/projects";
import Insights from "./components/sections/insights";
import Contact from "./components/sections/contact";
import NavBar from "./components/nav/navbar";

const styles = {
  App: {
    "min-height": "100vh",
    width: "100%",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    "font-size": "calc(10px + 2vmin)",
    "font-family": "Montserrat, sans-serif",
    color: "white",
    "background-color": "#000000",
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
    "background-color": "#C3073F",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const App: React.ComponentType<IProps> = ({ classes }) => {
  let navHomeClass,
    navAboutClass,
    navProjectsClass,
    navInsightsClass,
    navContactClass;

  const [homeActive, setHomeActive] = useState(false);
  const [aboutActive, setAboutActive] = useState(false);
  const [aboutActivate, setAboutActivate] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const [projectsActivate, setProjectsActivate] = useState(false);
  const [insightsActive, setInsightsActive] = useState(false);
  const [insightsActivate, setInsightsActivate] = useState(false);
  const [contactActive, setContactActive] = useState(false);
  const [contactActivate, setContactActivate] = useState(false);

  if (homeActive) {
    navHomeClass = classes.active;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navInsightsClass = classes.a;
    navContactClass = classes.a;
  } else if (aboutActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.active;
    navProjectsClass = classes.a;
    navInsightsClass = classes.a;
    navContactClass = classes.a;
  } else if (projectsActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.active;
    navInsightsClass = classes.a;
    navContactClass = classes.a;
  } else if (insightsActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navInsightsClass = classes.active;
    navContactClass = classes.a;
  } else if (contactActive) {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navInsightsClass = classes.a;
    navContactClass = classes.active;
  } else {
    navHomeClass = classes.a;
    navAboutClass = classes.a;
    navProjectsClass = classes.a;
    navInsightsClass = classes.a;
    navContactClass = classes.a;
  }

  window.onscroll = function () {
    const y = window.pageYOffset;
    const h = document.body.scrollHeight;
    if (y < 0.2 * h) {
      setHomeActive(true);
      setAboutActive(false);
      setProjectsActive(false);
      setInsightsActive(false);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(false);
      setInsightsActivate(false);
      setContactActivate(false);
    } else if (y > 0.2 * h && y < 0.4 * h) {
      setHomeActive(false);
      setAboutActive(true);
      setProjectsActive(false);
      setInsightsActive(false);
      setContactActive(false);
      setAboutActivate(true);
      setProjectsActivate(false);
      setInsightsActivate(false);
      setContactActivate(false);
    } else if (y > 0.4 * h && y < 0.6 * h) {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(true);
      setInsightsActive(false);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(true);
      setInsightsActivate(false);
      setContactActivate(false);
    } else if (y > 0.6 * h && y < 0.795 * h) {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setInsightsActive(true);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(false);
      setInsightsActivate(true);
      setContactActivate(false);
    } else if (y > 0.795 * h) {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setInsightsActive(false);
      setContactActive(true);
      setAboutActivate(false);
      setProjectsActivate(false);
      setInsightsActivate(false);
      setContactActivate(true);
    } else {
      setHomeActive(false);
      setAboutActive(false);
      setProjectsActive(false);
      setInsightsActive(false);
      setContactActive(false);
      setAboutActivate(false);
      setProjectsActivate(false);
      setInsightsActivate(false);
      setContactActivate(false);
    }
  };

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
        navInsightsClass={navInsightsClass}
        navContactClass={navContactClass}
        setHomeActive={setHomeActive}
        setAboutActive={setAboutActive}
        setProjectsActive={setProjectsActive}
        setInsightsActive={setInsightsActive}
        setContactActive={setContactActive}
      />
      <About aboutActivate={aboutActivate} />
      <Projects projectsActivate={projectsActivate} />
      <Insights insightsActivate={insightsActivate} />
      <Contact contactActivate={contactActivate} />
    </div>
  );
};

export default withStyles(styles)(App);
