import withStyles, { WithStylesProps } from 'react-jss';

import NavArrow from './navigated-arrow';

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
  projectsActivate: boolean;
}

const Projects: React.FunctionComponent<IProps> = ({ classes, projectsActivate }) => {
  return (
    <>
      <NavArrow section='#projects' active={projectsActivate}/>
      <div id='projects' className={classes.Projects}>
        <h1>My Projects</h1>
        <p>blah blah blah</p>
      </div>
    </>
  );
};

export default withStyles(styles)(Projects);
