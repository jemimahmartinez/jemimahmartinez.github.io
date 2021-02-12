import withStyles, { WithStylesProps } from 'react-jss';

const styles = {
  About: {
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
    // animationName: '$expand',
    // 'animation-duration': '4s',
    // 'animation-timing-function': 'ease-out',
  },

  //   '@keyframes expand': {
  //     from: { top: '0px' },
  //     to: { top: '500px' },
  //   },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const About: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.About}>
      <h1>About Me</h1>
      <p>blah blah blah</p>
    </div>
  );
};

export default withStyles(styles)(About);
