import React, { useRef } from "react";
import withStyles, { WithStylesProps } from "react-jss";

import Button from "../button";
import LeftArrow from "../icons/left-arrow";
import RightArrow from "../icons/right-arrow";
import Information from "../icons/information";
import useSlider from "./useSlider";

const styles = {
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  image: {
    animationName: "$fadeIn",
    animationDuration: "1s",
    height: "100vh",
  },

  sliderContainer: {
    display: "flex",
    "align-items": "center",
    "flex-direction": "row",
    "justify-content": "space-between",
    padding: "2rem",
    height: "inherit",
  },
  bodyContainer: {
    "text-align": "left",
    width: "50%",
    // "align-items": "flex-end",
    // position: "relative",
    // top: "15%",
  },
  text: {
    "font-size": "1rem",
  },
  noText: {
    "font-size": "0rem",
  },
  buttonLR: {
    color: "#ffffff !important",
    height: "75px !important",
    width: "75px !important",
    "background-color": "transparent",
    border: "none",
    outline: "none",
    margin: "0px 60px 0px 20px",
    transition: "color 0.75s",
    "&:hover": {
      color: "#C3073F !important",
    },
    "z-index": "99",
    cursor: "pointer",
  },
  subTitleContainer: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "flex-start",
    height: "3rem",
  },
  infoButton: {
    height: "75px !important",
    width: "75px !important",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  images: any;
}

const Slider: React.FunctionComponent<IProps> = ({ classes, images }) => {
  const slideImage = useRef<null | HTMLDivElement>(null);
  const slideText = useRef(null);
  const slideSubTitle = useRef(null);
  const slideTitle = useRef(null);
  const slideURL = useRef<null | HTMLAnchorElement>(null);
  const sliderProps = {
    slideImage,
    slideText,
    slideSubTitle,
    slideTitle,
    slideURL,
    images,
  };
  const { goToPreviousSlide, goToNextSlide } = useSlider(sliderProps);

  const getLink = () => {
    console.log("slideURL current: ", slideURL.current?.textContent);
    let link = slideURL.current;
    if (link !== null) {
      return link.textContent;
    }
    return null as any;
  };

  return (
    <div ref={slideImage} className={classes.image}>
      <div className={classes.sliderContainer}>
        <div className={classes.buttonLR}>
          <Button onClick={goToPreviousSlide}>
            <LeftArrow />
          </Button>
        </div>
        <div className={classes.bodyContainer}>
          <h3 ref={slideTitle}>{null}</h3>
          <div className={classes.subTitleContainer}>
            <h6 ref={slideSubTitle}>{null}</h6>
            <div className={classes.infoButton}>
              <Button onClick={() => window.open(getLink())}>
                <Information />
              </Button>
            </div>
          </div>
          <small ref={slideText} className={classes.text} />
          <br />
          <small ref={slideURL} className={classes.noText}></small>
        </div>
        <div className={classes.buttonLR}>
          <Button onClick={goToNextSlide}>
            <RightArrow />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Slider);
