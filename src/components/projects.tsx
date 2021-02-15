import withStyles, { WithStylesProps } from 'react-jss';

import NavButton from './nav-button';

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
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Projects: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div id="projects" className={classes.Projects}>
      <NavButton type='up' section='#about' />
      <h1>My Projects</h1>
      <p>blah blah blah</p>
      <NavButton type='down' section='#contact' />
    </div>
  );
};

export default withStyles(styles)(Projects);
