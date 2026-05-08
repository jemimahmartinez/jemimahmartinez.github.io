import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  triangleContainer: {
    display: "flex",
    "justify-content": "center",
  },
  triangleDown: {
    width: "0",
    height: "0",
    "border-left": "50px solid transparent",
    "border-right": "50px solid transparent",
    "border-top": "25px solid #5E1219",
    "@media (max-width: 600px)": {
      "border-left-width": "20px",
      "border-right-width": "20px",
      "border-top-width": "12px",
    },
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const NavTriangle: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.triangleContainer}>
      <div className={classes.triangleDown} />
    </div>
  );
};

export default withStyles(styles)(NavTriangle);
