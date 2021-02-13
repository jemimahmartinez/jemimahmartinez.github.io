import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  container: {
    display: "flex",
    "flex-direction": "column",
    "font-size": "15pt",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  children: React.ReactNode;
}

const ColumnFlexContainer: React.FunctionComponent<IProps> = ({
  classes,
  children,
}) => {
  return <div className={classes.container}>{children}</div>;
};

export default withStyles(styles)(ColumnFlexContainer);
