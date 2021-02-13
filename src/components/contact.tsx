import withStyles, { WithStylesProps } from 'react-jss';

import Button from './button';
import GitHub from './icons/github';
import LinkedIn from './icons/linkedin';
import Email from './icons/email';
import RowFlexContainer from './layout/row-flex';

const styles = {
  Contact: {
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
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Contact: React.FunctionComponent<IProps> = ({ classes }) => {
  return (
    <div className={classes.Contact}>
      <h1>Contact me here!</h1>
        <RowFlexContainer center={true}>
          <Button
            onClick={() => window.open('https://github.com/jemimahmartinez')}
          >
            <GitHub />
          </Button>
          <Button
            onClick={() => window.open('https://www.linkedin.com/in/jemimah-martinez-a0924a18b/')}
          >
            <LinkedIn />
          </Button>
          <Button
            onClick={() => window.open('mailto:martinezjemimah@gmail.com')}
          >
            <Email />
          </Button>
        </RowFlexContainer>
    </div>
  );
};

export default withStyles(styles)(Contact);
