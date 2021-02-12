import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  Projects: {
    color: 'white',
    display: 'flex',
    'font-size': 'calc(10px + 2vmin)',
    'text-align': 'center',
    'min-height': '100vh',
    'min-width': '100vw',
    overflow: 'hidden',
    'align-items': 'center',
    'flex-direction': 'column',
    'justify-content': 'center',
    'background-color': '#000000',
    animationName: '$expand',
  },

  '@keyframes expand': {
    from: { left: '200px', top: '0px' },
    to: { left: '200px', top: '200px' },
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Projects: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.Projects}>
      <h1>My Projects</h1>
      <p>blah blah blah</p>
    </div>
  );
};

export default withStyles(styles)(Projects);
