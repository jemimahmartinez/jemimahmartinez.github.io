import * as React from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import DownArrow from './icons/down-arrow';

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
    <DownArrow />
    <span className={classes.label}>{children}</span>
  </button>
);

export default withStyles(styles)(Button);
