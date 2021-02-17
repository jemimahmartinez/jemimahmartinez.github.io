import withStyles, { WithStylesProps } from 'react-jss';

import { Section } from './nav-button';
import NavTriangle from './nav-triangle';

const styles = {
  overallContainer: {
    width: '100%',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-end',
    position: 'sticky',
    'z-index': '99',
    top: '7.50%',
  },
  containerAbout: {
    width: '75%',
    height: '100%',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-start',
  },
  containerProjects: {
    width: '75%',
    height: '100%',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-evenly',
  },
  containerContact: {
    width: '75%',
    height: '100%',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'flex-end',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  section: Section;
}

const NavArrow: React.FunctionComponent<IProps> = ({ classes, section }) => {
  if (section === '#about') {
    return (
      <div className={classes.overallContainer}>
        <div className={classes.containerAbout}>
          <NavTriangle />
        </div>
      </div>
    );
  } else if (section === '#projects') {
    return (
      <div className={classes.overallContainer}>
        <div className={classes.containerProjects}>
          <NavTriangle />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.overallContainer}>
      <div className={classes.containerContact}>
        <NavTriangle />
      </div>
    </div>
  );
};

export default withStyles(styles)(NavArrow);
