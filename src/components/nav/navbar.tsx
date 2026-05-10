import React, { useEffect, useRef, useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  nav: {
    "background-color": "#000000",
    "font-size": "3vmin",
    position: "sticky",
    top: "0",
    width: "100%",
    "z-index": "101",
    display: "flex",
    "justify-content": "flex-start",
    "@media (max-width: 600px)": {
      "background-color": "transparent",
      position: "fixed",
      height: "0",
    },
  },
  hamburger: {
    display: "none",
    "@media (max-width: 600px)": {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      position: "fixed",
      top: "calc(12px + env(safe-area-inset-top, 0px))",
      left: "calc(12px + env(safe-area-inset-left, 0px))",
      width: "44px",
      height: "44px",
      "background-color": "transparent",
      border: "none",
      color: "white",
      "font-size": "28px",
      "line-height": "1",
      cursor: "pointer",
      outline: "none",
      "z-index": "200",
      "text-shadow": "0 1px 4px rgba(0, 0, 0, 0.85)",
    },
  },
  navbar: {
    "list-style-type": "none",
    margin: "0",
    padding: "0",
    display: "flex",
    width: "100%",
    "@media (max-width: 600px)": {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      "flex-direction": "column",
      "justify-content": "space-evenly",
      "align-items": "stretch",
      "background-color": "#000000",
      "box-sizing": "border-box",
      transform: "translateX(-100%)",
      transition: "transform 0.3s ease",
      "z-index": "150",
      "& a": {
        "font-size": "24px",
        padding: "20px",
      },
    },
  },
  navbarOpen: {
    "@media (max-width: 600px)": {
      transform: "translateX(0)",
    },
  },
  li: {
    width: "20%",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  navHomeClass: any;
  navAboutClass: any;
  navProjectsClass: any;
  navInsightsClass: any;
  navContactClass: any;
  setHomeActive: Function;
  setAboutActive: Function;
  setProjectsActive: Function;
  setInsightsActive: Function;
  setContactActive: Function;
}

const NavBar: React.FunctionComponent<IProps> = ({
  classes,
  navHomeClass,
  navAboutClass,
  navProjectsClass,
  navInsightsClass,
  navContactClass,
  setHomeActive,
  setAboutActive,
  setProjectsActive,
  setInsightsActive,
  setContactActive,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const items = [
    { id: "home", label: "Home", className: navHomeClass, setActive: setHomeActive },
    { id: "about", label: "About Me", className: navAboutClass, setActive: setAboutActive },
    { id: "projects", label: "Projects", className: navProjectsClass, setActive: setProjectsActive },
    { id: "insights", label: "Insights", className: navInsightsClass, setActive: setInsightsActive },
    { id: "contact", label: "Contact", className: navContactClass, setActive: setContactActive },
  ];
  const setters = items.map((i) => i.setActive);

  return (
    <nav ref={navRef} className={classes.nav}>
      <button
        type="button"
        className={classes.hamburger}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? "×" : "☰"}
      </button>
      <ul className={`${classes.navbar} ${menuOpen ? classes.navbarOpen : ""}`}>
        {items.map(({ id, label, className, setActive }) => (
          <li key={id} className={classes.li}>
            <a
              href={`#${id}`}
              className={className}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setters.forEach((s) => s(s === setActive));
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withStyles(styles)(NavBar);
