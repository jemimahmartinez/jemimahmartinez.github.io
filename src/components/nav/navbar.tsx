import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  navbar: {
    "list-style-type": "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    "background-color": "#000000",
    "font-size": "3vmin",
    position: "sticky",
    top: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    "z-index": "101",
  },
  li: {
    width: "20%",
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
  const items = [
    { id: "home", label: "Home", className: navHomeClass, setActive: setHomeActive },
    { id: "about", label: "About Me", className: navAboutClass, setActive: setAboutActive },
    { id: "projects", label: "Projects", className: navProjectsClass, setActive: setProjectsActive },
    { id: "insights", label: "Insights", className: navInsightsClass, setActive: setInsightsActive },
    { id: "contact", label: "Contact", className: navContactClass, setActive: setContactActive },
  ];
  const setters = items.map((i) => i.setActive);

  return (
    <ul className={classes.navbar}>
      {items.map(({ id, label, className, setActive }) => (
        <li key={id} className={classes.li}>
          <a
            href={`#${id}`}
            className={className}
            onClick={() => setters.forEach((s) => s(s === setActive))}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default withStyles(styles)(NavBar);
