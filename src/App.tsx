import React, { useEffect, useState } from "react";
import "./App.css";
import withStyles, { WithStylesProps } from "react-jss";

import Home from "./components/sections/home";
import About from "./components/sections/about";
import Projects from "./components/sections/projects";
import Insights from "./components/sections/insights";
import Contact from "./components/sections/contact";
import NavBar from "./components/nav/navbar";
import NavArrow from "./components/nav/navigated-arrow";

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

type Section = "home" | "about" | "projects" | "insights" | "contact";

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const App: React.ComponentType<IProps> = ({ classes }) => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const activator = (section: Section) => (value: boolean) => {
    if (value) setActiveSection(section);
  };
  const setHomeActive = activator("home");
  const setAboutActive = activator("about");
  const setProjectsActive = activator("projects");
  const setInsightsActive = activator("insights");
  const setContactActive = activator("contact");

  const navClass = (section: Section) =>
    activeSection === section ? classes.active : classes.a;

  useEffect(() => {
    const onScroll = () => {
      const ratio = window.pageYOffset / document.body.scrollHeight;
      if (ratio < 0.2) setActiveSection("home");
      else if (ratio < 0.4) setActiveSection("about");
      else if (ratio < 0.6) setActiveSection("projects");
      else if (ratio < 0.8) setActiveSection("insights");
      else setActiveSection("contact");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={classes.App}>
      <Home
        setHomeActive={setHomeActive}
        setAboutActive={setAboutActive}
        setProjectsActive={setProjectsActive}
        setContactActive={setContactActive}
      />
      <NavBar
        navHomeClass={navClass("home")}
        navAboutClass={navClass("about")}
        navProjectsClass={navClass("projects")}
        navInsightsClass={navClass("insights")}
        navContactClass={navClass("contact")}
        setHomeActive={setHomeActive}
        setAboutActive={setAboutActive}
        setProjectsActive={setProjectsActive}
        setInsightsActive={setInsightsActive}
        setContactActive={setContactActive}
      />
      <NavArrow activeSection={activeSection} />
      <About />
      <Projects />
      <Insights />
      <Contact />
    </div>
  );
};

export default withStyles(styles)(App);
