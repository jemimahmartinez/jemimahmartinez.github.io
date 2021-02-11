import * as React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  button: {
    backgroundColor: 'yellow',
  },
  label: {
    fontWeight: 'bold',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  children: React.ReactNode;
  classes: any;
}

const Button: React.FunctionComponent<IProps> = ({ classes, children }) => (
  <button className={classes.button}>
    <span className={classes.label}>{children}</span>
  </button>
);

export default withStyles(styles)(Button);
