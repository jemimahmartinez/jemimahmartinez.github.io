import withStyles, { WithStylesProps } from "react-jss";

import NavArrow from "../nav/navigated-arrow";
import PasswordGate from "../insights/password-gate";
import { useUnlock } from "../insights/use-unlock";
import LatestReport from "../insights/latest-report";
import HistoricalReports from "../insights/historical-reports";
import LadderGap from "../insights/ladder-gap";
import VelocityDashboard from "../insights/velocity-dashboard";

const styles = {
  Insights: {
    color: "white",
    display: "flex",
    "font-size": "calc(10px + 2vmin)",
    "text-align": "center",
    "min-height": "100vh",
    "min-width": "100vw",
    "align-items": "center",
    "flex-direction": "column",
    "justify-content": "flex-start",
    "background-color": "#000000",
    position: "relative",
    "padding-top": "5vh",
    "padding-bottom": "5vh",
    "box-sizing": "border-box",
  },
  heading: {
    margin: "0 0 24px 0",
  },
  tiles: {
    display: "flex",
    "flex-direction": "column",
    gap: "24px",
    width: "90%",
    "max-width": "900px",
    "align-items": "stretch",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  insightsActivate: boolean;
}

const Insights: React.FunctionComponent<IProps> = ({
  classes,
  insightsActivate,
}) => {
  const { unlocked, unlock } = useUnlock();

  return (
    <>
      <NavArrow section="#insights" active={insightsActivate} />
      <div id="insights" className={classes.Insights}>
        <h1 className={classes.heading}>Insights</h1>
        {!unlocked ? (
          <PasswordGate onUnlock={unlock} />
        ) : (
          <div className={classes.tiles}>
            <LatestReport />
            <VelocityDashboard />
            <LadderGap />
            <HistoricalReports />
          </div>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(Insights);
