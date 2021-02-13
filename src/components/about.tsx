import withStyles, { WithStylesProps } from 'react-jss';

import Image from './me.png';
import User from './icons/user';
import PinPoint from './icons/pin-point';

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

    // '@keyframes expand': {
    //   from: { top: '0px' },
    //   to: { top: '500px' },
    // },
    image: {
      height: '300px',
      width: '300px',
      'border-radius': '50px',
    },
    outerContainer: {
      display: 'flex',
      'flex-direction': 'column',
      'font-size': '15pt',
    },
    innerContainer: {
      display: 'flex',
      'flex-direction': 'row',
    },
    icon: {
      color: '#ffffff !important',
      height: '50px !important',
      width: '50px !important',
      'background-color': 'transparent',
      border: 'none',
      outline: 'none',
      margin: '0px 15px 0px 15px'
    }
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const About: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.About}>
      <h1>About Me</h1>
      <div className={classes.innerContainer}>

        <img src={Image} alt="" className={classes.image}/>
        <div className={classes.outerContainer}>
          <div className={classes.innerContainer}>
            <User className={classes.icon} />
            <p>Final year Computer Systems Engineering student at the University of Auckland</p>
          </div>
          <div className={classes.innerContainer}>
            <PinPoint className={classes.icon} />
            <p>Auckland, New Zealand</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(About);
