import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import GitHub from "../icons/github";
import LinkedIn from "../icons/linkedin";
import Email from "../icons/email";
import RowFlexContainer from "../layout/row-flex";
import { useOracle } from "../../useOracle";

const styles = {
  Contact: {
    color: "white",
    display: "flex",
    "font-size": "calc(10px + 2vmin)",
    "text-align": "center",
    "min-height": "100vh",
    width: "100%",
    overflow: "hidden",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "center",
    "background-color": "#000000",
    position: "relative",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
}

const Contact: React.FunctionComponent<IProps> = ({ classes }) => {
  const oracle = useOracle();
  return (
    <div id="contact" className={classes.Contact}>
      <h1>{oracle.contact.heading}</h1>
      <RowFlexContainer center={true}>
        <Button onClick={() => window.open(oracle.contact.githubUrl)}>
          <GitHub />
        </Button>
        <Button onClick={() => window.open(oracle.contact.linkedinUrl)}>
          <LinkedIn />
        </Button>
        <Button onClick={() => window.open(oracle.contact.emailHref)}>
          <Email />
        </Button>
      </RowFlexContainer>
    </div>
  );
};

export default withStyles(styles)(Contact);
