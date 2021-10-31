import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  container: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    margin: "0px 15px 0px 15px",
    width: "100%",
  },
  containerCenter: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    margin: "0px 15px 0px 15px",
    "justify-content": "center",
    width: "100%",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  children: React.ReactNode;
  center: boolean;
}

const RowFlexContainer: React.FunctionComponent<IProps> = ({
  classes,
  children,
  center,
}) => {
  if (center) {
    return <div className={classes.containerCenter}>{children}</div>;
  }
  return <div className={classes.container}>{children}</div>;
};

export default withStyles(styles)(RowFlexContainer);
