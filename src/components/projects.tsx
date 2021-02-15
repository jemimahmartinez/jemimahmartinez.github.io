import withStyles, { WithStylesProps } from 'react-jss';

import Button from './button';
import DownArrow from './icons/down-arrow';
import UpArrow from './icons/up-arrow';

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
    position: 'relative',
  },
  downButton: {
    position: 'absolute',
    bottom: '-85%',
    width: '100%',
    height: '100%',
  },
  upButton: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    height: '100%',
  }
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Projects: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div id="projects" className={classes.Projects}>
      <div className={classes.upButton}>
        <Button>
          <a href="#about">
            <UpArrow />
          </a>
        </Button>
      </div>
      <h1>My Projects</h1>
      <p>blah blah blah</p>
      <div className={classes.downButton}>
        <Button>
          <a href="#contact">
            <DownArrow />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Projects);
