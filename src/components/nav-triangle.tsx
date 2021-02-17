import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  triangleContainer: {
    display: 'flex',
    'flex-direction': 'row',
    margin: 'none',
    'justify-content': 'center',
    width: '33.33%',
  },
  triangleDown: {
    width: '0',
    height: '0',
    'border-left': '50px solid transparent',
    'border-right': '50px solid transparent',
    'border-top': '25px solid #C3073F',
    transition: 'height 1s',
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
