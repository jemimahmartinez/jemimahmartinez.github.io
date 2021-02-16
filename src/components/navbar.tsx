import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  navbar: {
    "list-style-type": "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    "background-color": "#4E4E50 ",
    position: "sticky",
    top: "0",
    width: "100%",
    height: "100%",
    display: 'flex',
    'z-index': '99',
  },
  li: {
    width: '25%',
  },
  a: {
    display: "block",
    color: "white",
    "text-align": "center",
    padding: "14px 16px",
    "text-decoration": "none",
    "&:hover": {
      "background-color": "#1A1A1D ",
    },
    "&:active": {
        'background-color': '#C3073F',
    },
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const NavBar: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <ul className={classes.navbar}>
      <li className={classes.li}>
        <a href='#home' className={classes.a}>
          Home
        </a>
      </li>
      <li className={classes.li}>
        <a href='#about' className={classes.a}>
          About Me
        </a>
      </li>
      <li className={classes.li}>
        <a href='#projects' className={classes.a}>
          Projects
        </a>
      </li>
      <li className={classes.li}>
        <a href='#contact' className={classes.a}>
          Contact
        </a>
      </li>
    </ul>
  );
};

export default withStyles(styles)(NavBar);
