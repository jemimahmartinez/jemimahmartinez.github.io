import withStyles, { WithStylesProps } from "react-jss";

const styles = {
  button: {
    color: '#ffffff !important',
    height: '75px !important',
    width: '75px !important',
    'background-color': 'transparent',
    border: 'none',
    outline: 'none',
    margin: '0px 20px 0px 20px',
    transition: 'color 0.75s',
    '&:hover': {
      color: '#C3073F !important',
    },
    'align-items': 'flex-end',
    'z-index': '99',
    cursor: 'pointer',
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  children: React.ReactNode;
  classes: any;
  onClick: () => void;
}

const Button: React.FunctionComponent<IProps> = ({ classes, children, onClick }) => {
  return (
    <button
      type="button"
      className={classes.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default withStyles(styles)(Button);
