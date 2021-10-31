import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  navbar: {
    "list-style-type": "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    "background-color": "#000000", // "#1A1A1D"
    "font-size": "3vmin",
    position: "sticky",
    top: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    "z-index": "101",
  },
  li: {
    width: "25%",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  navHomeClass: any;
  navAboutClass: any;
  navProjectsClass: any;
  navContactClass: any;
  setHomeActive: Function;
  setAboutActive: Function;
  setProjectsActive: Function;
  setContactActive: Function;
}

const NavBar: React.FunctionComponent<IProps> = ({
  classes,
  navHomeClass,
  navAboutClass,
  navProjectsClass,
  navContactClass,
  setHomeActive,
  setAboutActive,
  setProjectsActive,
  setContactActive,
}) => {
  return (
    <>
      <ul className={classes.navbar}>
        <li className={classes.li}>
          <a
            href="#home"
            className={navHomeClass}
            onClick={() => {
              setHomeActive(true);
              setAboutActive(false);
              setProjectsActive(false);
              setContactActive(false);
            }}
          >
            Home
          </a>
        </li>
        <li className={classes.li}>
          <a
            href="#about"
            className={navAboutClass}
            onClick={() => {
              setHomeActive(false);
              setAboutActive(true);
              setProjectsActive(false);
              setContactActive(false);
            }}
          >
            About Me
          </a>
        </li>
        <li className={classes.li}>
          <a
            href="#projects"
            className={navProjectsClass}
            onClick={() => {
              setHomeActive(false);
              setAboutActive(false);
              setProjectsActive(true);
              setContactActive(false);
            }}
          >
            Projects
          </a>
        </li>
        <li className={classes.li}>
          <a
            href="#contact"
            className={navContactClass}
            onClick={() => {
              setHomeActive(false);
              setAboutActive(false);
              setProjectsActive(false);
              setContactActive(true);
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </>
  );
};

export default withStyles(styles)(NavBar);
