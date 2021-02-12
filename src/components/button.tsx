import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  button: {
    color: "#ffffff !important",
    height: "100px !important",
    width: "100px !important",
    "background-color": "transparent",
    border: "none",
    outline: "none",
    margin: "0px 15px 0px 15px",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  children: React.ReactNode;
  classes: any;
  onClick: () => void;
}

const Button: React.FunctionComponent<IProps> = ({ classes, children, onClick }) => {
  return (
    <button
      type="button"
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default withStyles(styles)(Button);
