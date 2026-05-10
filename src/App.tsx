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
      "background-color": "#3E0C0C ",
    },
  },
  active: {
    display: "block",
    color: "white",
    "text-align": "center",
    padding: "14px 16px",
    "text-decoration": "none",
    "background-color": "#5E1219",
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
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ids: Section[] = ["home", "about", "projects", "insights", "contact"];

    const updateActive = () => {
      const triggerLine = window.pageYOffset + window.innerHeight * 0.3;
      let active: Section | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerLine) active = id;
      }
      if (active) setActiveSection(active);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
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
